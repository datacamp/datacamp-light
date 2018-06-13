import * as React from "react";

import "xterm/dist/xterm.css";
import { Terminal as Xterm, ITerminalOptions as IXtermOptions } from "xterm";
import { fit } from "xterm/lib/addons/fit/fit";
import { terminadoAttach } from "xterm/lib/addons/terminado/terminado";
import { includes } from "lodash";

import * as styles from "./Terminal.module.scss";

export interface ITerminalProps extends React.Props<Terminal> {
  className?: string;
  options: IXtermOptions;
  autoFocus?: boolean;
  socketUrl?: string;
  onError?: () => void;
  shouldFocusOnOpen?: boolean;
  shouldFocus?: boolean;
  timeoutToReconnect: number;
  isSessionBroken?: boolean;
  shortcutKeys?: string[];
  lastError?: string;
  isExerciseCompleted?: boolean;
  glContainer?: any;
}

export class Terminal extends React.PureComponent<ITerminalProps> {
  public static defaultProps: ITerminalProps = {
    options: {
      cursorBlink: true,
      fontFamily: "monospace",
      fontSize: 12,
      lineHeight: 1.2,
    },
    autoFocus: false,
    timeoutToReconnect: 2000,
    isExerciseCompleted: false,
  };

  socket: WebSocket;
  timeoutInterval: NodeJS.Timer;
  term: Xterm;
  containerNode?: HTMLDivElement;

  constructor(props: ITerminalProps) {
    super(props);
    this.socket = null;
    this.timeoutInterval = null;
    this.term = null;
  }

  componentDidMount() {
    const {
      options,
      autoFocus,
      socketUrl,
      isSessionBroken,
      shouldFocus,
    } = this.props;

    this.term = new Xterm(options);
    this.term.open(this.containerNode);
    this.term.write("Click here to activate the terminal.");
    this.openConnection(socketUrl, isSessionBroken);
    if (shouldFocus && autoFocus) {
      this.term.focus();
    }
  }

  componentWillReceiveProps(nextProps: ITerminalProps) {
    this.openConnection(nextProps.socketUrl, nextProps.isSessionBroken);
    // blur the terminal if the user completes the ex
    if (!this.props.isExerciseCompleted && nextProps.isExerciseCompleted) {
      this.blurTerm();
    }
  }

  componentDidUpdate(prevProps: ITerminalProps) {
    const container = this.props.glContainer;
    if (container !== prevProps.glContainer) {
      if (prevProps.glContainer && this.props.glContainer.parent) {
        prevProps.glContainer.parent.off("resize", this.onResize);
      }
      this.props.glContainer.parent.on("resize", this.onResize);
    }
  }

  componentWillUnmount() {
    this.term.destroy();
    this.closeConnection();
    clearInterval(this.timeoutInterval);
    if (this.props.glContainer && this.props.glContainer.parent) {
      this.props.glContainer.parent.off("resize", this.onResize);
    }
  }

  onOpen = () => {
    this.term.reset();
    terminadoAttach(this.term, this.socket, true, false);
    if (this.props.shouldFocus && this.props.shouldFocusOnOpen) {
      this.term.focus();
    }
    this.onResize();

    this.term.attachCustomKeyEventHandler(e => {
      const key = (e.key || String.fromCharCode(e.keyCode)).toLowerCase();
      if (e.ctrlKey && !e.altKey && key && key === "1") {
        this.blurTerm();
        return false;
      }
      if (e.ctrlKey && includes(this.props.shortcutKeys, key)) {
        setImmediate(() => window.dispatchEvent(e));
        return false;
      }
      return true;
    });
  };

  onClose = (ev: CloseEvent) => {
    const { code } = ev;
    // closed normally
    if (code === 1000) {
      return;
    }

    const { timeoutToReconnect, isSessionBroken } = this.props;
    if (isSessionBroken || !timeoutToReconnect) {
      this.onError();
    } else {
      this.openConnection();
      // Check if the connection is still closed after timeoutToReconnect ms
      if (!this.timeoutInterval) {
        this.timeoutInterval = setTimeout(() => {
          if (this.isConnectionClosed()) {
            this.onError();
          }
          this.timeoutInterval = null;
        }, timeoutToReconnect);
      }
    }
  };

  isConnectionClosed() {
    return this.socket && this.socket.readyState === this.socket.CLOSED;
  }

  closeConnection() {
    if (this.socket) {
      this.socket.onclose = () => {};
      this.socket.onopen = () => {};
      this.socket.close();
    }
  }

  onError() {
    if (this.props.onError) {
      this.props.onError();
    }
    if (this.props.lastError && this.term) {
      this.term.writeln(this.props.lastError);
    }
  }

  openConnection(
    socketUrl = this.props.socketUrl,
    isSessionBroken = this.props.isSessionBroken
  ) {
    if (!socketUrl) {
      this.closeConnection();
    } else if (isSessionBroken) {
      this.closeConnection();
      this.onError();
    } else if (
      (this.socket && this.socket.url !== socketUrl) ||
      (!this.socket && socketUrl) ||
      this.isConnectionClosed()
    ) {
      this.closeConnection();
      if (socketUrl) {
        this.socket = new WebSocket(socketUrl);
        this.socket.onclose = this.onClose;
        this.socket.onopen = this.onOpen;
      }
    }
  }

  onResize = () => setImmediate(() => fit(this.term));
  blurTerm = () => setImmediate(() => this.term.blur());

  render() {
    return (
      <div
        ref={r => {
          this.containerNode = r;
        }}
        className={`xterm xterm-terminal ${this.props
          .className} ${styles.terminal}`}
      />
    );
  }
}

export default Terminal;
