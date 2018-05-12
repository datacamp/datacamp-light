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
