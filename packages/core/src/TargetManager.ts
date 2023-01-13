import { Step } from "./types";
import offsetDoms from "./utils/offsetDoms";
import transitionEndPromise from "./utils/transitionEndPromise";

/**
 * manage size of control and overlay
 */
class TargetManager<T> {
  private container: HTMLDivElement;
  private overlayTop: HTMLDivElement;
  private overlayLeft: HTMLDivElement;
  private control: HTMLDivElement;

  constructor(
    container: HTMLDivElement,
    overlayTop: HTMLDivElement,
    overlayLeft: HTMLDivElement,
    control: HTMLDivElement
  ) {
    this.container = container;
    this.overlayTop = overlayTop;
    this.overlayLeft = overlayLeft;
    this.control = control;
    // init overlay and control size here(not in styles), prevent rerendering in vue3
    this.control.style.width = "0px";
    this.control.style.height = "0px";
    this.overlayTop.style.height = "0px";
    this.overlayLeft.style.width = "0px";
  }

  /**
   * update control according to given step
   * @param step full step option
   */
  async start(step: Step<T>) {
    if (!step) {
      return;
    }
    if (!step.target) {
      await this.updateControl(0, 0, 0, 0);
    } else {
      const target = document.querySelector(step.target);
      if (!target) {
        await this.updateControl(0, 0, 0, 0);
      } else {
        const offset = offsetDoms(target, this.container);
        const targetRect = target.getBoundingClientRect();
        await this.updateControl(
          Math.round(targetRect.height),
          Math.round(targetRect.width),
          Math.round(offset.top),
          Math.round(offset.left)
        );
      }
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
      promises.push(transitionEndPromise(this.control));
      this.control.style.height = `${height}px`;
      this.control.style.width = `${width}px`;
    }

    if (this.overlayTop.style.height !== `${top}px`) {
      promises.push(transitionEndPromise(this.overlayTop));
      this.overlayTop.style.height = `${top}px`;
    }

    if (this.overlayLeft.style.width !== `${left}px`) {
      promises.push(transitionEndPromise(this.overlayLeft));
      this.overlayLeft.style.width = `${left}px`;
    }

    // if any element need to update, wait until transitions end
    await Promise.all(promises);
  }
}

export default TargetManager;
