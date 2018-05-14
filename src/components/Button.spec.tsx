import * as React from "react";
import { shallow } from "enzyme";

import { Button } from "./Button";

describe("Button", () => {
  it("should exist", () => {
    expect(Button).toBeDefined();
  });

  it("should match snapshot", () => {
    const tree = shallow(<Button />);
    expect(tree).toMatchSnapshot();
  });
});
