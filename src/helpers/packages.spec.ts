import getPackages from "./packages";

describe("getPackages", () => {
  test("should return an empty string if the language is not Python", () => {
    expect(getPackages("pandas", "")).toEqual("");
  });
  test("should return an empty string if packages is null", () => {
    expect(getPackages(null, "python")).toEqual("");
  });
  test("should return an empty string if no packages are specified", () => {
      expect(getPackages("", "python")).toEqual("");
  });
  test("should return the import instruction if packages and language are both specified", () => {
      expect(getPackages("pandas", "python")).toEqual("from dcl_package_manager import install_packages, print_packages; install_packages(['pandas',])\n");
  })
});
