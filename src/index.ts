import "nodelist-foreach-polyfill";
import { forceCheck } from "react-lazyload";

import boot from "./boot";
import Hub, { Listener } from "./helpers/hub";

import "./styles/golden-layout/index.css";

export let instances: { [x: string]: Hub } = {};

function bootstrapDCLightExercises() {
  // Load all exercise div's and bootstrap the DataCamp Light Angular app
  const exercises = document.querySelectorAll("[data-datacamp-exercise]");
  exercises.forEach((el: HTMLDivElement) => {
    let hub = new Hub();
    const id = boot(el, hub);
    instances[id] = hub;
  });
}

(global as any).bootstrapDCLightExercises = bootstrapDCLightExercises;
(global as any).initAddedDCLightExercises = bootstrapDCLightExercises;
(global as any).forceDCLightLazyLoadCheck = forceCheck;

document.addEventListener("DOMContentLoaded", bootstrapDCLightExercises);

if (document.readyState !== "loading") {
  bootstrapDCLightExercises();
}

// Exports are exported in global variable 'DCL'

export const init = bootstrapDCLightExercises;
