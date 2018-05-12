import { connect, MapStateToProps } from "react-redux";

import AlertList, { IAlertListProps } from "../components/AlertList";

import { State } from "../redux";
import { selectAlerts } from "../redux/view";

const mapStateToProps: MapStateToProps<IAlertListProps, {}> = (
  state: State
) => ({
  alerts: selectAlerts(state),
});

export default connect(mapStateToProps)(AlertList);
