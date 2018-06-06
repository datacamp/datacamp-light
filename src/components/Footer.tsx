import * as React from "react";

import BackendStatus from "../containers/BackendStatus";
import noop from "../helpers/noop";
import { ISubmitCodePayload } from "../redux/backend-session";
import Button from "./Button";
import RestartSessionButton from "../containers/RestartSessionButton";

import * as DatacampLogo from "../images/datacamp-logo.svg";

import * as styles from "./Footer.module.scss";

export interface IFooterProps extends React.Props<Footer> {
  onSubmit?: (payload: Partial<ISubmitCodePayload>) => void;
  onShowHint?: (event: React.SyntheticEvent<HTMLButtonElement>) => void;
  onShowSolution?: (event: React.SyntheticEvent<HTMLButtonElement>) => void;
  isSessionBroken?: boolean;
  isSessionBusy?: boolean;
  hint?: string;
  solution?: string;
  showSolutionButton?: boolean;
  showRunButton?: boolean;
}

interface IFooterState {
  isHintPressed: boolean;
}

export class Footer extends React.PureComponent<IFooterProps, IFooterState> {
  public static defaultProps: Partial<IFooterProps> = {
    onShowHint: noop,
    onShowSolution: noop,
    onSubmit: noop,
    isSessionBroken: false,
    isSessionBusy: false,
    showSolutionButton: false,
    showRunButton: false,
  };

  public displayName: string = "Footer";

  constructor() {
    super();
    this.state = {
      isHintPressed: false,
    };

    this.onShowHint = this.onShowHint.bind(this);
    this.onRun = this.onRun.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onShowHint(event: React.SyntheticEvent<HTMLButtonElement>) {
    this.setState({
      isHintPressed: true,
    });
    this.props.onShowHint(event);
  }

  onRun() {
    this.props.onSubmit({
      command: "console",
    });
  }

  onSubmit() {
    this.props.onSubmit({
      command: "submit",
    });
  }

  public render() {
    return (
      <div className={styles.footer}>
        {this.props.hint ? (
          <Button size="small" onClick={this.onShowHint}>
            Hint
          </Button>
        ) : null}
        {this.props.solution &&
        this.props.showSolutionButton &&
        (!this.props.hint || this.state.isHintPressed) && (
          <Button size="small" onClick={this.props.onShowSolution}>
            Solution
          </Button>
        )}
        {this.props.solution ? (
          <Button
            size="small"
            type="primary"
            onClick={this.onSubmit}
            disabled={this.props.isSessionBroken}
          >
            Submit
          </Button>
        ) : null}
        {!this.props.solution || this.props.showRunButton ? (
          <Button
            size="small"
            type="primary"
            onClick={this.onRun}
            disabled={this.props.isSessionBroken || this.props.isSessionBusy}
          >
            Run
          </Button>
        ) : null}
        <BackendStatus className={styles.status} />
        <div className={`${styles.spacer}`} />
        <RestartSessionButton
          visible={this.props.isSessionBroken}
          className={styles.restart}
        />
        <a
          href="https://www.datacamp.com/?utm_source=datacamp_light&utm_campaign=powered_by_datacamp"
          className={styles.logo}
          title="Powered by DataCamp"
          target="_blank"
        >
          <DatacampLogo />
        </a>
      </div>
    );
  }
}

export default Footer;
