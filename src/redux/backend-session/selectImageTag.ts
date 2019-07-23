import { Language } from "@datacamp/multiplexer-client";
import * as _ from "lodash";

const PYTHON_VERSIONS = ["3.5", "3.6"];
const DEFAULT_PYTHON = "3.5";

function selectImageTag(language: Language, version: string, packages: string) {

  if (_.isNil(packages) && _.isNil(version)) {
      return "";
  }
  if (language === "python") {
    if (PYTHON_VERSIONS.includes(version)) {
      return `dcl-python-${version}`;
    }
    console.log(
      `Python version not found. Using default Python ${DEFAULT_PYTHON}. Available versions are: " ${PYTHON_VERSIONS}`
    );
    return `dcl-python-${DEFAULT_PYTHON}`;
  }
  return "";
}

export default selectImageTag;
