import * as index from "./index";

describe("index", () => {
  test("should export init function", () => {
    expect(index.init).toBeInstanceOf(Function);
  });
});
