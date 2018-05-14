import * as React from "react";
import { shallow } from "enzyme";
import { createStore } from "redux";

import reducer, { State } from "../../redux";

import createApp from "./";

describe("App", () => {
  const store = createStore(reducer, new State());
  const App = createApp(store);

  it("should exist", () => {
    expect(App).toBeDefined();
  });

  it("should match snapshot", () => {
    const tree = shallow(<App />);
    expect(tree).toMatchSnapshot();
  });
});
