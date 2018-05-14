import * as React from "react";
import { shallow } from "enzyme";
import { createStore } from "redux";
import { Provider } from "react-redux";

import reducer, { State } from "../redux";

import GlobalAlerts from "./GlobalAlerts";

describe("GlobalAlerts", () => {
  const store = createStore(reducer, new State());

  it("should exist", () => {
    expect(GlobalAlerts).toBeDefined();
  });

  it("should match snapshot", () => {
    const tree = shallow(
      <Provider store={store}>
        <GlobalAlerts />
      </Provider>
    );
    expect(tree).toMatchSnapshot();
  });
});
