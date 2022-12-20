const transitionEndPromise = (dom: Element): Promise<void> => {
  return new Promise((resolve) => {
    const onTransitionend = () => {
      dom.removeEventListener("transitionend", onTransitionend);
      resolve();
    };
    dom.addEventListener("transitionend", onTransitionend);
  });
};

export default transitionEndPromise;
