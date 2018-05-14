import * as React from "react";
import { shallow } from "enzyme";

import { AlertList } from "./AlertList";

describe("AlertList", () => {
  it("should exist", () => {
    expect(AlertList).toBeDefined();
  });

  it("should match snapshot", () => {
    const tree = shallow(<AlertList />);
    expect(tree).toMatchSnapshot();
  });
});
