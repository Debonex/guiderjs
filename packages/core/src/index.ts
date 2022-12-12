import { deepmerge } from "deepmerge-ts";
import { version } from "../package.json";
import PopoverManager from "./PopoverManager";
import { createStyles, createAnimations } from "./styles";
import TargetManager from "./TargetManager";
import {
  GuiderOption,
  PopoverPosition,
  Status,
  Step,
  TargetOption,
} from "./types";
import debounce from "./utils/debounce";
import { createDiv } from "./utils/dom";

const defaultOption: GuiderOption = {
  overlay: {
    color: "#333333",
    opacity: 0.5,
  },
  zIndex: 99999,
  popover: {
    element: null,
    position: "auto",
    gap: 8,
    left: "0px",
    top: "0px",
    animation: "flip-y",
    animationDuration: "400ms",
    animationTimingFunction: "ease",
  },
};

/**
 * Guider:
 * manage status, steps, boundary and container
 */
class Guider {
  /** guider boundary element, where to append guider container element, document.body as default*/
  boundary: Element;
  /** version of guiderjs */
  version: string;
  /** global guider option */
  option: GuiderOption;
  /** current status of guider */
  status: Status;
  /** steps of guider */
  steps: Step[];
  /** current step index */
  currentStepIdx: number;
  /** computed current step option */
  currentStep: Step;
  /** where to contain all guider elements */
  container: HTMLDivElement;
  /** target manager which manage overlay and control elements */
  private targetManager: TargetManager;
  /** popover manager */
  private popoverManager: PopoverManager;
  /** container resize observer */
  private resizeObserver: ResizeObserver;

  constructor(option: GuiderOption) {
    this.option = deepmerge(defaultOption, option);
    this.version = version;
    this.boundary = option.boundary ?? document.body;

    this.status = "stop";
    this.steps = option.steps ?? [];
    this.currentStepIdx = -1;
    this.currentStep = null;

    const styles = createStyles();
    const animations = createAnimations();

    this.container = createDiv(styles.container);
    this.targetManager = new TargetManager(styles, this.container);
    this.popoverManager = new PopoverManager(styles, this.targetManager);
    this.resizeObserver = new ResizeObserver(
      debounce(() => this.targetManager.start(this.currentStep))
    );

    this.container.append(animations, ...this.targetManager.getDoms());
    this.boundary.appendChild(this.container);
  }

  /**
   * start guider from the step has given key, if no step key given, start from the first step.
   * guider needs to be `show` or `stop` status
   * @param stepKey key of the step to start
   */
  start(stepKey?: string) {
    if (
      (this.status !== "show" && this.status !== "stop") ||
      !this.steps.length
    ) {
      return;
    }

    if (stepKey) {
      const idx = this.steps.findIndex((step) => step.key === stepKey);
      this.currentStepIdx = idx > -1 ? idx : 0;
    } else {
      this.currentStepIdx = 0;
    }

    if (this.status === "stop") {
      if (this.option.onStart) {
        this.option.onStart();
      }
      this.container.style.visibility = "visible";
      this.resizeObserver.observe(this.container);
      this._playStep(true);
    } else {
      this._playStep();
    }
  }

  /**
   * go to next step, if current step is the last step, exit
   */
  next() {
    if (this.status !== "show") {
      return;
    }
    if (this.currentStepIdx === this.steps.length - 1) {
      this.exit();
    } else {
      this.currentStepIdx++;
      this._playStep();
    }
  }

  /**
   * go back one step, if current step is the first step, do nothing.
   */
  back() {
    if (this.status !== "show" || this.currentStepIdx <= 0) {
      return;
    }
    this.currentStepIdx--;
    this._playStep();
  }

  /**
   * exit guider
   */
  async exit() {
    if (this.status !== "show") {
      return;
    }
    await this._exitCurrentStep();
    await this.targetManager.updateControl(0, 0, 0, 0);
    if (this.option.onExit) {
      this.option.onExit();
    }
    this.container.style.visibility = "hidden";
    this.currentStepIdx = -1;
    this.currentStep = null;
    this.resizeObserver.disconnect();
    this.status = "stop";
  }

  private async _playStep(fromStop = false) {
    this.status = "stepStarting";
    if (!fromStop) {
      await this._exitCurrentStep();
    }

    // compute full option of current step
    this.currentStep = deepmerge(this.option, this.steps[this.currentStepIdx]);

    if (this.currentStep.onStepStart) {
      this.currentStep.onStepStart(this.currentStep);
    }

    await this.targetManager.start(this.currentStep);
    await this.popoverManager.start(this.currentStep);
    this.status = "show";
  }

  /** exit current step and clear bound events of current step */
  private async _exitCurrentStep() {
    this.status = "stepExiting";
    if (this.currentStep.onStepExit) {
      this.currentStep.onStepExit(this.currentStep);
    }
    await this.popoverManager.exit(this.currentStep);
    this.targetManager.exit(this.currentStep);
  }
}

export type { GuiderOption, Status, Step, TargetOption, PopoverPosition };

export default Guider;
