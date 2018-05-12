import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import EditorBody, { IEditorProps } from "@datacamp/ui-editor";
import "@datacamp/ui-editor/lib/style.css";

import { State } from "../redux";
import {
  selectLanguage,
  selectPreExerciseCode,
  selectSolution,
  selectSct,
  updateCode,
} from "../redux/exercise";

interface IOwnProps extends Partial<IEditorProps> {
  className?: string;
  id?: number;
}

const mapStateToProps: MapStateToProps<IEditorProps, IOwnProps> = (
  state: State,
  ownProps
) => ({
  className: ownProps.className,
  id: ownProps.id,
  code: selectSolution(state),
  language: selectLanguage(state),
  pre_exercise_code: selectPreExerciseCode(state),
  sct: selectSct(state),
});

export default connect(mapStateToProps)(EditorBody);
