import * as React from "react";
import { shallow } from "enzyme";
import { createStore } from "redux";
import { Provider } from "react-redux";

import reducer, { State } from "../redux";

import FeedbackMessage from "./FeedbackMessage";

describe("FeedbackMessage", () => {
  const store = createStore(reducer, new State());

  it("should exist", () => {
    expect(FeedbackMessage).toBeDefined();
  });

  it("should match snapshot", () => {
    const tree = shallow(
      <Provider store={store}>
        <FeedbackMessage />
      </Provider>
    );
    expect(tree).toMatchSnapshot();
  });
});
