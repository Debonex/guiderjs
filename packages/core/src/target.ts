import { Step } from "./types";
import offsetDoms from "./utils/offsetDoms";
import transitionEndPromise from "./utils/transitionEndPromise";

export const updateControl = (
  control: HTMLDivElement,
  overlayTop: HTMLDivElement,
  overlayLeft: HTMLDivElement
) => {
  return async (height: number, width: number, top: number, left: number) => {
    const promises: Promise<void>[] = [];

    if (
      control.style.height !== `${height}px` ||
      control.style.width !== `${width}px`
    ) {
      promises.push(transitionEndPromise(control));
      control.style.height = `${height}px`;
      control.style.width = `${width}px`;
    }

    if (overlayTop.style.height !== `${top}px`) {
      promises.push(transitionEndPromise(overlayTop));
      overlayTop.style.height = `${top}px`;
    }

    if (overlayLeft.style.width !== `${left}px`) {
      promises.push(transitionEndPromise(overlayLeft));
      overlayLeft.style.width = `${left}px`;
    }

    // if any element need to update, wait until transitions end
    await Promise.all(promises);
  };
};

export const startTarget = (
  step: Step<any>,
  container: HTMLDivElement,
  updateControlImpl: ReturnType<typeof updateControl>
) => {
  return async () => {
    if (!step) {
      return;
    }
    if (!step.target) {
      await updateControlImpl(0, 0, 0, 0);
    } else {
      const target = document.querySelector(step.target);
      if (!target) {
        return;
      }
      const offset = offsetDoms(target, container);
      // fixed to 2 digits, prevent deviation
      offset.top = Number(offset.top.toFixed(2));
      offset.left = Number(offset.left.toFixed(2));
      const targetRect = target.getBoundingClientRect();
      await updateControlImpl(
        targetRect.height,
        targetRect.width,
        offset.top,
        offset.left
      );
    }
  };
};
