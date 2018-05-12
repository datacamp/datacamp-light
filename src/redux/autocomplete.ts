import { Epic } from "redux-observable";
import { Record } from "immutable";
import { reducerWithInitialState } from "typescript-fsa-reducers";
import actionCreatorFactory, { AnyAction as Action } from "typescript-fsa";
import { some } from "lodash";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/empty";
import "rxjs/add/observable/from";
import "rxjs/add/operator/do";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/combineLatest";
import "rxjs/add/operator/concatMapTo";
import "rxjs/add/operator/mergeMap";
import { SessionOutput } from "@datacamp/multiplexer-client";

import { State } from "./index";
import { muxRegistered } from "./backend-session";
import { selectId } from "./exercise";

import { getMux as muxGetter } from "../helpers/pluginManager";

/*
 * Actions */

const createAction = actionCreatorFactory("autocomplete");

export const registerConsoleAutocompleteCallback = createAction<
  (output: string) => void
>("REGISTER_CONSOLE_AUTOCOMPLETE_CALLBACK");

/*
 * State definition */

export interface IAutocompleteState {
  consoleAutocompleteCallback: (output: string) => void;
}

const initialState: IAutocompleteState = {
  consoleAutocompleteCallback: output => null,
};

export class AutocompleteState extends Record(initialState) {}

/*
 * Reducer */

const reducer = reducerWithInitialState(new AutocompleteState())
  .case(registerConsoleAutocompleteCallback, (state, callback) =>
    state.set("consoleAutocompleteCallback", callback)
  )
  .build();

export default reducer;

/*
 * Selectors */

export const selectAutocomplete = (state: State) => state.get("autocomplete");

export const selectConsoleAutocompleteCallback = (state: State) =>
  selectAutocomplete(state).get("consoleAutocompleteCallback");

/*
 * Epics */

export const createEpicRegisterAutocompleteMuxCallbacks = (
  getMux: typeof muxGetter
): Epic<Action, State> => (action$, store) =>
  action$
    .filter(muxRegistered.match)
    .combineLatest(action$.filter(registerConsoleAutocompleteCallback.match))
    .do(() => {
      console.log("registering autocomplete");
      getMux(selectId(store.getState()))
        .output$.flatMap(outputs => Observable.from(outputs))
        .filter(output => output.type === "code-completion")
        .subscribe(output =>
          selectConsoleAutocompleteCallback(store.getState())(output as any)
        );
    })
    .concatMapTo(Observable.empty());

export const epicRegisterAutocompleteMuxCallbacks = createEpicRegisterAutocompleteMuxCallbacks(
  muxGetter
);
