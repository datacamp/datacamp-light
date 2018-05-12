import "nodelist-foreach-polyfill";

import boot from "./boot";

import "./styles/golden-layout/index.css";

function bootstrapDCLightExercises() {
  // Load all exercise div's and bootstrap the DataCamp Light Angular app
  const exercises = document.querySelectorAll("[data-datacamp-exercise]");
  exercises.forEach(boot);
}

(global as any).bootstrapDCLightExercises = bootstrapDCLightExercises;
(global as any).initAddedDCLightExercises = bootstrapDCLightExercises;

document.addEventListener("DOMContentLoaded", bootstrapDCLightExercises);

if (document.readyState !== "loading") {
  bootstrapDCLightExercises();
}
