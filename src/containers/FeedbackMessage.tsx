import * as React from "react";
import { connect, MapStateToProps } from "react-redux";

import { State } from "../redux";
import { selectFeedback } from "../redux/exercise";
import { IAlert } from "../redux/view";

import Alert, { IAlertProps } from "../components/Alert";

interface IOwnProps {
  className?: string;
}

interface IFeedbackMessageState {
  alert?: IAlert;
  className?: string;
}

const mapStateToProps: MapStateToProps<Partial<IAlertProps>, IOwnProps> = (
  state: State,
  ownProps
) => ({
  alert: selectFeedback(state),
  className: ownProps.className,
});

export default connect(mapStateToProps)(
  (state: IFeedbackMessageState) =>
    state.alert ? (
      <Alert {...state.alert} className={state.className} closable={true} />
    ) : null
);
