import * as React from "react";

import { IAlert } from "../redux/view";
import Alert from "./Alert";

export interface IAlertListProps extends React.Props<AlertList> {
  alerts: IAlert[];
}

export default class AlertList extends React.Component<IAlertListProps> {
  public static defaultProps: Partial<IAlertListProps> = {
    alerts: [],
  };

  public render() {
    return <div>{this.props.alerts.map(alert => <Alert {...alert} />)}</div>;
  }
}
