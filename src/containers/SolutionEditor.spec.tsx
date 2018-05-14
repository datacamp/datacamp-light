import * as React from "react";
import { shallow } from "enzyme";
import { createStore } from "redux";
import { Provider } from "react-redux";

import reducer, { State } from "../redux";

import SolutionEditor from "./SolutionEditor";

describe("SolutionEditor", () => {
  const store = createStore(reducer, new State());

  it("should exist", () => {
    expect(SolutionEditor).toBeDefined();
  });

  it("should match snapshot", () => {
    const tree = shallow(
      <Provider store={store}>
        <SolutionEditor />
      </Provider>
    );
    expect(tree).toMatchSnapshot();
  });
});
