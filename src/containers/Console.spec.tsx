import * as React from "react";
import { shallow } from "enzyme";
import { createStore } from "redux";
import { Provider } from "react-redux";

import reducer, { State } from "../redux";

import Console from "./Console";

describe("Console", () => {
  const store = createStore(reducer, new State());

  it("should exist", () => {
    expect(Console).toBeDefined();
  });

  it("should match snapshot", () => {
    const tree = shallow(
      <Provider store={store}>
        <Console />
      </Provider>
    );
    expect(tree).toMatchSnapshot();
  });
});
