import { Language } from "@datacamp/multiplexer-client";
import * as _ from "lodash";

function selectImageTag(language: Language, version: string, packages: string) {
  if (language === "python") {
    const python_versions = ["3.5", "3.6"];
    const default_version = "3.5";

    if (_.isNil(packages) && _.isNil(version)) {
      return "";
    }
    if (python_versions.includes(version)) {
      return `dcl-python-${version}:latest`;
    }
    console.log(
      `Python version not found. Using default Python ${default_version}. Available versions are: " ${python_versions}`
    );
    return `dcl-python-${default_version}:latest`;
  }
  return "";
}

export default selectImageTag;
