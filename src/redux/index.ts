import { Action } from "redux";
import { Epic } from "redux-observable";
import * as request from "universal-rx-request";
import { Map as HashMap, Record } from "immutable";
import { combineReducers } from "redux-immutable";

import autocomplete, { AutocompleteState } from "./autocomplete";
import backendSession, { BackendSessionState } from "./backend-session";
import exercise, { ExerciseState } from "./exercise";
import output, { OutputState } from "./output";
import view, { ViewState } from "./view";

/*
 * State definition */

export interface IState {
  autocomplete: AutocompleteState;
  backendSession: BackendSessionState;
  exercise: ExerciseState;
  output: OutputState;
  view: ViewState;
}

const initialState: IState = {
  autocomplete: new AutocompleteState(),
  backendSession: new BackendSessionState(),
  exercise: new ExerciseState(),
  output: new OutputState(),
  view: new ViewState(),
};

export class State extends Record(initialState) {}

/*
 * Reducer */

const reducer = combineReducers<State>({
  autocomplete,
  backendSession,
  exercise,
  output,
  view,
});

export default reducer;

/*
 * Epics */

request.importRxExtensions();

import { epicRegisterAutocompleteMuxCallbacks } from "./autocomplete";
import {
  epicRegisterMux,
  epicStartSession,
  epicSubmitCode,
  epicRestartSession,
} from "./backend-session";
import { epicPublishFeedback } from "./exercise";
import { epicOutputFeedback, epicRegisterOutputMuxCallbacks } from "./output";
import { epicResizePlot, epicExpandTab } from "./view";

export const epics: Array<Epic<Action, State, any>> = [
  epicRegisterAutocompleteMuxCallbacks,
  epicRegisterMux,
  epicStartSession,
  epicRestartSession,
  epicSubmitCode,
  epicRegisterOutputMuxCallbacks,
  epicOutputFeedback,
  epicResizePlot,
  epicExpandTab,
  epicPublishFeedback,
];
