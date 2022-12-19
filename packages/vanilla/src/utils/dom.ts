/**
 * create div element
 * @param style element styles
 * @param children element children
 * @returns
 */
export const createDiv = (
  style: Partial<CSSStyleDeclaration> = {},
  children: HTMLElement[] = []
) => {
  const element = document.createElement("div");

  for (const property in style) {
    element.style[property] = style[property];
  }

  for (const child of children) {
    if (typeof child === "string") {
      element.appendChild(document.createTextNode(child));
    } else {
      element.appendChild(child);
    }
  }

  return element;
};

/**
 * compute offset of dom1 to dom2
 * @param dom1 first dom
 * @param dom2 second dom
 * @returns offset of dom1 to dom2
 */
export const offsetDoms = (dom1: Element, dom2: Element) => {
  const offset1 = offsetDocument(dom1),
    offset2 = offsetDocument(dom2);

  return {
    top: offset1.top - offset2.top,
    left: offset1.left - offset2.left,
  };
};

/**
 * offset to document of given dom element
 * @param dom dom element
 * @returns offset to document of given dom element
 */
export const offsetDocument = (dom: Element) => {
  const rect = dom.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
};
