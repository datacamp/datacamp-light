import * as GoldenLayout from "golden-layout";
import * as React from "react";
import { Provider } from "react-redux";
import { Store } from "redux";

import Console from "../../containers/Console";
import Editor from "../../containers/Editor";
import SolutionEditor from "../../containers/SolutionEditor";
import FeedbackMessage from "../../containers/FeedbackMessage";
import Footer from "../../containers/Footer";
import Plot from "../../containers/Plot";
import Terminal from "../../containers/Terminal";

import { wrap } from "../../helpers/wrap";
import { State } from "../../redux";
import { viewsStart, setRenderSize, setActiveEditor } from "../../redux/view";
import noop from "../../helpers/noop";

import * as styles from "./index.module.scss";
import * as GithubIcon from "../../images/github-icon.svg";

const NORMAL_EXERCISE_CONTENT = (props: IAppProps) => ({
  content: [
    {
      type: "stack",
      id: "left-pane",
      content: [
        {
          component: "Editor",
          id: "editor",
          isClosable: false,
          props: {
            className: styles.editor,
            language: props.language,
            id: 2,
          },
          title: "script." + (props.language === "python" ? "py" : "R"),
          type: "react-component",
        },
      ],
    },
    {
      type: "stack",
      id: "right-pane",
      content: [
        {
          component: "Console",
          id: "console",
          isClosable: false,
          props: {
            className: styles.console,
            language: props.language,
          },
          title: props.language === "python" ? "IPython Shell" : "R Console",
          type: "react-component",
        },
      ],
    },
  ],
  type: "row",
});

const SHELL_EXERCISE_CONTENT = (props: IAppProps) => ({
  content: [
    {
      component: "Terminal",
      id: "terminal",
      isClosable: false,
      title: "Terminal",
      type: "react-component",
    },
  ],
  type: "stack",
});

export interface IAppProps extends React.Props<App> {
  type?: string;
  pec?: string;
  sample?: string;
  solution?: string;
  sct?: string;
  hint?: string;
  language?: string;
  height?: number;
  nPlots?: number;
  utmSource?: string;
  utmCampaign?: string;
  impactTrackingLink?: string;
}

interface IAppState {
  solutionButtonVisible: boolean;
}

export class App extends React.Component<IAppProps, IAppState> {
  public static defaultProps: Partial<IAppProps> = {
    height: 350,
    hint: "",
    language: "r",
    pec: "",
    sample: "",
    sct: "",
    solution: "",
    type: "",
  };

  protected store: any;

  private layout: GoldenLayout;
  private root?: HTMLElement;
  private onClickApp: React.EventHandler<
    React.MouseEvent<HTMLDivElement>
  > = event => this.store.dispatch(viewsStart());

  private SOLUTION_CODE_CONFIG = {
    type: "react-component",
    component: "SolutionEditor",
    title: "solution",
    id: "solution",
    isClosable: false,
    props: {},
  };

  private PLOT_CONFIG = {
    component: "Plot",
    id: "plot",
    isClosable: false,
    title: "Plots",
    type: "react-component",
    props: {},
  };

  constructor() {
    super();
    this.showSolutionTab = this.showSolutionTab.bind(this);
    this.updateActiveElement = this.updateActiveElement.bind(this);
    window.addEventListener("focus", this.updateActiveElement, true);
    this.state = {
      solutionButtonVisible: true,
    };
  }

  showSolutionTab() {
    const panes = this.layout.root.getItemsByType("stack");
    const pane = panes[0];
    pane.addChild(this.SOLUTION_CODE_CONFIG);
    this.setState({
      solutionButtonVisible: false,
    });
  }

  public componentWillReceiveProps(nextProps: IAppProps) {
    // FIXME This is quite an ugly hack
    requestAnimationFrame(() => {
      const plotItems = this.layout.root.getItemsById(this.PLOT_CONFIG.id);
      if (plotItems) {
        const plotItem = plotItems.length > 0 ? plotItems[0] : undefined;

        if (nextProps.nPlots > 0 && !plotItem) {
          const panes = this.layout.root.getItemsByType("stack");
          const pane = panes[panes.length - 1];
          pane.addChild(this.PLOT_CONFIG);
        }
      }
    });
  }

