import { Epic } from "redux-observable";
import { Record, List } from "immutable";
import { reducerWithInitialState } from "typescript-fsa-reducers";
import actionCreatorFactory, { AnyAction as Action } from "typescript-fsa";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/empty";
import "rxjs/add/observable/from";
import "rxjs/add/observable/zip";
import "rxjs/add/operator/combineLatest";
import "rxjs/add/operator/concatMapTo";
import "rxjs/add/operator/do";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/map";
import "rxjs/add/operator/mapTo";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/ignoreElements";
import "rxjs/add/operator/take";
import { includes, some } from "lodash";
import { SessionOutput } from "@datacamp/multiplexer-client";

import { State } from "./";
import {
  selectId,
  selectLanguage,
  selectType,
  selectExercise,
} from "./exercise";
import { muxRegistered, submitCode } from "./backend-session";
import { expandTab, setRenderSize } from "./view";

import getOutputAction, { outputsForConsole } from "../helpers/output";
import { getMux } from "../helpers/pluginManager";
import { expandHandler } from "../helpers/plot";

/*
 * Actions */

const createAction = actionCreatorFactory("output");

export const registerConsoleOutputCallback = createAction<
  (result: SessionOutput[]) => void
>("REGISTER_CONSOLE_OUTPUT_CALLBACK");

export const addPlot = createAction<string>("ADD_PLOT");

export const setPlotIndex = createAction<number>("SET_PLOT_INDEX");

export const setPlot = createAction<{
  figureIndex: number;
  source: string;
}>("SET_PLOT");

/*
 * State definition */

export interface IOutputState {
  consoleOutputCallback: (output: SessionOutput[]) => void;
  plots: List<string>;
  plotIndex: number;
}

const initialState: IOutputState = {
  consoleOutputCallback: output => null,
  plots: List<string>(),
  plotIndex: 0,
};

export class OutputState extends Record(initialState) {}

/*
 * Reducer */

export const reducer = reducerWithInitialState(new OutputState())
  .case(registerConsoleOutputCallback, (state, callback) =>
    state.set("consoleOutputCallback", callback)
  )
  .case(addPlot, (state, url) =>
    state.update("plots", plots => plots.push(url))
  )
  .case(setPlotIndex, (state, index) => state.set("plotIndex", index))
  .case(setPlot, (state, { figureIndex, source }) =>
    state.update("plots", plots => plots.set(figureIndex, source))
  )
  .build();

export default reducer;

/*
 * Selectors */

export const selectOutput = (state: State) => state.get("output");

export const selectConsoleOutputCallback = (state: State) =>
  selectOutput(state).get("consoleOutputCallback");

export const selectPlots = (state: State) =>
  selectOutput(state)
    .get("plots")
    .toJS();

export const selectPlotIndex = (state: State) =>
  selectOutput(state).get("plotIndex");

export const selectPlotSource = (state: State) =>
  selectOutput(state)
    .get("plots")
    .toJS()[selectPlotIndex(state)];

/*
 * Epics */

export const epicRegisterOutputMuxCallbacks: Epic<Action, State> = (
  action$,
  store
) =>
  action$
    .filter(muxRegistered.match)
    .combineLatest(action$.filter(registerConsoleOutputCallback.match))
    .do(() =>
      getMux(selectId(store.getState())).subscribeToOutputs(
        (output: SessionOutput) => includes(outputsForConsole, output.type),
        selectConsoleOutputCallback(store.getState())
      )
    )
    .concatMapTo(Observable.empty());

export const epicOutputFeedback: Epic<Action, State> = (action$, store) =>
  action$
    .filter(muxRegistered.match)
    .flatMap(
      () =>
        getMux(selectId(store.getState()))
          .output$.flatMap(outputs => Observable.from(outputs))
          .map(output => {
            const state = store.getState();
            return getOutputAction(
              selectLanguage(state),
              output,
              selectType(state)
            );
          }) as Observable<Action>
    )
    .filter(action => action !== null);
