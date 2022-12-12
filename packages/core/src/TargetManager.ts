import { Styles } from "./styles";
import { Step } from "./types";
import { createDiv, offsetDoms } from "./utils/dom";

/**
 * TargetManager:
 * manage overlay and control
 */
class TargetManager {
  private styles: Styles;
  /** where to contain all guider elements */
  container: HTMLDivElement;
  /** container of overlayLeft control and overlayRight */
  private middle: HTMLDivElement;
  /** top part of overlay elements */
  overlayTop: HTMLDivElement;
  /** left part of overlay elements */
  overlayLeft: HTMLDivElement;
  /** bottom part of overlay elements */
  private overlayBottom: HTMLDivElement;
  /** right part of overlay elements */
  private overlayRight: HTMLDivElement;
  /** control element */
  control: HTMLDivElement;
  /** target dom element */
  private target: Element;

  constructor(styles: Styles, container: HTMLDivElement) {
    this.styles = styles;
    this.container = container;
    this.overlayTop = createDiv(this.styles.overlayTop);
    this.overlayLeft = createDiv(this.styles.overlayLeft);
    this.control = createDiv(this.styles.control);
    this.overlayBottom = createDiv(this.styles.overlayBottom);
    this.overlayRight = createDiv(this.styles.overlayRight);
    this.middle = createDiv(this.styles.middle, [
      this.overlayLeft,
      this.control,
      this.overlayRight,
    ]);
  }

  /**
   * get overlay and control doms
   * @returns overlay and control doms
   */
  getDoms() {
    return [this.overlayTop, this.middle, this.overlayBottom];
  }

  /**
   * update control according to given step
   * @param step full step option
   */
  async start(step: Step) {
    this.container.style.zIndex = String(step.zIndex);
    // update overlay styles
    this._getOverlays().forEach((overlay) => {
      if (step.overlay.onClick) {
        overlay.style.cursor = "pointer";
        overlay.addEventListener("click", step.overlay.onClick);
      }
      overlay.style.backgroundColor = step.overlay.color;
      overlay.style.opacity = String(step.overlay.opacity);
    });

    if (!step.target) {
      await this.updateControl(0, 0, 0, 0);
    } else {
      if (typeof step.target === "string") {
        this.target = await this._findTarget(step.target);
      } else {
        this.target = await this._findTarget(step.target.selector);
        if (step.target.onClick) {
          this.control.style.cursor = "pointer";
          this.control.style.pointerEvents = "all";
          this.control.addEventListener("click", step.target.onClick);
        }
      }

      const offset = offsetDoms(this.target, this.container);
      // fixed to 2 digits, prevent deviation
      offset.top = Number(offset.top.toFixed(2));
      offset.left = Number(offset.left.toFixed(2));
      const targetRect = this.target.getBoundingClientRect();
      await this.updateControl(
        targetRect.height,
        targetRect.width,
        offset.top,
        offset.left
      );
    }
  }

  /**
   * update control according to given rect
   * @param height height of control
   * @param width width of control
   * @param top top offset to container of control
   * @param left left offset to container of control
   */
  async updateControl(
    height: number,
    width: number,
    top: number,
    left: number
  ) {
    const promises: Promise<void>[] = [];

    if (
      this.control.style.height !== `${height}px` ||
      this.control.style.width !== `${width}px`
    ) {
      promises.push(this._transitionEndPromise(this.control));
      this.control.style.height = `${height}px`;
      this.control.style.width = `${width}px`;
    }

    if (this.overlayTop.style.height !== `${top}px`) {
      promises.push(this._transitionEndPromise(this.overlayTop));
      this.overlayTop.style.height = `${top}px`;
    }

    if (this.overlayLeft.style.width !== `${left}px`) {
      promises.push(this._transitionEndPromise(this.overlayLeft));
      this.overlayLeft.style.width = `${left}px`;
    }

    // if any element need to update, wait until transitions end
    await Promise.all(promises);
  }

  /** try to exit given step, clear bound events of given step */
  exit(step: Step) {
    this.control.style.pointerEvents = "none";
    this.control.style.cursor = "initial";
    if (typeof step.target !== "string" && step.target.onClick) {
      this.control.removeEventListener("click", step.target.onClick);
    }

    const overlays = this._getOverlays();
    overlays.forEach((overlay) => (overlay.style.cursor = "initial"));
    if (step.overlay.onClick) {
      overlays.forEach((overlay) =>
        overlay.removeEventListener("click", step.overlay.onClick)
      );
    }
  }

  /**
   * find exact target dom
   * @param selector css selector
   */
  private async _findTarget(selector: string): Promise<Element> {
    return new Promise((resolve) => {
      const target = document.querySelector(selector);
      if (target) {
        resolve(target);
      }
      let timer = setInterval(() => {
        const target = document.querySelector(selector);
        if (target) {
          clearInterval(timer);
          resolve(target);
        }
      }, 25);
    });
  }

  /**
   * create a promise to wait until transition end of given dom
   * @param dom
   * @returns
   */
  private _transitionEndPromise(dom: Element): Promise<void> {
    return new Promise((resolve) => {
      const onTransitionend = () => {
        dom.removeEventListener("transitionend", onTransitionend);
        resolve();
      };
      dom.addEventListener("transitionend", onTransitionend);
    });
  }

  /** get overlay doms */
  private _getOverlays() {
    return [
      this.overlayTop,
      this.overlayBottom,
      this.overlayLeft,
      this.overlayRight,
    ];
  }
}

export default TargetManager;
