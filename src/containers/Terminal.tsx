import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import Terminal, { ITerminalProps } from "../components/Terminal";

import { State } from "../redux";
import { selectPlots, selectPlotIndex, setPlotIndex } from "../redux/output";
import { selectBackendSessionIsBroken } from "../redux/backend-session";
import { selectExercise, selectShellProxy } from "../redux/exercise";
import { expandTab, setRenderSize } from "../redux/view";

import "@datacamp/ui-plot/lib/style.css";

const mapStateToProps: MapStateToProps<Partial<ITerminalProps>, {}> = (
  state: State
) => ({
  socketUrl: selectShellProxy(state),
  isSessionBroken: selectBackendSessionIsBroken(state),
});

const mapDispatchToProps: MapDispatchToProps<Partial<ITerminalProps>, {}> = (
  dispatch: any
) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Terminal);
