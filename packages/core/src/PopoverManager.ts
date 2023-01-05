import { Step } from "./types";
import animationEndPromise from "./utils/animationEndPromise";

/**
 * manage visibility and position of popover
 */
class PopoverManager<T> {
  private popover: HTMLDivElement;
  private control: HTMLDivElement;
  private overlayTop: HTMLDivElement;
  private overlayLeft: HTMLDivElement;
  private container: HTMLDivElement;

  constructor(
    popover: HTMLDivElement,
    control: HTMLDivElement,
    overlayTop: HTMLDivElement,
    overlayLeft: HTMLDivElement,
    container: HTMLDivElement
  ) {
    this.popover = popover;
    this.control = control;
    this.overlayTop = overlayTop;
    this.overlayLeft = overlayLeft;
    this.container = container;
  }

  async start(step: Step<T>) {
    // if no popover, hide popover container
    if (!step.popover) {
      this.popover.style.display = "none";
      return;
    }

    // set popover display before getComputedStyle
    // `window.getComputedStyle` will return `computed value`, when display is `none`
    this.popover.style.display = "initial";

    // update popover position
    if (step.target) {
      if (step.popoverPosition === "auto") {
        const overlayTopHeight = this._extract(this.overlayTop.style.height);
        const overlayLeftWidth = this._extract(this.overlayLeft.style.width);
        const popoverStyle = getComputedStyle(this.popover);
        const popoverHeight = this._extract(popoverStyle.height);
        const popoverWidth = this._extract(popoverStyle.width);
        const containerRect = this.container.getBoundingClientRect();
        // try top
        if (overlayTopHeight >= popoverHeight + step.popoverGap) {
          this._setControlTop(step);
        }
        // try right
        else if (
          containerRect.width -
            overlayLeftWidth -
            this._extract(this.control.style.width) -
            step.popoverGap >=
          popoverWidth
        ) {
          this._setControlRight(step);
        }
        // try bottom
        else if (
          containerRect.height -
            overlayTopHeight -
            this._extract(this.control.style.height) -
            step.popoverGap >=
          popoverHeight
        ) {
          this._setControlBottom(step);
        }
        // try left
        else if (overlayLeftWidth + step.popoverGap >= popoverWidth) {
          this._setControlLeft(step);
        }
        // default
        else {
          this.popover.style.top = step.popoverTop;
          this.popover.style.left = step.popoverLeft;
        }
      } else {
        switch (step.popoverPosition) {
          case "target-top":
            this._setControlTop(step);
            break;
          case "target-bottom":
            this._setControlBottom(step);
            break;
          case "target-left":
            this._setControlLeft(step);
            break;
          case "target-right":
            this._setControlRight(step);
            break;
          default:
            console.warn(`Unknown popover position ${step.popoverPosition}`);
            break;
        }
      }
    } else {
      switch (step.popoverPosition) {
        case "center":
          const popoverStyle = getComputedStyle(this.popover);
          const popoverHeight = this._extract(popoverStyle.height);
          const popoverWidth = this._extract(popoverStyle.width);
          const containerRect = this.container.getBoundingClientRect();
          this.popover.style.top = `${
            containerRect.height / 2 - popoverHeight / 2
          }px`;
          this.popover.style.left = `${
            containerRect.width / 2 - popoverWidth / 2
          }px`;
          break;
        default:
          this.popover.style.top = step.popoverTop;
          this.popover.style.left = step.popoverLeft;
          break;
      }
    }

    // show popover
    this.popover.style.animation = `guiderjs-${step.popoverAnimation} ${step.popoverAnimationDuration} ${step.popoverAnimationFunction} forwards`;
    await animationEndPromise(this.popover);
  }

  /**
   * exit popover of given step
   * @param step
   */
  async exit(step: Step<T>) {
    if (!step.popover) {
      return;
    }
    this.popover.style.animation = `guiderjs-${step.popoverAnimation}-out ${step.popoverAnimationDuration} ${step.popoverAnimationFunction} forwards`;
    await animationEndPromise(this.popover);
  }

  /** set popover to top of control */
  private _setControlTop(step: Step<T>) {
    const height = getComputedStyle(this.popover).height;
    this.popover.style.top = `calc(${step.popoverTop} - ${height} - ${step.popoverGap}px)`;
    this.popover.style.left = step.popoverLeft;
  }

  /** set popover to bottom of control */
  private _setControlBottom(step: Step<T>) {
    this.popover.style.top = `calc(${step.popoverTop} + ${this.control.style.height} + ${step.popoverGap}px)`;
    this.popover.style.left = step.popoverLeft;
  }

  /** set popover to left of control */
  private _setControlLeft(step: Step<T>) {
    const width = getComputedStyle(this.popover).width;
    this.popover.style.top = step.popoverTop;
    this.popover.style.left = `calc(${step.popoverLeft} - ${width} - ${step.popoverGap}px)`;
  }

  /** set popover to right of control */
  private _setControlRight(step: Step<T>) {
    this.popover.style.top = step.popoverTop;
    this.popover.style.left = `calc(${step.popoverLeft} + ${this.control.style.width} + ${step.popoverGap}px)`;
  }

  private _extract(pxStr: string) {
    return Number(pxStr.slice(0, -2));
  }
}

export default PopoverManager;
