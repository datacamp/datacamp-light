import { AnyAction as Action } from "typescript-fsa";
import { isEmpty } from "lodash";
import { IPlotSource } from "@datacamp/ui-plot";

import { submitCode } from "../redux/backend-session";
import { ExerciseState } from "../redux/exercise";

export const hexToBase64 = (str: string) => {
  // Generate hex array from hex string
  const hexArray = str
    .replace(/\r|\n/g, "")
    .replace(/([\da-fA-F]{2}) ?/g, "0x$1 ")
    .replace(/ +$/, "")
    .split(" ");

  const CHUNK_SIZE = 0x8000; // Arbitrary number
  let index = 0;
  const length = hexArray.length;
  let result = "";
  let slice;
  // Passing too many arguments into fromCharCode gives `Maximum call stack size exceeded`.
  // We divide the hex array into pieces and pass these.
  while (index < length) {
    slice = hexArray.slice(index, index + CHUNK_SIZE);
    result += String.fromCharCode.apply(null, slice);
    index += CHUNK_SIZE;
  }
  return window.btoa(result);
};

export const createImageSrc = (payload: string) => {
  // Old SVGs (from Python) come in plain text
  if (payload.indexOf("<svg") > -1) {
    return `data:image/svg+xml,${encodeURI(payload)}`;
  }
  // New SVGs (from Python) com in base64 - they always start with PD94
  if (payload.indexOf("PD94") == 0) {
    return `data:image/svg+xml;base64,${payload}`;
  }
  // PNGs (from R) come in hex; need to convert to base 64
  return `data:image/png;base64,${hexToBase64(payload)}`;
};

export const expandHandler = (
  type: string,
  source: IPlotSource,
  figureIndex: number,
  currentExercise?: ExerciseState
): Action | null => {
  const checkPopup = (expandWindow: Window) => {
    if (isEmpty(expandWindow)) {
      alert(
        `Make sure to enable pop-ups. The plot didn\'t open automatically because your browser doesn\'t allow pop-ups.`
      );
    }
    return false;
  };

  let height = 640;
  let width = 640;

  const expandWindow = window.open(
    "",
    "_blank",
    `height=${height}px,width=${width}px`
  );
  console.log("opened window", expandWindow);
  const isBlocked = checkPopup(expandWindow);
  if (isBlocked) return null;
  if (window.focus && expandWindow) expandWindow.focus();
  if (source.type === "img") {
    expandWindow.document.body.innerHTML = `<div style="width: 100%; height: 100%;"><img alt="plot" style="max-width: 100%; max-height: 100%;" src="${createImageSrc(
      source.src
    )}"></div>`;
  } else if (source.type === "html") {
    expandWindow.document.write(decodeURI(source.src));
  }
  return { type: "noop" };
};
