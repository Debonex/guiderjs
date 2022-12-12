/**
 * offset to document of given dom element
 * @param dom dom element
 * @returns offset to document of given dom element
 */
const offsetDocument = (dom: Element) => {
  const rect = dom.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
};

/**
 * compute offset of dom1 to dom2
 * @param dom1 first dom
 * @param dom2 second dom
 * @returns offset of dom1 to dom2
 */
const offsetDoms = (dom1: Element, dom2: Element) => {
  const offset1 = offsetDocument(dom1),
    offset2 = offsetDocument(dom2);

  return {
    top: offset1.top - offset2.top,
    left: offset1.left - offset2.left,
  };
};

export default offsetDoms;
