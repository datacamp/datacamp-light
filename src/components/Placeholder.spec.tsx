import * as React from "react";
import { shallow } from "enzyme";

import { Placeholder } from "./Placeholder";

describe("Placeholder", () => {
  it("should exist", () => {
    expect(Placeholder).toBeDefined();
  });

  it("should match snapshot", () => {
    const tree = shallow(<Placeholder />);
    expect(tree).toMatchSnapshot();
  });
});
