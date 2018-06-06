import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";

import { State } from "../redux";
import {
  selectBackendSessionIsBroken,
  selectBackendSessionIsBusy,
  submitCode,
} from "../redux/backend-session";
import {
  showHint,
  selectHint,
  selectSolution,
  selectShowRunButton,
} from "../redux/exercise";

import { Footer, IFooterProps } from "../components/Footer";

interface IOwnProps extends Partial<IFooterProps> {
  onShowSolution?: (event: React.SyntheticEvent<HTMLButtonElement>) => void;
}

const mapStateToProps: MapStateToProps<IFooterProps, IOwnProps> = (
  state: State,
  ownProps
) => ({
  isSessionBroken: selectBackendSessionIsBroken(state),
  isSessionBusy: selectBackendSessionIsBusy(state),
  hint: selectHint(state),
  solution: selectSolution(state),
  showRunButton: selectShowRunButton(state),
});

const mapDispatchToProps: MapDispatchToProps<IFooterProps, IOwnProps> = (
  dispatch,
  ownProps
) => ({
  onShowHint: event => dispatch(showHint()),
  onSubmit: payload => dispatch(submitCode(payload)),
  onShowSolution: ownProps.onShowSolution,
});

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
