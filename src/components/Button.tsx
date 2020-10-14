import * as React from "react";
const outdent = require("strip-indent");

import * as styles from "./Button.module.scss";
type StyleKey = keyof typeof styles;

interface IButtonProps extends React.Props<Button> {
  appearance?: "primary" | "inverted";
  size?: "small" | "extra-small" | "large";
  disabled?: boolean;
  className?: string;
  onClick?: (event: React.SyntheticEvent<HTMLButtonElement>) => void;
}

export class Button extends React.Component<IButtonProps> {
  public static defaultProps: Partial<IButtonProps> = {
    disabled: false,
    appearance: "inverted",
  };

  button: HTMLElement;

  onClick(event: React.SyntheticEvent<HTMLButtonElement>) {
    this.button.blur();
    this.props.onClick(event);
  }

  public render() {
    const classNames = outdent(`
          ${this.props.className || ""}
          ${styles.button}
          ${styles[this.props.appearance as StyleKey]}
          ${this.props.size ? styles[this.props.size as StyleKey] : ""}
          ${this.props.disabled ? styles.disabled : ""}`);

    return (
      <button
        className={classNames}
        onClick={this.props.onClick}
        disabled={this.props.disabled}
        ref={button => (this.button = button)}
      >
        {this.props.children}
      </button>
    );
  }
}

export default Button;
