import * as React from "react";
import { shallow } from "enzyme";
import { createStore } from "redux";
import { Provider } from "react-redux";

import reducer, { State } from "../redux";

import Plot from "./Plot";

describe("Plot", () => {
  const store = createStore(reducer, new State());

  it("should exist", () => {
    expect(Plot).toBeDefined();
  });

  it("should match snapshot", () => {
    const tree = shallow(
      <Provider store={store}>
        <Plot />
      </Provider>
    );
    expect(tree).toMatchSnapshot();
  });
});
