import * as React from "react";
import { shallow } from "enzyme";
import { createStore } from "redux";
import { Provider } from "react-redux";

import reducer, { State } from "../redux";

import Editor from "./Editor";

describe("Editor", () => {
  const store = createStore(reducer, new State());

  it("should exist", () => {
    expect(Editor).toBeDefined();
  });

  it("should match snapshot", () => {
    const tree = shallow(
      <Provider store={store}>
        <Editor />
      </Provider>
    );
    expect(tree).toMatchSnapshot();
  });
});
