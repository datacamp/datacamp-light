import { Language } from "@datacamp/multiplexer-client";
import * as React from "react";
import { Provider } from "react-redux";
import { render } from "react-dom";
import { AppContainer } from "react-hot-loader";
import { applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createEpicMiddleware } from "redux-observable";
import LazyLoad from "react-lazyload";
const outdent = require("strip-indent");

import createApp from "./containers/App";
import Placeholder from "./components/Placeholder";
import rootEpic from "./helpers/epics";
import uuid from "./helpers/uuid";
import { setExercise, updateCode, setId } from "./redux/exercise";
import createStore from "./redux/store";

export default (element: HTMLDivElement) => {
  const storeEnhancer = composeWithDevTools(
    applyMiddleware(createEpicMiddleware(rootEpic))
  );

  let settings: any = {
    id: element.id,
    height: parseInt(element.getAttribute("data-height") || "auto", 10),
  };

  if (element.getAttribute("data-encoded")) {
    const exercise = JSON.parse(atob(decodeURIComponent(element.textContent)));
    settings.hint = exercise.hint;
    settings.language = exercise.language;
    settings.pre_exercise_code = exercise.pre_exercise_code;
    settings.sample_code = exercise.sample || exercise.sample_code;
    settings.sct = exercise.sct;
    settings.solution = exercise.solution;
    settings.showRunButton = exercise.showRunButton;
  } else {
    const getText = (type: string, isEncoded?: boolean) => {
      const textElement = element.querySelector(`code[data-type=${type}]`);
      if (!textElement) {
        return "";
      }

      return outdent(textElement.textContent).trim();
    };

    const getHint = () => {
      const hintElement = element.querySelector("[data-type=hint]");
      if (!hintElement) {
        return undefined;
      } else {
        return hintElement.innerHTML;
      }
    };

    const showRunButton =
      element.hasAttribute("data-show-run-button") &&
      element.getAttribute("data-show-run-button").toLowerCase() !== "false";

    // Get settings
    Object.assign(settings, {
      hint: getHint(),
      language: (element.getAttribute("data-lang") || "r") as Language,
      pre_exercise_code: getText("pre-exercise-code"),
      sample_code: getText("sample-code"),
      sct: getText("sct"),
      solution: getText("solution"),
      showRunButton: showRunButton,
    });
  }

  if (isNaN(settings.height)) {
    settings.height = 78 + settings.sample_code.split(/\r?\n/).length * 17;
  }

  settings.height = settings.height >= 300 ? settings.height : 300;

  // Create the store
  const store = createStore(storeEnhancer);
  const App = createApp(store);

  element.style.height = `${settings.height}px`;

  render(
    <LazyLoad
      height={settings.height}
      offset={200}
      once
      placeholder={<Placeholder />}
      debounce={50}
    >
      <AppContainer>
        <Provider store={store}>
          <App height={settings.height} language={settings.language} />
        </Provider>
      </AppContainer>
    </LazyLoad>,
    element
  );

  store.dispatch(setExercise(settings));
  store.dispatch(updateCode(settings.sample_code));
  store.dispatch(setId(element.id || uuid()));

  element.removeAttribute("data-datacamp-exercise");
  element.className += " datacamp-exercise";
};
