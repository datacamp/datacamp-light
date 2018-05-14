import * as React from "react";
import { shallow } from "enzyme";

import { RestartSessionButton } from "./RestartSessionButton";

describe("RestartSessionButton", () => {
  it("should exist", () => {
    expect(RestartSessionButton).toBeDefined();
  });

  it("should match snapshot", () => {
    const tree = shallow(<RestartSessionButton />);
    expect(tree).toMatchSnapshot();
  });
});
