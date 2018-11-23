// tslint:disable:max-classes-per-file

declare module "*.scss" {
  const _: any;
  export = _;
}

declare module "*.svg" {
  const _: any;
  export = _;
}

declare module "universal-rx-request" {
  import { Observable } from "rxjs/Observable";

  function rxRequest(options: {}): Observable<any>;

  namespace rxRequest {
    function importRxExtensions(): void;
  }

  export = rxRequest;
}

declare module "browser-cookies" {
  namespace BrowserCookies {
    interface IOptions {
      expires: number | string | Date;
      domain: string;
      path: string;
      secure: boolean;
      httponly: boolean;
    }

    type Options = IOptions;

    const set: (
      name: string,
      value: string,
      options?: Partial<Options>
    ) => void;
    const get: (name: string) => string;
    const erase: (name: string, options?: Partial<Options>) => void;
    const all: () => { [x: string]: string };
    const defaults: Partial<Options>;
  }

  export = BrowserCookies;
}

declare const __IS_DEBUG__: boolean;

declare module "base-plugin" {
  type Subscriber<T> = (state: T) => void;
  type SubscriptionDeleter = () => void;

  export const PLUGIN_NAME = "Plugin";

  export default class Plugin {
    public subscribe: (subscriber: Subscriber<any>) => SubscriptionDeleter;
    public getState: () => any;
    public mergeNewState: (newState: any) => any;
    public setState: (newState: any) => void;

    protected state: any;
    protected subscriberCount: number;
    protected subscribers: {
      [x: number]: Subscriber<any>;
    };

    constructor(...args: any[]);
  }
}

declare module "@datacamp/plugin-manager" {
  import Plugin, { Subscriber, SubscriptionDeleter } from "base-plugin";

  export const PLUGIN_NAME = "PluginManager";

  export default class PluginManager extends Plugin {
    public plugins: {
      [x: string]: Plugin;
    };

    public subscribeToPlugin: (
      key: string,
      plugin: Plugin
    ) => typeof plugin.subscribe;
    public register: <T extends Plugin>(
      key: string,
      NewPlugin: { new (...args: any[]): T },
      ...args: any[]
    ) => T;
    public remove: (key: string) => boolean;
    public get: (pluginName: string) => Plugin | null;
    public checkValidPlugin: (NewPlugin: typeof Plugin) => void;

    public subscribe: (subscriber: Subscriber<any>) => SubscriptionDeleter;
    public getState: () => any;
    public mergeNewState: (newState: any) => any;
    public setState: (newState: any) => void;

    protected state: any;
    protected subscriberCount: number;
    protected subscribers: {
      [x: number]: Subscriber<any>;
    };
  }
}

declare module "@datacamp/multiplexer-client" {
  import BasePlugin, { Subscriber, SubscriptionDeleter } from "base-plugin";
  import { Observable } from "rxjs/Observable";
  import { Subscription } from "rxjs/Subscription";

  export const PLUGIN_NAME = "multiplexer-client";

  export type SessionStatusCode = "broken" | "busy" | "none" | "ready";
  export interface ISessionStatus {
    status: SessionStatusCode;
    text?: string;
  }

  export type SessionStatus = ISessionStatus;

  export type Language = "r" | "python" | "revo" | "shell";
  export type ExerciseType =
    | "PlainMultipleChoiceExercise"
    | "PureMultipleChoiceExercise"
    | "NormalExercise"
    | "VideoExercise"
    | "SwirlExercise"
    | "RStudioMultipleChoiceExercise"
    | "MultipleChoiceExercise"
    | "BokehServerExercise"
    | "SingleProcessExercise"
    | "ExamExercise"
    | "MarkdownExercise"
    | "TabExercise"
    | "BulletExercise"
    | "TabConsoleExercise"
    | "BulletConsoleExercise"
    | "RCppExercise"
    | "ConsoleExercise";
  export type CommandType = "console" | "init" | "soft_init" | "submit";

  interface IAnyCommand {
    width?: number;
    height?: number;
    type?: ExerciseType;
    pec?: string;
    sct?: string;
    solution?: string;
    command: CommandType;
    code: string;
    echo?: boolean;
  }

  interface IRCommand extends IAnyCommand {
    figureIndex?: any;
    activeTab?: any;
    format?: any;
    autoComp?: string;
    cursorPos?: number;
  }

  interface IPythonCommand extends IAnyCommand {
    filename?: string;
    autoComp?: string;
    cursorPos?: number;
    tableName?: any;
  }

  export type Command = IRCommand | IPythonCommand;

  interface ISessionOutputCode {
    type: "code";
    payload: string;
  }

  interface ISessionOutputSct {
    type: "sct";
    payload: {
      correct: boolean;
      message: string;
    };
  }

  interface ISessionOutputError {
    type: "error" | "backend-error";
    payload: any; // TODO
  }

  interface ISessionOutputCodeCompletion {
    type: "code-completion";
    payload: any; // TODO
  }

  interface ISessionOutputGraph {
    type: "graph";
    payload: string;
  }

  interface ISessionOutputIframe {
    type: "iframe";
    payload: string;
  }

  interface ISessionOutputFigureResize {
    type: "figure-resize";
    payload: {
      url: string;
      index: number;
    };
  }

  interface ISessionOutputFigureExpand {
    type: "figure-expand";
    payload: {
      index: number;
      url: string;
    };
  }

  interface ISessionOutputServer {
    type: "server";
    payload: string;
  }

  // TODO only have the accepted output types
  interface ISessionOutputAny {
    type: string;
    payload: any;
  }

  export type SessionOutput =
    | ISessionOutputCode
    | ISessionOutputSct
    | ISessionOutputError
    | ISessionOutputCodeCompletion
    | ISessionOutputGraph
    | ISessionOutputIframe
    | ISessionOutputFigureResize
    | ISessionOutputFigureExpand
    | ISessionOutputServer;

