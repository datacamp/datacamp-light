import { Epic } from "redux-observable";
import { Record } from "immutable";
import { reducerWithInitialState } from "typescript-fsa-reducers";
import actionCreatorFactory, { AnyAction as Action } from "typescript-fsa";
import { Observable } from "rxjs/Observable";
import { ExerciseType, Language } from "@datacamp/multiplexer-client";

import { State } from "./";
import { IAlert } from "./view";
import { Listener } from "../helpers/hub";

import config from "../config";

/*
 * Actions */

const createAction = actionCreatorFactory("exercise");

export const updateCode = createAction<string>("UPDATE_CODE");

export const setId = createAction<string>("SET_ID");

export const setExercise = createAction<{
  language: Language;
  hint?: string;
  pre_exercise_code?: string;
  sample_code?: string;
  sct: string;
  solution: string;
  showRunButton: boolean;
}>("SET_EXERCISE");

export const setExerciseFeedback = createAction<IAlert>(
  "SET_EXERCISE_FEEDBACK"
);

export const showHint = createAction("SHOW_HINT");

export const setShellProxy = createAction<string>("SET_SHELL_PROXY");

export const setListener = createAction<Listener>("SET_LISTENER");

/*
 * State definition */

export interface IExerciseState {
  code: string;
  feedback?: IAlert;
  hint: string;
  id: string;
  language: Language;
  pre_exercise_code: string;
  sample_code: string;
  sct: string;
  solution: string;
  type: ExerciseType;
  showSolutionButton: boolean;
  showRunButton: boolean;
  shellProxy?: string;
  listener?: Listener;
}

const initialState: IExerciseState = {
  code: "",
  feedback: undefined,
  hint: "",
  id: "",
  language: "r",
  pre_exercise_code: "",
  sample_code: "",
  sct: "",
  solution: "",
  type: "NormalExercise",
  showSolutionButton: false,
  showRunButton: false,
  shellProxy: "",
  listener: () => {},
};

export class ExerciseState extends Record(initialState) {}

/*
 * Reducer */

const reducer = reducerWithInitialState(new ExerciseState())
  .case(setId, (state, id) => state.set("id", id))
  .case(setExercise, (state, action) => state.merge(action))
  .case(setExerciseFeedback, (state, alert) => state.set("feedback", alert))
  .case(showHint, state =>
    state.set("feedback", {
      content: state.get("hint"),
      type: "info",
    })
  )
  .case(updateCode, (state, content) => state.set("code", content))
  .case(setShellProxy, (state, path) =>
    state.set(
      "shellProxy",
      (config.urls.multiplexer + path).replace(/^.*:\/\//, "wss://")
    )
  )
  .case(setListener, (state, fn) => state.set("listener", fn))
  .build();

export default reducer;

/*
 * Selectors */

export const selectExercise = (state: State) => state.get("exercise");

export const selectCode = (state: State) => selectExercise(state).get("code");

export const selectFeedback = (state: State) =>
  selectExercise(state).get("feedback");

export const selectId = (state: State) => selectExercise(state).get("id");

export const selectLanguage = (state: State) =>
  selectExercise(state).get("language");

export const selectPreExerciseCode = (state: State) =>
  selectExercise(state).get("pre_exercise_code");

export const selectSampleCode = (state: State) =>
  selectExercise(state).get("sample_code");

export const selectSct = (state: State) => selectExercise(state).get("sct");

export const selectHint = (state: State) => selectExercise(state).get("hint");

export const selectSolution = (state: State) =>
  selectExercise(state).get("solution");

export const selectType = (state: State) => selectExercise(state).get("type");

export const selectShowRunButton = (state: State) =>
  selectExercise(state).get("showRunButton");

export const selectShellProxy = (state: State) =>
  selectExercise(state).get("shellProxy");

export const selectListener = (state: State) =>
  selectExercise(state).get("listener");

/*
 * Epics */

export const epicPublishFeedback: Epic<Action, State> = (action$, store) =>
  action$
    .filter(setExerciseFeedback.match)
    .do(({ payload }) =>
      selectListener(store.getState())("feedback", {
        correct: payload.type === "success",
        content: payload.content,
      })
    )
    .concatMapTo(Observable.empty());
