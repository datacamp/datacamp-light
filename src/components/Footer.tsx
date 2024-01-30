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
  sct?: string;
  language?: string;
  utmSource?: string;
  utmCampaign?: string;
  impactTrackingLink?: string;
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
    utmSource: "datacamp_light",
    utmCampaign: "powered_by_datacamp",
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
    const { utmSource, utmCampaign, impactTrackingLink } = this.props;
    const baseUrl = impactTrackingLink
      ? "https://datacamp.pxf.io"
      : "https://www.datacamp.com/";
    const queryParams = `utm_source=${utmSource}&utm_campaign=${utmCampaign}`;
    const datacampUrl = impactTrackingLink
      ? `${baseUrl}${impactTrackingLink}`
      : `${baseUrl}?${queryParams}`;

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
          <Button
            appearance="inverted"
            size="small"
            onClick={this.props.onShowSolution}
          >
            Solution
          </Button>
        )}
        {this.props.language !== "shell" && this.props.sct ? (
          <Button
            size="small"
            appearance="primary"
            onClick={this.onSubmit}
            disabled={this.props.isSessionBroken || this.props.isSessionBusy}
          >
            Submit
          </Button>
        ) : null}
        {this.props.language !== "shell" &&
        (!this.props.solution || this.props.showRunButton) ? (
          <Button
            size="small"
            appearance="primary"
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
          href={datacampUrl}
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
