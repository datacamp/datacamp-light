import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { Store } from "redux";

import { State } from "../redux";
import { selectPlots } from "../redux/output";

import { App, IAppProps } from "../components/App";

const mapStateToProps: MapStateToProps<Partial<IAppProps>, {}> = (
  state: State
) => ({
  nPlots: selectPlots(state).length,
});

const createAppInstance = (store: Store<State>) =>
  class AppInstance extends App {
    constructor() {
      super();
      this.store = store;
    }
  };

export default (store: Store<any>) =>
  connect<Partial<IAppProps>, {}, IAppProps>(mapStateToProps)(
    createAppInstance(store)
  );
