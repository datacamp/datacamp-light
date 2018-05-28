import { createEpicMiddleware } from "redux-observable";
import configureMockStore from "redux-mock-store";
import { Record } from "immutable";
import { AnyAction as Action } from "typescript-fsa";
import { marbles } from "rxjs-marbles";
import { Observable } from "rxjs/Observable";

import pm from "../helpers/pluginManager";
import { viewsStart } from "./view";
import { setId } from "./exercise";

import reducer, {
  BackendSessionState,
  BACKEND_STATUS,
  backendError,
  updateBackendStatus,
  startSession,
  epicRegisterMux,
  muxRegistered,
  id$,
  readyAgain$,
  guardOnBackendError,
} from "./backend-session";

describe("state", () => {
  test("should exist", () => {
    expect(BackendSessionState).toBeDefined();
    expect(new BackendSessionState()).toBeDefined();
  });

  test("should have backend status 'none' initially", () => {
    expect(new BackendSessionState().get("status")).toEqual(
      BACKEND_STATUS.NONE
    );
  });
});

describe("reducer", () => {
  const getState = () => new BackendSessionState();

  test("should be defined", () => {
    expect(reducer).toBeDefined();
    expect(reducer).toBeInstanceOf(Function);
  });

  test("should update the status to broken, busy, none and ready", () => {
    const getUpdatedStatus = (key: string) =>
      reducer(getState(), updateBackendStatus(BACKEND_STATUS[key])).get(
        "status"
      );

    expect(getUpdatedStatus("BROKEN")).toEqual(BACKEND_STATUS["BROKEN"]);
    expect(getUpdatedStatus("BUSY")).toEqual(BACKEND_STATUS["BUSY"]);
    expect(getUpdatedStatus("NONE")).toEqual(BACKEND_STATUS["NONE"]);
    expect(getUpdatedStatus("READY")).toEqual(BACKEND_STATUS["READY"]);
  });

  test("should set backend status to broken on error", () => {
    expect(
      reducer(getState(), backendError({ output: "test error" })).get("status")
    ).toEqual(BACKEND_STATUS["BROKEN"]);
  });

  test("should count first session", () => {
    expect(
      reducer(
        getState(),
        startSession({ id: "dcl-1", language: "python", force_new: false })
      ).get("countPostNewSession")
    ).toEqual(1);
  });
});

describe("epic helpers", () => {
  test(
    "id$ should stream changes from setId",
    marbles(m => {
      const actions: { [x: string]: Action } = {
        a: setId("id1"),
        b: setId("id2"),
        c: setId("id2"),
        d: setId("id3"),
      };
      const values = {
        a: "id1",
        b: "id2",
        d: "id3",
      };

      const source$ = m.hot<Action>("--a-b-c-d|", actions);
      const expected$ = m.cold<string>("--a-b---d|", values);
      const destination$ = id$(source$);

      m.expect(destination$).toBeObservable(expected$);
    })
  );

  test(
    "readyAgain$ should stream when status is ready again",
    marbles(m => {
      const actions: { [x: string]: Action } = {
        a: updateBackendStatus(BACKEND_STATUS.READY),
        b: updateBackendStatus(BACKEND_STATUS.BROKEN),
        c: updateBackendStatus(BACKEND_STATUS.READY),
        d: updateBackendStatus(BACKEND_STATUS.READY),
        e: updateBackendStatus(BACKEND_STATUS.BUSY),
        f: updateBackendStatus(BACKEND_STATUS.BROKEN),
        g: updateBackendStatus(BACKEND_STATUS.BROKEN),
        h: updateBackendStatus(BACKEND_STATUS.NONE),
        i: updateBackendStatus(BACKEND_STATUS.READY),
      };
      const values = {
        a: BACKEND_STATUS.READY,
        c: BACKEND_STATUS.READY,
        i: BACKEND_STATUS.READY,
      };

      const source$ = m.hot<Action>("-abcdefghi|", actions);
      const expected$ = m.cold<string>("-a-c-----i|", values);
      const destination$ = readyAgain$(source$);

      m.expect(destination$).toBeObservable(expected$);
    })
  );

  describe("guardOnBackendError", () => {
    const soCode = {
      type: "code",
      payload: "print('hello)",
    };

    const soError = {
      type: "error",
      payload: "the answer to life was not found",
    };

    const soBackendError = {
      type: "backend-error",
      payload: "the answer to life was not found",
    };

    test("should return an empty observable if there's no error", () => {
      const eo = Observable.empty();

      expect(guardOnBackendError([], null)).toMatchObject(eo);
      expect(guardOnBackendError([], "r")).toMatchObject(eo);
      expect(guardOnBackendError([], "revo")).toMatchObject(eo);
      expect(guardOnBackendError([], "revo")).toMatchObject(eo);
      expect(guardOnBackendError([soCode], "revo")).toMatchObject(eo);
      expect(guardOnBackendError([soCode, soCode, soCode], "r")).toMatchObject(
        eo
      );
    });

    test("should return a backendError action when there is an error", () => {
      const errorObs = Observable.of(
        backendError({
          output: soError.payload,
        })
      );

      expect(guardOnBackendError([soError], "r")).toMatchObject(errorObs);
      expect(guardOnBackendError([soBackendError], "python")).toMatchObject(
        errorObs
      );

      expect(
        guardOnBackendError([soCode, soCode, soError, soCode], "r")
      ).toMatchObject(errorObs);
      expect(
        guardOnBackendError([soCode, soCode, soError, soCode, soError], "r")
      ).toMatchObject(errorObs);
    });
  });
});

describe("epics", () => {
  const epicMiddleware = createEpicMiddleware(epicRegisterMux);
  const mockStore = configureMockStore([epicMiddleware]);

  test("viewsStart should register a mux with the plugin manager", () => {
    const language = "r";
    const id = "dcl-1";
    const store = mockStore(
      Record({
        exercise: Record({
          language,
          id,
        })(),
        view: Record({
          width: 300,
          height: 300,
        })(),
      })()
    );

    expect(Object.keys(pm.plugins)).toHaveLength(0);

    store.dispatch(viewsStart());

    expect(store.getActions()).toContainEqual(viewsStart());
    expect(Object.keys(pm.plugins)).toHaveLength(1);
    expect(store.getActions()).toContainEqual(muxRegistered());
    expect(
      store.getActions().find(action => action.type === startSession.type)
    ).toBeDefined();
  });
});
