import * as React from "react";

import Button from "./Button";
import * as styles from "./Button.module.scss";

import noop from "../helpers/noop";

export interface IRestartSessionButtonProps
  extends React.Props<RestartSessionButton> {
  className?: string;
  visible?: boolean;
  onClickRestart?: (event: React.SyntheticEvent<HTMLButtonElement>) => void;
}

export class RestartSessionButton extends React.Component<
  IRestartSessionButtonProps
> {
  public static defaultProps: Partial<IRestartSessionButtonProps> = {
    visible: true,
    onClickRestart: noop,
  };

  public render() {
    if (!this.props.visible) {
      return false;
    }

    return (
      <div className={this.props.className}>
        <Button
          size="small"
          appearance="inverted"
          onClick={this.props.onClickRestart}
        >
          <span>Restart</span>
          <span className={`${styles.largeScreen}`}> Session</span>
        </Button>
      </div>
    );
  }
}

export default RestartSessionButton;
