/**
 * create div element
 * @param style element styles
 * @param children element children
 * @returns
 */
const createDiv = (
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

export default createDiv;
