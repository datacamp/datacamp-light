import * as React from "react";
import xss = require("xss");

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
    const { closable, className, type, content } = this.props;

    const sanitizedContent = xss(content, {
      stripIgnoreTag: true,
      stripIgnoreTagBody: true,
    });

    if (closable) {
      closeButton = (
        <button
          type="button"
          aria-label="Close mesage"
          className={styles.close}
          onClick={this.close}
        >
          ×
        </button>
      );
    }

    return this.state.open ? (
      <div className={`${styles.alert} ${styles[type]} ${className}`}>
        {closeButton}
        <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
      </div>
    ) : null;
  }
}

export default Alert;
