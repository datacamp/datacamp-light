import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import EditorBody, { IEditorProps } from "@datacamp/ui-editor";
import "@datacamp/ui-editor/lib/style.css";

import { updateCode } from "../redux/exercise";
import { State } from "../redux";
import {
  selectLanguage,
  selectPreExerciseCode,
  selectSampleCode,
  selectSct,
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
  code: selectSampleCode(state),
  language: selectLanguage(state),
  pre_exercise_code: selectPreExerciseCode(state),
  sct: selectSct(state),
  id: ownProps.id,
});

const mapDispatchToProps: MapDispatchToProps<IEditorProps, {}> = dispatch => ({
  onCodeChange: ({ code }) => dispatch(updateCode(code)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditorBody);
