import * as React from "react";
import { shallow } from "enzyme";
import { createStore } from "redux";
import { Provider } from "react-redux";

import reducer, { State } from "../redux";

import Footer from "./Footer";

describe("Footer", () => {
  const store = createStore(reducer, new State());

  it("should exist", () => {
    expect(Footer).toBeDefined();
  });

  it("should match snapshot", () => {
    const tree = shallow(
      <Provider store={store}>
        <Footer />
      </Provider>
    );
    expect(tree).toMatchSnapshot();
  });
});