  interface ISessionOptions {
    language: Language;
    force_new?: boolean;
    image_tag?: any;
    shared_image?: any;
    maxRetry?: number;
    maxRestart?: number;
    debug?: boolean;
    startOptions?: {};
    flattenOutputs?: boolean;
    client?: any;
    dcBackend?: any;
    status?: SessionStatusCode;
    initCommand?: Command;
  }

  namespace Multiplexer {
    class Session extends BasePlugin {
      public static STATUS: {
        [x: string]: SessionStatusCode;
      };

      public subscribe: (
        subscriber: Subscriber<SessionStatus>
      ) => SubscriptionDeleter;
      public output$: Observable<SessionOutput[]>;

      protected userInfos: any;
      protected options: ISessionOptions;
      protected dcBackend: any; // TODO
      protected client: MuxClient;
      protected state: SessionStatus;

      constructor(userInfos: any, options: ISessionOptions);
    }

    class SyncSession extends Session {
      public start: (
        options?: ISessionOptions,
        initCommand?: Command
      ) => Promise<any>;
      public reset: () => Promise<any>;
      public input: (
        command: Command,
        options?: Partial<ISessionOptions>
      ) => Promise<any>;
      public flush: () => Promise<any>;
      public stop: () => Promise<any>;

      constructor(userInfos: any, options: ISessionOptions);
    }

    class AsyncSession extends Session {
      public start: (options?: ISessionOptions, initCommand?: Command) => void;
      public reset: () => void;
      public input: (input: Command) => void;
      public stopPolling: () => void;
      public stop: () => Promise<any>;

      public startAsyncSubscription: () => void;
      public subscribeToOutputs: (
        predicate: (outputs: SessionOutput[] | SessionOutput) => boolean,
        listener: (outputs: SessionOutput[]) => void
      ) => Subscription;
      public connect: () => void;
      public disconnect: () => void;
      public unsubscribeAll: () => void;

      constructor(userInfos: any, options: ISessionOptions);
    }

    type Listener = (data: any) => void;

    export class MuxClient {
      public on: (event: string, callback: Listener) => void;
      public off: (event: string) => void;
      public callListeners: (event: string, data: any) => void;

      protected host: string;
      protected listeners: {
        [x: string]: Listener[];
      };

      private requests: () => {
        new: (
          imageInfos: any,
          options: {
            email: string;
            authentication_token: string;
          }
        ) => Promise<any>;
        input: (
          options: {
            command: Command;
          }
        ) => Promise<any>;
        read: () => Promise<any>;
        flush: () => Promise<any>;
        delete: () => Promise<any>;
      };

      constructor(host: string);
    }
  }

  export default Multiplexer;
}

declare module "strip-indent" {
  function stripIndent(text: string): string;

  namespace stripIndent {

  }

  export = stripIndent;
}

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

declare module "@datacamp/ui-console" {
  import { Component, Props } from "react";

  export const getEditor: (consoleId: string) => any;

  export interface IConsoleProps extends Props<ConsoleBody> {
    canExecuteCommand?: boolean;
    code?: string;
    consoleId?: string;
    getCompletions?: (...args: any[]) => any;
    id?: number;
    language?: string;
    onFocusChanged?: (isFocus: boolean) => void;
    pre_exercise_code?: string;
    printDelay?: number;
    promptPrefix?: string;
    saveCode?: (
      data: {
        id: number;
        code: string;
        tabKey: string;
        category: string;
      }
    ) => void;
    sct?: string;
    setCompletionsCallback?: (...args: any[]) => any;
    setOutputCallback?: (callback: (outputArray: any[]) => void) => void;
    solution?: string;
    submitCode?: (
      command: {
        code: string;
        command: string;
        id?: number;
        language?: string;
        pec?: string;
        sct?: string;
        solution?: string;
      }
    ) => void;
    type?: string;
  }

  export default class ConsoleBody extends Component<IConsoleProps> {}
}

declare module "@datacamp/ui-editor" {
  import { Component, Props } from "react";

  export const formatCode: (code: string) => string;
  export const getEditor: (editorId: any) => any;
  export const setEditorCode: (editorId: any, code: string) => void;

  interface IEditorProps extends Props<EditorBody> {
    lineErrors?: { [x: string]: any };
    uniqueId?: string;
    code?: string;
    language?: string;
    saveCode?: (
      data: {
        id: number;
        code: string;
        tabKey: string;
        category: string;
      }
    ) => void;
    id?: number;
    pre_exercise_code?: string;
    solution?: string;
    sct?: string;
    type?: string;
    ckey?: string;
    onFocusChanged?: (isFocus: boolean) => void;
    onCodeChange?: (
      data: {
        code: string;
      }
    ) => void;
    getCompletions?: (...args: any[]) => void; // TODO
    setCompletionsCallback?: (...args: any[]) => void; // TODO
    enableAutocomplete?: boolean;
    aceMode?: string;
    onEditorMount?: (...args: any[]) => void;
    className?: string;
  }

  export default class EditorBody extends Component<IEditorProps> {}
}

declare module "@datacamp/ui-plot" {
  import { Component, Props } from "react";

  export interface IPlotSource {
    type: "img" | "html";
    src: string;
  }

  export interface IPlotProps extends Props<Plot> {
    sources?: string[];
    currentIndex?: number;
    setIndex: (currentIndex: number) => void;
    exercise: {
      language: string;
      type: string;
    };
    resizePlot: (
      currentIndex: number,
      language: string,
      width?: number,
      height?: number
    ) => void;
    expand: (source: IPlotSource) => void;
  }

  export default class Plot extends Component<IPlotProps> {}
}
