import { Epic } from "redux-observable";
import { Record } from "immutable";
import { reducerWithInitialState } from "typescript-fsa-reducers";
import actionCreatorFactory, { AnyAction as Action } from "typescript-fsa";
import { toUpper, find, isEmpty } from "lodash";
import * as cookies from "browser-cookies";
import * as store from "store";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/concat";
import "rxjs/add/observable/of";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/map";
import "rxjs/add/observable/empty";
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/first";
import "rxjs/add/observable/merge";
import "rxjs/add/operator/concatMap";
import "rxjs/add/operator/concatMapTo";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/observable/zip";
import "rxjs/add/operator/do";
import "rxjs/add/observable/combineLatest";

import Multiplexer, {
  Command,
  Language,
  PLUGIN_NAME as MUX_NAME,
  SessionOutput,
  SessionStatus,
} from "@datacamp/multiplexer-client";

import { State } from "./";
import { setId } from "./exercise";
import { viewsStart } from "./view";
import { selectId, selectLanguage, selectListener } from "./exercise";

import ExerciseService from "../helpers/baseExercise";
import getOutputAction from "../helpers/output";
import pluginManager, { getMux } from "../helpers/pluginManager";
import uuid from "../helpers/uuid";

import config from "../config";

/*
 * Actions */

const createAction = actionCreatorFactory("backendSession");

export const startSession = createAction<{
  language: Language;
  id: string;
  force_new: boolean;
  initCommands?: Command;
}>("EPIC_START_SESSION");

export interface ISubmitCodePayload {
  code?: string;
  command?: string;
  id?: number;
  language?: string;
  pec?: string;
  sct?: string;
  solution?: string;
  type?: string;
  figureIndex?: number;
  width?: number;
  height?: number;
}

export const submitCode = createAction<ISubmitCodePayload>("EPIC_SUBMIT_CODE");

export const backendError = createAction<{
  output: string;
}>("EPIC_BACKEND_ERROR");

export const muxRegistered = createAction("EPIC_MUX_REGISTERED");

export const updateBackendStatus = createAction<SessionStatus>(
  "UPDATE_BACKEND_STATUS"
);

export const restartSession = createAction("RESTART_SESSION");

/*
 * State definition */

export const BACKEND_STATUS: { [x: string]: SessionStatus } = {
  BROKEN: { status: "broken", text: "Session Broken" },
  BUSY: { status: "busy", text: "Session Busy" },
  NONE: { status: "none", text: "" },
  READY: { status: "ready", text: "Workspace Ready" },
};

export interface IBackendSessionState {
  status: SessionStatus;
  isInitSession: boolean;
  countPostNewSession: number;
  statusCode: number;
}

const initialState: IBackendSessionState = {
  countPostNewSession: 0,
  isInitSession: false,
  status: BACKEND_STATUS.NONE,
  statusCode: 0,
};

export class BackendSessionState extends Record(initialState) {}

/*
 * Reducer */

const setStatus = (prevState: BackendSessionState, status: SessionStatus) => {
  let state = prevState;

  if (
    state.get("status").status === BACKEND_STATUS.NONE.status &&
    status.status === BACKEND_STATUS.BUSY.status
  ) {
    state = state.set("isInitSession", true);
  }

  return state.set("status", status);
};

const reducer = reducerWithInitialState(new BackendSessionState())
  .case(updateBackendStatus, (state, action) => {
    return setStatus(
      state,
      BACKEND_STATUS[toUpper(action.status)] || BACKEND_STATUS.NONE
    );
  })
  .case(backendError, state => setStatus(state, BACKEND_STATUS.BROKEN))
  .case(startSession, state =>
    state.set("countPostNewSession", state.get("countPostNewSession") + 1)
  )
  .build();

export default reducer;

/*
 * Selectors */

export const selectBackendSession = (state: State) =>
  state.get("backendSession");

export const selectBackendSessionStatusCode = (state: State) =>
  selectBackendSession(state).get("status").status;

export const selectBackendSessionIsBroken = (state: State) =>
  selectBackendSession(state).get("status").status === "broken";

export const selectBackendSessionIsBusy = (state: State) =>
  selectBackendSession(state).get("status").status === "busy";

export const selectBackendSessionCountPostNewSession = (state: State) =>
  selectBackendSession(state).get("countPostNewSession");

export const selectBackendSessionStatus = (state: State) =>
  selectBackendSession(state).get("status");

export const selectBackendUIStatus = (state: State) => {
  const status = selectBackendSession(state).get("status");
  return {
    code: status.status,
    text: status.text,
  };
};

/*
 * Epics */