  public componentDidMount() {
    this.SOLUTION_CODE_CONFIG.title =
      "solution." + (this.props.language === "python" ? "py" : "R");
    this.SOLUTION_CODE_CONFIG.props = {
      className: styles.editor,
      language: this.props.language,
      id: 9001,
    };

    this.layout = new GoldenLayout(
      {
        content: [
          this.props.language === "shell"
            ? SHELL_EXERCISE_CONTENT(this.props)
            : NORMAL_EXERCISE_CONTENT(this.props),
        ],
        dimensions: {
          headerHeight: 30,
          minItemHeight: 30,
          minItemWidth: 300,
        },
        settings: {
          showCloseIcon: false,
          showPopoutIcon: false,
          responsiveMode: "always",
        },
      } as any, // settings.responsiveMode is not in the typedef
      this.root
    );

    this.layout.registerComponent("Console", wrap(Console, this.store));
    this.layout.registerComponent("Editor", wrap(Editor, this.store));
    this.layout.registerComponent(
      "SolutionEditor",
      wrap(SolutionEditor, this.store)
    );
    this.layout.registerComponent("Plot", wrap(Plot, this.store));
    this.layout.registerComponent("Terminal", wrap(Terminal, this.store));

    requestAnimationFrame(() => {
      window.addEventListener("resize", () => this.layout.updateSize());
      this.layout.on("initialised", () => {
        window.dispatchEvent(new Event("resize"));

        const editorItem = this.layout.root.getItemsById("editor")[0] as any;
        if (editorItem) {
          editorItem.parent.setActiveContentItem(editorItem);
        }
      });

      this.layout.on("stateChanged", () => {
        const stacks = this.layout.root.getItemsByType("stack");
        for (const stack of stacks) {
          // Bind active component tracker
          try {
            stack.off("activeContentItemChanged");
          } catch (_) {}
          stack.on(
            "activeContentItemChanged",
            (component: GoldenLayout.ContentItem) => {
              const id = component.config.id as string;
              if (id === "editor" || id === "solution") {
                this.store.dispatch(setActiveEditor(id));
              }
            }
          );
        }
      });

      this.layout.init();

      const consoleItem = this.layout.root.getItemsById("console")[0] as any;
      if (consoleItem) {
        consoleItem.on("resize", () => {
          this.store.dispatch(
            setRenderSize({
              width: consoleItem.container.width,
              height: consoleItem.container.height - 48,
            })
          );

          if ((this.layout as any)._updatingColumnsResponsive) {
            const editorItem = this.layout.root.getItemsById(
              "editor"
            )[0] as any;
            editorItem.parent.setActiveContentItem(editorItem);
          }
        });
      }
    });
  }

  updateActiveElement() {
    let el: Node = document.activeElement;

    if (
      !el ||
      !this.layout ||
      !this.layout.root ||
      this.layout.root.getItemsById("editor").length <= 0
    ) {
      return;
    }

    const editorElement = (this.layout.root.getItemsById("editor")[0]
      .element as any).get(0) as Node;

    let solutionElement = null;
    const solutionItem = this.layout.root.getItemsById("solution")[0];
    if (solutionItem) {
      solutionElement = (solutionItem.element as any).get(0) as Node;
    }

    while (
      el !== editorElement &&
      el !== solutionElement &&
      el !== document.body
    ) {
      el = el.parentNode;
    }

    if (el === editorElement) {
      this.store.dispatch(setActiveEditor("editor"));
    } else if (el === solutionElement) {
      this.store.dispatch(setActiveEditor("solution"));
    }
  }

  public render() {
    return (
      <Provider store={this.store}>
        <div
          className={styles.app}
          style={{ height: this.props.height + "px" }}
          onClick={this.onClickApp}
        >
          <a
            title="View DataCamp Light on GitHub"
            target="_blank"
            className={`${styles.githubLink}`}
            href="https://github.com/datacamp/datacamp-light"
          >
            <GithubIcon />
          </a>
          <div className={styles.exercise}>
            <div
              ref={r => (this.root = r || undefined)}
              style={{ height: this.props.height - 48 + "px" }}
              className={styles.editor}
            />
            <FeedbackMessage className={styles.feedback} />
          </div>
          <Footer
            onShowSolution={this.showSolutionTab}
            showSolutionButton={this.state.solutionButtonVisible}
            utmSource={this.props.utmSource}
            utmCampaign={this.props.utmCampaign}
            impactTrackingLink={this.props.impactTrackingLink}
          />
        </div>
      </Provider>
    );
  }
}

// tslint:disable-next-line:max-classes-per-file
export default (store: Store<State>) =>
  class AppInstance extends App {
    constructor() {
      super();
      this.store = store;
    }
  };
