import selectImageTag from "./selectImageTag";

describe("selectImageTag", () => {
  test("should return the python image tag based on version chosen", () => {
    expect(selectImageTag("python", "3.5")).toEqual("dcl-python-3.5:latest");
  });

  test("should return python3.5 tag as default if version is not recognised", () => {
    expect(selectImageTag("python", "0.0")).toEqual("dcl-python-3.5:latest");
  });

  test("should return the empty string if language is not python", () => {
    expect(selectImageTag("r", "3.5")).toEqual("");
  });
});
