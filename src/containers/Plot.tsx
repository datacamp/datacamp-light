import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import * as Plot from "@datacamp/ui-plot";

import { State } from "../redux";
import { selectPlots, selectPlotIndex, setPlotIndex } from "../redux/output";
import { selectExercise } from "../redux/exercise";
import { expandTab, setRenderSize } from "../redux/view";

import "@datacamp/ui-plot/lib/style.css";

const mapStateToProps: MapStateToProps<Partial<Plot.IPlotProps>, {}> = (
  state: State
) => ({
  sources: selectPlots(state),
  currentIndex: selectPlotIndex(state),
  exercise: selectExercise(state),
});

const mapDispatchToProps: MapDispatchToProps<Partial<Plot.IPlotProps>, {}> = (
  dispatch: any
) => ({
  setIndex: (index: number) => dispatch(setPlotIndex(index)),
  resizePlot: (currentIndex: any, language: any, width: any, height: any) =>
    dispatch(
      setRenderSize({
        width,
        height,
      })
    ),
  expand: src =>
    dispatch(expandTab({ category: "graphicalTabs", tabKey: "plot", src })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Plot as any);
