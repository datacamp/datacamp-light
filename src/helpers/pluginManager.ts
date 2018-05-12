import Multiplexer, {
  PLUGIN_NAME as MUX_NAME,
} from "@datacamp/multiplexer-client";
import PluginManager from "@datacamp/plugin-manager";

// create a singleton to handle all the plugins
const pm = new PluginManager();

export const getMux = (muxName: string) => {
  if (!muxName) {
    throw new TypeError(`Expected muxName to be non-falsy, got "${muxName}"`);
  }

  return pm.get(MUX_NAME + muxName) as Multiplexer.AsyncSession;
};

export default pm;
