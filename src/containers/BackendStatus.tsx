import * as BackendStatus from "@datacamp/ui-backend-status";
import "@datacamp/ui-backend-status/lib/style.css";
import { connect, MapStateToProps } from "react-redux";

import { State } from "../redux";
import { selectBackendUIStatus } from "../redux/backend-session";
import { selectLanguage } from "../redux/exercise";

interface IStateProps extends Partial<BackendStatus.IBackendStatusProps> {
  isInitSession: boolean;
  language: string;
  status: {
    code: string;
    text: string;
  };
}

interface IOwnProps extends Partial<BackendStatus.IBackendStatusProps> {
  runtimeConfig?: string;
  className?: string;
}

const mapStateToProps: MapStateToProps<IStateProps, IOwnProps> = (
  state: State
) => ({
  isInitSession: true,
  language: selectLanguage(state),
  runtimeConfig: "spark",
  status: selectBackendUIStatus(state),
});

export default connect<BackendStatus.IBackendStatusProps, {}, IOwnProps>(
  mapStateToProps
)(BackendStatus as any);
