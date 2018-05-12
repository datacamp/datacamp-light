import * as React from "react";
import { shallow } from "enzyme";

describe("Enzyme", () => {
  it("should render an empty div", () => {
    const wrapper = shallow(<div />);
    expect(wrapper.find("div").length).toBe(1);
  });

  it("should create and match snapshot", () => {
    const wrapper = shallow(<div />);
    expect(wrapper).toMatchSnapshot();
  });
});
