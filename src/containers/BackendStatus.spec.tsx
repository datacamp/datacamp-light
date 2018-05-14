import * as React from "react";
import { shallow } from "enzyme";
import { createStore } from "redux";
import { Provider } from "react-redux";

import reducer, { State } from "../redux";

import BackendStatus from "./BackendStatus";

describe("BackendStatus", () => {
  const store = createStore(reducer, new State());

  it("should exist", () => {
    expect(BackendStatus).toBeDefined();
  });

  it("should match snapshot", () => {
    const tree = shallow(
      <Provider store={store}>
        <BackendStatus />
      </Provider>
    );
    expect(tree).toMatchSnapshot();
  });
});
