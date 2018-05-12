import * as React from "react";
import { Provider } from "react-redux";
import { Store } from "redux";

import { State } from "../redux";

type HOC<P> = React.ComponentClass<P> | React.SFC<P>;

export function wrap<P>(MyComponent: HOC<P>, store: Store<State>) {
  class Wrapped extends React.Component<P> {
    public render() {
      return (
        <Provider store={store}>
          <MyComponent {...this.props} {...this.state} />
        </Provider>
      );
    }
  }

  return Wrapped;
}

export default wrap;
