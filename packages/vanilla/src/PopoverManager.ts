import { Styles } from "./styles";
import TargetManager from "./TargetManager";
import { Step } from "./types";
import { createDiv } from "./utils/dom";

/**
 * PopoverManager:
 * manage popover
 */
class PopoverManager {
  /** popover element */
  private popover: HTMLDivElement;
  /** target manager */
  private targetManager: TargetManager;

  constructor(styles: Styles, targetManager: TargetManager) {
    this.popover = createDiv(styles.popover);
    this.targetManager = targetManager;
    this.targetManager.control.append(this.popover);
  }

  /**
   * update popover according to given step
   * @param step
   */
  async start(step: Step) {
    // if no popover, hide popover container
    if (!step.popover || !step.popover.element) {
      this.popover.style.display = "none";
      return;
    }

    // update popover content
    this.popover.innerHTML = "";
    this.popover.append(step.popover.element);

    // update popover position after content updated, because size of popover will be influenced by content
    if (step.target) {
      if (step.popover.position === "auto") {
        const overlayTopHeight = this._extract(
          this.targetManager.overlayTop.style.height
        );
        const overlayLeftWidth = this._extract(
          this.targetManager.overlayLeft.style.width
        );
        const popoverStyle = getComputedStyle(this.popover);
        const popoverHeight = this._extract(popoverStyle.height);
        const popoverWidth = this._extract(popoverStyle.width);
        const containerRect =
          this.targetManager.container.getBoundingClientRect();
        // try top
        if (overlayTopHeight >= popoverHeight + step.popover.gap) {
          this._setControlTop(step);
        }
        // try right
        else if (
          containerRect.width -
            overlayLeftWidth -
            this._extract(this.targetManager.control.style.width) -
            step.popover.gap >=
          popoverWidth
        ) {
          this._setControlRight(step);
        }
        // try bottom
        else if (
          containerRect.height -
            overlayTopHeight -
            this._extract(this.targetManager.control.style.height) -
            step.popover.gap >=
          popoverHeight
        ) {
          this._setControlBottom(step);
        }
        // try left
        else if (overlayLeftWidth + step.popover.gap >= popoverWidth) {
          this._setControlLeft(step);
        }
        // default
        else {
          this.popover.style.top = step.popover.top;
          this.popover.style.left = step.popover.left;
        }
      } else {
        switch (step.popover.position) {
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
            console.warn(`Unknown popover position ${step.popover.position}`);
            break;
        }
      }
    } else {
      switch (step.popover.position) {
        case "center":
          const popoverStyle = getComputedStyle(this.popover);
          const popoverHeight = this._extract(popoverStyle.height);
          const popoverWidth = this._extract(popoverStyle.width);
          const containerRect =
            this.targetManager.container.getBoundingClientRect();
          this.popover.style.top = `${
            containerRect.height / 2 - popoverHeight / 2
          }px`;
          this.popover.style.left = `${
            containerRect.width / 2 - popoverWidth / 2
          }px`;
          break;
        default:
          this.popover.style.top = step.popover.top;
          this.popover.style.left = step.popover.left;
          break;
      }
    }
    this.popover.style.display = "initial";

    // show popover
    this.popover.style.animation = `guiderjs-${step.popover.animation} ${step.popover.animationDuration} ${step.popover.animationTimingFunction} forwards`;
    await this._animationEndPromise(this.popover);
  }

  /**
   * exit popover of given step
   * @param step
   */
  async exit(step: Step) {
    if (!step.popover || !step.popover.element) {
      return;
    }
    this.popover.style.animation = `guiderjs-${step.popover.animation}-out ${step.popover.animationDuration} ${step.popover.animationTimingFunction} forwards`;
    await this._animationEndPromise(this.popover);
  }

  /** set popover to top of control */
  private _setControlTop(step: Step) {
    const height = getComputedStyle(this.popover).height;
    this.popover.style.top = `calc(${step.popover.top} - ${height} - ${step.popover.gap}px)`;
    this.popover.style.left = step.popover.left;
  }

  /** set popover to bottom of control */
  private _setControlBottom(step: Step) {
    this.popover.style.top = `calc(${step.popover.top} + ${this.targetManager.control.style.height} + ${step.popover.gap}px)`;
    this.popover.style.left = step.popover.left;
  }

  /** set popover to left of control */
  private _setControlLeft(step: Step) {
    const width = getComputedStyle(this.popover).width;
    this.popover.style.top = step.popover.top;
    this.popover.style.left = `calc(${step.popover.left} - ${width} - ${step.popover.gap}px)`;
  }

  /** set popover to right of control */
  private _setControlRight(step: Step) {
    this.popover.style.top = step.popover.top;
    this.popover.style.left = `calc(${step.popover.left} + ${this.targetManager.control.style.width} + ${step.popover.gap}px)`;
  }

  /**
   * create a promise to wait until animation end of given dom
   * @param dom
   */
  private _animationEndPromise(dom: Element): Promise<void> {
    return new Promise((resolve) => {
      const onAnimationEnd = () => {
        dom.removeEventListener("animationend", onAnimationEnd);
        resolve();
      };
      dom.addEventListener("animationend", onAnimationEnd);
    });
  }

  /**
   * extract x of `${x}px`
   * @param pxStr
   * @returns
   */
  private _extract(pxStr: string) {
    return Number(pxStr.slice(0, -2));
  }
}

export default PopoverManager;
