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
