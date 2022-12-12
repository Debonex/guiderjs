const animationEndPromise = (dom: Element): Promise<void> => {
  return new Promise((resolve) => {
    const onAnimationEnd = () => {
      dom.removeEventListener("animationend", onAnimationEnd);
      resolve();
    };
    dom.addEventListener("animationend", onAnimationEnd);
  });
};

export default animationEndPromise;
