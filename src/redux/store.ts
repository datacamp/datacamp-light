import { Map as hashMap } from "immutable";
import { compose, createStore, GenericStoreEnhancer } from "redux";
import reducer, { State } from "./";

export default (storeEnhancer: GenericStoreEnhancer) => {
  const store = createStore<State>(reducer, new State(), storeEnhancer);

  if (module.hot) {
    // Enable webpack hot module replacement for reducers
    module.hot.accept("./", () => store.replaceReducer(reducer));
  }

  return store;
};
