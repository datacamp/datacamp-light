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
