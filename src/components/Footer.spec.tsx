import * as React from "react";
import { shallow } from "enzyme";

import { Footer } from "../../src/components/Footer";

describe("Footer", () => {
  it("should exist", () => {
    expect(Footer).toBeDefined();
  });

  it("should match snapshot", () => {
    const tree = shallow(<Footer />);
    expect(tree).toMatchSnapshot();
  });
});
