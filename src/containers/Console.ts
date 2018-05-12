import { Command } from "@datacamp/multiplexer-client";
import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import ConsoleBody, { IConsoleProps } from "@datacamp/ui-console";

import { registerConsoleAutocompleteCallback } from "../redux/autocomplete";
import { submitCode } from "../redux/backend-session";
import { registerConsoleOutputCallback } from "../redux/output";

import { State } from "../redux";
import {
  BACKEND_STATUS,
  selectBackendSessionStatusCode,
} from "../redux/backend-session";
import {
  selectId,
  selectLanguage,
  selectPreExerciseCode,
  selectSct,
} from "../redux/exercise";

import { getMux } from "../helpers/pluginManager";

import "@datacamp/ui-console/lib/style.css";

const muxInput = (dclId: string) => (input: Command) => {
  return getMux(dclId).input(input);
};

interface IOwnProps {
  className?: string;
}

const mapStateToProps: MapStateToProps<IConsoleProps, IOwnProps> = (
  state: State,
  ownProps
) => {
  const dclId = selectId(state);

  return {
    canExecuteCommand:
      selectBackendSessionStatusCode(state) === BACKEND_STATUS.READY.status,
    className: ownProps.className,
    consoleId: dclId,
    getCompletions: muxInput(dclId),
    language: selectLanguage(state),
    pre_exercise_code: selectPreExerciseCode(state),
    sct: selectSct(state),
  };
};

const mapDispatchToProps: MapDispatchToProps<IConsoleProps, {}> = dispatch => ({
  setCompletionsCallback: callback =>
    dispatch(registerConsoleAutocompleteCallback(callback)),
  setOutputCallback: callback =>
    dispatch(registerConsoleOutputCallback(callback)),
  submitCode: code => dispatch(submitCode(code)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ConsoleBody);
