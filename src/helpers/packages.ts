import * as _ from "lodash";

export const getPackages = (packages: string, language: string) => {
  if (language == "python") {
    if (_.isNil(packages) || _.trim(packages) === "") {
      return "";
    }
    return `from dcl_package_manager import install_packages, print_packages; install_packages([${formatPackages(
      packages
    )}])\n`;
  }
  return ""
};

const formatPackages = (packages: string) => {
  return packages
    .split(",")
    .reduce(
      (accumulator, singlePackage) => `${accumulator}'${singlePackage}',`,
      ""
    );
};

export default getPackages;
