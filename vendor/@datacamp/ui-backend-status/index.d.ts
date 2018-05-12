declare module "@datacamp/ui-backend-status" {
  import { Component, Props } from "react";

  interface IBackendStatusProps extends Props<BackendStatus> {
    className?: string;
    isInitSession?: boolean;
    language?: string;
    runtimeConfig?: string;
    status: {
      code: string;
      text: string;
    };
  }

  export default class BackendStatus extends Component<IBackendStatusProps> {}
}
