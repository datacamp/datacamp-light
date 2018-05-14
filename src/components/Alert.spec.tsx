import * as React from "react";
import { shallow } from "enzyme";

import { Alert } from "./Alert";

describe("Alert", () => {
  it("should exist", () => {
    expect(Alert).toBeDefined();
  });

  it("should match snapshot", () => {
    const tree = shallow(<Alert />);
    expect(tree).toMatchSnapshot();
  });
});
