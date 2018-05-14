import * as React from "react";
import { shallow } from "enzyme";
import { createStore } from "redux";
import { Provider } from "react-redux";

import reducer, { State } from "../redux";

import RestartSessionButton from "./RestartSessionButton";

describe("RestartSessionButton", () => {
  const store = createStore(reducer, new State());

  it("should exist", () => {
    expect(RestartSessionButton).toBeDefined();
  });

  it("should match snapshot", () => {
    const tree = shallow(
      <Provider store={store}>
        <RestartSessionButton />
      </Provider>
    );
    expect(tree).toMatchSnapshot();
  });
});
