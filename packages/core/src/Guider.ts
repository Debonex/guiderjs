import PopoverManager from "./PopoverManager";
import TargetManager from "./TargetManager";
import { GuiderOption, IGuider, Status, Step } from "./types";
import debounce from "./utils/debounce";

class Guider<T> implements IGuider {
  private option: GuiderOption<T>;
  private popoverManager: PopoverManager<T>;
  private targetManager: TargetManager<T>;
  private status: Status;
  private currentStep: Step<T>;
  private currentStepIdx: number;
  private container: HTMLDivElement;
  private resizeObserver: ResizeObserver;
  private updateUI: (step: Step<T>) => void;

  constructor(
    popover: HTMLDivElement,
    control: HTMLDivElement,
    overlayTop: HTMLDivElement,
    overlayLeft: HTMLDivElement,
    container: HTMLDivElement,
    option: GuiderOption<T>,
    updateUI: (step: Step<T>) => void
  ) {
    this.container = container;
    this.popoverManager = new PopoverManager(
      popover,
      control,
      overlayTop,
      overlayLeft,
      container
    );
    this.targetManager = new TargetManager(
      container,
      overlayTop,
      overlayLeft,
      control
    );
    this.status = "stop";
    this.option = option;
    this.updateUI = updateUI;
    this.resizeObserver = new ResizeObserver(
      debounce(() => this.targetManager.start(this.currentStep))
    );
  }
  start(stepKey?: string) {
    if (
      (this.status !== "show" && this.status !== "stop") ||
      !this.option.steps.length
    ) {
      return;
    }

    if (stepKey) {
      const idx = this.option.steps.findIndex((step) => step.key === stepKey);
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
  next() {
    if (this.status !== "show") {
      return;
    }
    if (this.currentStepIdx === this.option.steps.length - 1) {
      this.exit();
    } else {
      this.currentStepIdx++;
      this._playStep();
    }
  }
  back() {
    if (this.status !== "show" || this.currentStepIdx <= 0) {
      return;
    }
    this.currentStepIdx--;
    this._playStep();
  }
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
  setOption(option: GuiderOption<T>) {
    this.option = option;
  }
  setUpdateUI(updateUI: (step: Step<T>) => void) {
    this.updateUI = updateUI;
  }
  release() {
    this.resizeObserver.disconnect();
  }

  private async _playStep(fromStop = false) {
    this.status = "stepStarting";
    if (!fromStop) {
      await this._exitCurrentStep();
    }

    // compute full option of current step
    this.currentStep = {
      ...this.option,
      ...this.option.steps[this.currentStepIdx],
    };

    if (this.currentStep.onStepStart) {
      this.currentStep.onStepStart(this.currentStep);
    }
    this.updateUI(this.currentStep);
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
  }
}

export default Guider;
