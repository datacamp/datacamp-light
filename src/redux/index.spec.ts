import reducer, * as index from "./index";

describe("Redux", () => {
  test("should define a State class", () => {
    expect(index.State).toBeDefined();
  });

  test("should have an initial state with all modules", () => {
    const state = new index.State();
    expect(state.get("autocomplete")).toBeDefined();
    expect(state.get("backendSession")).toBeDefined();
    expect(state.get("exercise")).toBeDefined();
    expect(state.get("output")).toBeDefined();
    expect(state.get("view")).toBeDefined();
  });

  test("should export a reducer", () => {
    expect(reducer).toBeDefined();
    expect(reducer).toBeInstanceOf(Function);
  });
});
