import {
  ExerciseType,
  Language,
  SessionOutput,
} from "@datacamp/multiplexer-client";
import { AnyAction as Action } from "typescript-fsa";

import { setExerciseFeedback, setShellProxy } from "../redux/exercise";
import { addPlot, setPlot } from "../redux/output";

import { expandHandler } from "./plot";

export const outputsForConsole = [
  "code",
  "script-output",
  "output",
  "r-message",
  "r-warning",
  "parse-error",
  "r-error",
  "backend-error",
  "error",
  "result",
  "unlock-console",
  "lock-console",
];

export const getAction = (
  language: Language,
  output: SessionOutput,
  exerciseType: ExerciseType
): Action | null => {
  switch (output.type) {
    case "sct":
      return setExerciseFeedback({
        content: output.payload.message,
        type: output.payload.correct ? "success" : "danger",
      });
    case "graph":
      return addPlot({
        type: "img",
        src: output.payload,
      });
    case "iframe":
      return addPlot({
        type: "html",
        src: output.payload,
      });
    case "figure-resize":
      return setPlot({
        figureIndex: output.payload.index,
        source: {
          type: "img",
          src: output.payload.url,
        },
      });
    case "figure-expand":
      return expandHandler(
        "plot",
        { type: "img", src: output.payload.url },
        output.payload.index
      );
    case "server":
      return setShellProxy(output.payload);
    default:
      // Handled by callback
      return null;
  }
};

export default getAction;
