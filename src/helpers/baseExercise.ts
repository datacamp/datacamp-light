import { Action } from "redux";

import pick from "./pick";

import { ISubmitCodePayload } from "../redux/backend-session";
import { State } from "../redux";
import { selectExercise, selectSolution } from "../redux/exercise";
import {
  selectRenderWidth,
  selectRenderHeight,
  selectActiveEditor,
} from "../redux/view";

export class BaseExerciseService {
  public prepareSubmit<P>(state: State, action: ISubmitCodePayload) {
    const exercise = selectExercise(state).toJS();

    const commandConfig: any = pick(
      exercise,
      (value, key) =>
        [
          "id",
          "pre_exercise_code",
          "solution",
          "type",
          "sct",
          "language",
          "code",
        ].indexOf(key) > -1
    );
    commandConfig.width = selectRenderWidth(state);
    commandConfig.height = selectRenderHeight(state);
    commandConfig.pec = commandConfig.pre_exercise_code;

    if (selectActiveEditor(state) === "solution") {
      commandConfig.code = selectSolution(state);
    }

    const echo = commandConfig.language !== "r";

    const config = {
      command: "submit", // submit is default command
      echo,
      ...commandConfig,
      ...action, // settings from the action will overwrite settings from the state.
    };

    return config;
  }
}

const ExerciseService = new BaseExerciseService();
export default ExerciseService;