export const guardOnBackendError = (
  data: SessionOutput[],
  language: Language
) => {
  const backendErrorType = (() => {
    switch (language) {
      case "revo":
      case "r":
        return "error";
      default:
        return "backend-error";
    }
  })();
  const error = find(data, output => output.type === backendErrorType);
  if (error) {
    return Observable.of(backendError({ output: error.payload })); // TODO What's the type?
  }
  return Observable.empty();
};

export const handleInputResponse = (
  data: SessionOutput[],
  language: Language
) => {
  let obs = Observable.of();
  if (!isEmpty(data)) {
    const error$ = guardOnBackendError(data, language);
    obs = obs.concat(error$);
  }
  return obs;
};

const registerMux = (language: Language, dclId: string) => {
  let id = store.get("session-id");
  if (!id) {
    id = uuid();
    store.set("session-id", id);
  }
  const userInfo = {
    authentication_token: id,
    email: `datacamp-light+${id}@datacamp.com`,
  };
  pluginManager.remove(MUX_NAME + dclId);
  pluginManager.register(MUX_NAME + dclId, Multiplexer.AsyncSession, userInfo, {
    debug: process.env.NODE_ENV === "development",
    flattenOutputs: false,
    language,
    multiplexerUrl: config.urls.multiplexer,
  });
};

export const id$ = (action$: Observable<Action>) =>
  action$
    .filter(setId.match)
    .distinctUntilChanged((a, b) => a.payload === b.payload)
    .map(action => action.payload);

export const readyAgain$ = (action$: Observable<Action>) =>
  action$
    .filter(updateBackendStatus.match)
    .distinctUntilChanged((a, b) => a.payload.status === b.payload.status)
    .filter(action => action.payload.status === BACKEND_STATUS.READY.status)
    .map(action => action.payload);

export const epicRegisterMux: Epic<Action, State> = (action$, store) =>
  action$
    .filter(viewsStart.match)
    .first()
    .mergeMap(() => {
      const state = store.getState();
      const dclId = selectId(store.getState());
      const language = selectLanguage(store.getState());
      registerMux(language, dclId);

      const muxStateSubject$ = new BehaviorSubject(BACKEND_STATUS.NONE);
      const updateBackendStatus$ = muxStateSubject$.map(status =>
        updateBackendStatus(status)
      );

      getMux(dclId).subscribe(status => muxStateSubject$.next(status));

      return Observable.merge(
        Observable.of(muxRegistered()),
        Observable.of(
          startSession({
            force_new: false,
            id: dclId,
            initCommands: {
              ...ExerciseService.prepareSubmit(state, {}),
              command: "init",
            },
            language,
          })
        ),
        updateBackendStatus$,
        getMux(dclId).output$.concatMap(
          data => handleInputResponse(data, language) as Observable<Action>
        )
      );
    });

export const epicStartSession: Epic<Action, State> = (action$, store) => {
  return Observable.combineLatest(
    action$.filter(startSession.match),
    action$.filter(setId.match)
  )
    .do(([initializingAction, setIdAction]) => {
      if (initializingAction.payload.force_new) {
        cookies.erase("mux-session-id");
        cookies.erase("AWSELB");
      }
    })
    .do(([startSessionAction, setIdAction]) => {
      const dclId = selectId(store.getState());
      const mux = getMux(dclId);
      const forceNew =
        startSessionAction.payload.force_new ||
        selectBackendSessionCountPostNewSession(store.getState()) === 1;
      const options = {
        language: startSessionAction.payload.language,
        force_new: forceNew,
      };

      mux.start(options, startSessionAction.payload.initCommands);
    })
    .do(() => selectListener(store.getState())("start", undefined))
    .concatMapTo(Observable.empty());
};

export const epicSubmitCode: Epic<Action, State> = (action$, store) => {
  return Observable.combineLatest(
    id$(action$),
    Observable.zip(
      readyAgain$(action$),
      action$.filter(submitCode.match),
      (backendStatus, submitAction) => ({ backendStatus, submitAction })
    )
  )
    .map(([dclId, { submitAction }]) => {
      const state = store.getState();
      const commandConfig = ExerciseService.prepareSubmit(
        state,
        submitAction.payload
      );

      getMux(dclId).input({
        ...commandConfig,
      });

      return commandConfig;
    })
    .do(config =>
      selectListener(store.getState())("submit", {
        code: config.code,
      })
    )
    .concatMapTo(Observable.empty());
};

export const epicRestartSession: Epic<Action, State> = (action$, store) =>
  action$.filter(restartSession.match).map(() =>
    startSession({
      language: selectLanguage(store.getState()),
      id: selectId(store.getState()),
      force_new: true,
    })
  );
