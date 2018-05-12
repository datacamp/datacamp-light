import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";

import { restartSession } from "../redux/backend-session";
import { State } from "../redux";

import {
  RestartSessionButton,
  IRestartSessionButtonProps,
} from "../components/RestartSessionButton";

export interface IOwnProps {
  visible?: boolean;
  className?: string;
}

const mapStateToProps: MapStateToProps<
  IRestartSessionButtonProps,
  IOwnProps
> = (state: State, ownProps) => ({
  visible: ownProps.visible,
  className: ownProps.className,
});

const mapDispatchToProps: MapDispatchToProps<
  IRestartSessionButtonProps,
  IOwnProps
> = dispatch => ({
  onClickRestart: event => dispatch(restartSession()),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  RestartSessionButton
);
