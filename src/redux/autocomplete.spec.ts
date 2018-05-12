import { Record } from "immutable";
import { createEpicMiddleware } from "redux-observable";
import configureMockStore from "redux-mock-store";
import { marbles } from "rxjs-marbles";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";
import { TestScheduler } from "rxjs/testing/TestScheduler";

import pm, { getMux } from "../../../src/helpers/pluginManager";
import { registerConsoleAutocompleteCallback } from "./autocomplete";
import { muxRegistered } from "./backend-session";
import {
  createEpicRegisterAutocompleteMuxCallbacks,
  epicRegisterAutocompleteMuxCallbacks,
} from "./autocomplete";

let store;
let getMuxStub;
let epic;
let autocompleteCallback;

beforeEach(() => {
  autocompleteCallback = jest.fn();
  getMuxStub = jest.fn();
  getMuxStub.mockReturnValue({
    output$: Observable.of(Observable.of({ type: "code-completion" })),
  });

  epic = createEpicRegisterAutocompleteMuxCallbacks(getMuxStub);
  const epicMiddleware = createEpicMiddleware(epic);
  const mockStore = configureMockStore([epicMiddleware]);

  store = mockStore(
    Record({
      autocomplete: Record({
        consoleAutocompleteCallback: autocompleteCallback,
      })(),
      exercise: Record({
        id: 0,
      })(),
    })
  );
});

test(
  "does not emit actions",
  marbles(m => {
    const values = {
      a: muxRegistered(),
    };

    const source$ = m.hot("a|", values);
    const expected$ = m.cold("-|", values);
    const destination$ = epic(source$, store);

    m.expect(destination$).toBeObservable(expected$);
  })
);

test("calls the autocompletion callback on output", () => {
  store.dispatch(muxRegistered());
  store.dispatch(registerConsoleAutocompleteCallback(autocompleteCallback));
  expect(autocompleteCallback.mock.calls.length).toBe(1);
});
