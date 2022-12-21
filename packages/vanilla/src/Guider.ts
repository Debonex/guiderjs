import CoreGuider from "@core/Guider";
import { animationCss, createStyles } from "@core/styles";
import { defaultOption, GuiderOption, IGuider, Step } from "@core/types";
import createDiv from "./utils/createDiv";

export type Option = GuiderOption & {
  boundary?: string;
};

export type { Step };

class Guider implements IGuider {
  private guider: CoreGuider<Element>;
  private container: HTMLDivElement;
  private overlayLeft: HTMLDivElement;
  private overlayTop: HTMLDivElement;
  private overlayRight: HTMLDivElement;
  private overlayBottom: HTMLDivElement;
  private control: HTMLDivElement;
  private popover: HTMLDivElement;
  private boundary: Element;

  constructor(option: Option) {
    const styles = createStyles();
    this.overlayLeft = createDiv(styles.overlayLeft);
    this.overlayTop = createDiv(styles.overlayTop);
    this.popover = createDiv(styles.popover);
    this.control = createDiv(styles.control, [this.popover]);
    this.overlayRight = createDiv(styles.overlayRight);
    this.overlayBottom = createDiv(styles.overlayBottom);
    this.boundary = document.querySelector(option.boundary) ?? document.body;
    const animations = document.createElement("style");
    animations.innerHTML = animationCss;
    const middle = createDiv(styles.middle, [
      this.overlayLeft,
      this.control,
      this.overlayRight,
    ]);
    this.container = createDiv(styles.container, [
      animations,
      this.overlayTop,
      middle,
      this.overlayBottom,
    ]);

    this.guider = new CoreGuider(
      this.popover,
      this.control,
      this.overlayTop,
      this.overlayLeft,
      this.container,
      { ...defaultOption, ...option },
      (step) => this.updateUI(step)
    );

    this.boundary.appendChild(this.container);
  }

  start(stepKey?: string) {
    this.guider.start(stepKey);
  }
  next() {
    this.guider.next();
  }
  back() {
    this.guider.back();
  }
  async exit() {
    this.guider.exit();
  }
  unmount() {
    this.guider.release();
    this.boundary.removeChild(this.container);
  }

  private updateUI(step: Step) {
    this.container.style.zIndex = String(step.zIndex);
    for (const overlay of [
      this.overlayTop,
      this.overlayLeft,
      this.overlayRight,
      this.overlayBottom,
    ]) {
      if (step.onOverlayClick) {
        overlay.onclick = () => step.onOverlayClick();
        overlay.style.cursor = "pointer";
      } else {
        overlay.onclick = null;
        overlay.style.cursor = "initial";
      }
      overlay.style.backgroundColor = step.overlayColor;
      overlay.style.opacity = String(step.overlayOpacity);
    }
    if (step.target && step.onTargetClick) {
      this.control.style.cursor = "pointer";
      this.control.style.pointerEvents = "all";
      this.control.onclick = () => step.onTargetClick();
    } else {
      this.control.style.cursor = "initial";
      this.control.style.pointerEvents = "none";
      this.control.onclick = null;
    }

    // update popover
    this.popover.innerHTML = "";
    if (!step.popover) {
      this.popover.style.display = "none";
    } else {
      this.popover.style.display = "initial";
      this.popover.appendChild(step.popover);
    }
  }
}

export default Guider;
