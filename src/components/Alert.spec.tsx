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

  it("should prevent xss", async () => {
    const maliciousContent =
      '<img src="asd" onerror="window.dangerousFunction()" />' +
      '<script type="text/javascript">Hacky xss</script>';
    const component = shallow(
      <Alert type="danger" content={maliciousContent} />
    );
    const $ = component.render();
    const img = $.find("img");

    expect(img).toHaveLength(1);
    expect(img.attr("onerror")).toBeUndefined();
    expect($.find("script")).toHaveLength(0);
  });
});
