import { Epic } from "redux-observable";
import { Record } from "immutable";
import { reducerWithInitialState } from "typescript-fsa-reducers";
import actionCreatorFactory, { AnyAction as Action } from "typescript-fsa";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/empty";
import "rxjs/add/observable/of";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/mergeMap";

import { State } from "./";
import { submitCode } from "./backend-session";
import { setPlot, selectPlotIndex, selectPlots } from "./output";
import { ExerciseState, selectLanguage, selectExercise } from "./exercise";

import { IPlotSource } from "@datacamp/ui-plot";
import { expandHandler } from "../helpers/plot";

/*
 * Actions */

const createAction = actionCreatorFactory("view");

export const viewsStart = createAction("VIEWS_START");

export const expandTab = createAction<{
  category: string;
  tabKey: string;
  src: IPlotSource;
}>("EXPAND_TAB");

export const setRenderSize = createAction<{
  width: number;
  height: number;
}>("SET_RENDER_SIZE");

export const setActiveEditor = createAction<string>("SET_ACTIVE_EDITOR");

/*
 * State definition */

export interface IAlert {
  type: "success" | "danger" | "info";
  content: string;
}

export interface IViewState {
  alerts: IAlert[];
  width?: number;
  height?: number;
  activeEditor?: string;
}

const initialState: IViewState = {
  alerts: [],
  width: 640,
  height: 640,
  activeEditor: "editor",
};

export class ViewState extends Record(initialState) {}

/*
 * Reducer */

export const reducer = reducerWithInitialState(new ViewState())
  .case(setRenderSize, (state, action) => state.merge(action))
  .case(setActiveEditor, (state, editor) => state.set("activeEditor", editor))
  .build();

export default reducer;

/*
 * Selectors */

export const selectView = (state: State) => state.get("view");

export const selectAlerts = (state: State) => selectView(state).get("alerts");

export const selectRenderWidth = (state: State) =>
  selectView(state).get("width");

export const selectRenderHeight = (state: State) =>
  selectView(state).get("height");

export const selectActiveEditor = (state: State) =>
  selectView(state).get("activeEditor");

/*
 * Epics */

export const epicResizePlot: Epic<Action, State> = (action$, store) =>
  action$.filter(setRenderSize.match).mergeMap(action => {
    const state = store.getState();
    const language = selectLanguage(state);
    const figureIndex = selectPlotIndex(state);
    const plots = selectPlots(state);

    if (plots.length <= 0) {
      return Observable.empty();
    }

    if (language === "r" || language === "revo") {
      return Observable.of(
        submitCode({
          language: selectLanguage(state),
          command: "resize",
          figureIndex,
          ...action.payload,
        })
      );
    } else {
      return Observable.empty();
    }
  });

export const epicExpandTab: Epic<Action, State> = (action$, store) =>
  action$.filter(expandTab.match).switchMap(action => {
    const state = store.getState();
    const currentExercise = selectExercise(state).toJS() as ExerciseState;
    const figureIndex = selectPlotIndex(state);
    const type = action.payload.tabKey;

    if (currentExercise.language === "r" && action.payload.src.type === "img") {
      return Observable.of(
        submitCode({
          language: currentExercise.language,
          command: "expand",
          width: 800,
          height: 800,
          figureIndex,
        })
      );
    } else {
      expandHandler(
        type,
        selectPlots(state)[figureIndex],
        figureIndex,
        currentExercise
      );
      return Observable.empty();
    }
  });
