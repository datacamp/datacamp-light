import * as React from "react";
import { shallow } from "enzyme";
import { createStore } from "redux";
import { Provider } from "react-redux";

import reducer, { State } from "../redux";

import App from "./App";

describe("App", () => {
  const store = createStore(reducer, new State());

  it("should exist", () => {
    expect(App).toBeDefined();
  });

  it("should match snapshot", () => {
    const tree = shallow(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(tree).toMatchSnapshot();
  });
});
