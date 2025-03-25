import { getSettings } from "./boot";

describe("getSettings", () => {
  let element: HTMLDivElement;

  beforeEach(() => {
    element = document.createElement("div");
  });

  it("should return default settings when no attributes are set", () => {
    element.id = "test-id";
    const settings = getSettings(element);
    expect(settings.id).toBe("test-id");
    expect(settings.height).toBe(300);
    expect(settings.language).toBe("r");
    expect(settings.sct).toBe("");
    expect(settings.solution).toBe("");
    expect(settings.showRunButton).toBe(false);
  });

  it("should parse height attribute correctly", () => {
    element.setAttribute("data-height", "400");
    const settings = getSettings(element);
    expect(settings.height).toBe(400);
  });

  it("should parse encoded data correctly", () => {
    const data = {
      hint: "Test hint",
      language: "r",
      pre_exercise_code: "pre code",
      sample_code: "sample code",
      sct: "sct code",
      solution: "solution code",
      showRunButton: "true",
      noLazyLoad: "true",
    };
    const encodedData = btoa(JSON.stringify(data));
    element.setAttribute("data-encoded", "true");
    element.textContent = encodeURIComponent(encodedData);
    const settings = getSettings(element);
    expect(settings.hint).toBe(data.hint);
    expect(settings.language).toBe(data.language);
    expect(settings.pre_exercise_code).toBe(data.pre_exercise_code);
    expect(settings.sample_code).toBe(data.sample_code);
    expect(settings.sct).toBe(data.sct);
    expect(settings.solution).toBe(data.solution);
    expect(settings.showRunButton).toBe(data.showRunButton);
    expect(settings.noLazyLoad).toBe(data.noLazyLoad);
  });

  it("should parse non-encoded data correctly", () => {
    element.innerHTML = `
      <code data-type="pre-exercise-code">pre code</code>
      <code data-type="sample-code">sample code</code>
      <code data-type="sct">sct code</code>
      <code data-type="solution">solution code</code>
      <div data-type="hint">Test hint</div>
    `;
    const settings = getSettings(element);
    expect(settings.pre_exercise_code).toBe("pre code");
    expect(settings.sample_code).toBe("sample code");
    expect(settings.sct).toBe("sct code");
    expect(settings.solution).toBe("solution code");
    expect(settings.hint).toBe("Test hint");
  });

  it("should set height to a minimum of 300", () => {
    element.setAttribute("data-height", "200");
    const settings = getSettings(element);
    expect(settings.height).toBe(300);
  });

  it("should calculate height based on sample code lines", () => {
    element.innerHTML = `
      <code data-type="sample-code">line1
      line2
      line3
      line4
      line5
      line6
      line7
      line8
      line9
      line10
      line11
      line12
      line13
      line14</code>
    `;
    const settings = getSettings(element);
    expect(settings.height).toBe(78 + 14 * 17);
  });

  it("should set noLazyLoad correctly (true)", () => {
    element.setAttribute("data-no-lazy-load", "true");
    const settings = getSettings(element);
    expect(settings.noLazyLoad).toBe(true);
  });
});
