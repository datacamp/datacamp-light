import { ExerciseType, Language } from "@datacamp/multiplexer-client";
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
import Hub from "./helpers/hub";
import uuid from "./helpers/uuid";
import { setExercise, updateCode, setId, setListener } from "./redux/exercise";
import createStore from "./redux/store";

type Settings = {
  id: string;
  height: number;
  hint?: string;
  language: Language;
  pre_exercise_code?: string;
  sample_code?: string;
  sct: string;
  solution: string;
  showRunButton: boolean;
  noLazyLoad?: boolean;
  type?: ExerciseType;
};

export function getSettings(element: HTMLDivElement): Settings {
  let settings: Settings = {
    height: parseInt(element.getAttribute("data-height") || "auto", 10),
    id: element.id,
    language: "r",
    sct: "",
    showRunButton: false,
    solution: "",
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
    settings.noLazyLoad = exercise.noLazyLoad;
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

    Object.assign(settings, {
      hint: getHint(),
      language: (element.getAttribute("data-lang") || "r") as Language,
      pre_exercise_code: getText("pre-exercise-code"),
      sample_code: getText("sample-code"),
      sct: getText("sct"),
      solution: getText("solution"),
      showRunButton: showRunButton,
      noLazyLoad: undefined, // assigned later
    });
  }
  // Encoded content can also have the data-no-lazy-load attribute
  if (
    element.hasAttribute("data-no-lazy-load") &&
    settings.noLazyLoad === undefined
  ) {
    settings.noLazyLoad =
      element.getAttribute("data-no-lazy-load").toLowerCase() !== "false";
  }

  if (isNaN(settings.height)) {
    settings.height = 78 + settings.sample_code.split(/\r?\n/).length * 17;
  }

  settings.height = settings.height >= 300 ? settings.height : 300;

  if (settings.language == "shell") {
    settings.type = "ConsoleExercise";
  }

  return settings;
}

export default (element: HTMLDivElement, hub: Hub) => {
  const storeEnhancer = composeWithDevTools(
    applyMiddleware(createEpicMiddleware(rootEpic))
  );

  const utmSource = element.getAttribute("data-utm-source") || undefined;
  const utmCampaign = element.getAttribute("data-utm-campaign") || undefined;
  const impactTrackingLink =
    element.getAttribute("data-impact-tracking-link") || undefined;
  const settings = getSettings(element);

  // Create the store
  const store = createStore(storeEnhancer);
  const App = createApp(store);

  element.style.height = `${settings.height}px`;

  const getAppContainer = () => {
    return (
      <AppContainer>
        <Provider store={store}>
          <App
            height={settings.height}
            language={settings.language}
            utmSource={utmSource}
            utmCampaign={utmCampaign}
            impactTrackingLink={impactTrackingLink}
          />
        </Provider>
      </AppContainer>
    );
  };

  if (settings.noLazyLoad) {
    render(getAppContainer(), element);
  } else {
    render(
      <LazyLoad
        height={settings.height}
        offset={200}
        once
        placeholder={<Placeholder />}
        debounce={50}
      >
        {getAppContainer()}
      </LazyLoad>,
      element
    );
  }

  store.dispatch(setExercise(settings));
  store.dispatch(updateCode(settings.sample_code));
  const id = element.id || uuid();
  store.dispatch(setId(id));

  store.dispatch(setListener((t, p) => hub.process(t, p)));

  element.removeAttribute("data-datacamp-exercise");
  element.className += " datacamp-exercise";

  return id;
};
