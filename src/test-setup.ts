import * as Enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import * as JQuery from "jquery";

Enzyme.configure({
  adapter: new Adapter(),
});

(window as any).$ = JQuery;

const __IS_DEBUG__ = false;
