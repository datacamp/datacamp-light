import * as React from "react";

import { IAlert } from "../redux/view";

import * as styles from "./Alert.module.scss";

export interface IAlertProps extends React.Props<Alert>, IAlert {
  className?: string;
  closable?: boolean;
}

export interface IAlertState {
  open: boolean;
}

export class Alert extends React.Component<IAlertProps, IAlertState> {
  public static defaultProps: Partial<IAlertProps> = {
    className: "",
    closable: false,
  };

  constructor(props: IAlertProps) {
    super(props);
    this.close = this.close.bind(this);
  }

  public componentWillMount() {
    this.setState({
      open: true,
    });
  }

  public close() {
    this.setState(prevState => ({
      ...prevState,
      open: false,
    }));
  }

  public componentWillReceiveProps() {
    this.setState(prevState => ({
      ...prevState,
      open: true,
    }));
  }

  public render() {
    let closeButton: JSX.Element = null;
    if (this.props.closable) {
      closeButton = (
        <button type="button" className={styles.close} onClick={this.close}>
          ×
        </button>
      );
    }

    return this.state.open ? (
      <div
        className={`${styles.alert} ${styles[this.props.type]} ${this.props
          .className}`}
      >
        {closeButton}
        <div dangerouslySetInnerHTML={{ __html: this.props.content }} />
      </div>
    ) : null;
  }
}

export default Alert;
