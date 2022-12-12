const defineStyle = (style: Partial<CSSStyleDeclaration>) => style;

export const createStyles = () => {
  return {
    container: defineStyle({
      position: "absolute",
      top: "0",
      bottom: "0",
      left: "0",
      right: "0",
      pointerEvents: "none",
      overflow: "hidden",
      visibility: "hidden",
      display: "flex",
      flexDirection: "column",
    }),
    overlayTop: defineStyle({
      pointerEvents: "all",
      transition: "300ms all ease",
      height: "0px",
    }),
    middle: defineStyle({
      display: "flex",
    }),
    overlayLeft: defineStyle({
      pointerEvents: "all",
      transition: "300ms all ease",
      width: "0px",
    }),
    control: defineStyle({
      position: "relative",
      transition: "300ms all ease",
      width: "0px",
      height: "0px",
    }),
    overlayRight: defineStyle({
      pointerEvents: "all",
      transition: "300ms all ease",
      flexGrow: "1",
    }),
    overlayBottom: defineStyle({
      pointerEvents: "all",
      transition: "300ms all ease",
      flexGrow: "1",
    }),
    popover: defineStyle({
      position: "absolute",
      pointerEvents: "all",
      opacity: "0",
      transition: "transform 400ms ease-in, opacity 400ms ease-in",
      width: "max-content",
      height: "max-content",
      cursor: "initial",
      zIndex: "1",
    }),
  };
};

export const createAnimations = () => {
  const style = document.createElement("style");
  // TODO: rawly load css
  style.innerHTML = `
    @keyframes guiderjs-flip-y {
      from {
        opacity: 0;
        transform: rotate3d(1, 0, 0, -180deg);
      }
      to {
        opacity: 1;
        transform: rotate3d(1, 0, 0, 0deg);
      }
    }
    @keyframes guiderjs-flip-y-out {
      from {
          opacity: 1;
          transform: rotate3d(1, 0, 0, 0deg);
      }
      to {
          opacity: 0;
          transform: rotate3d(1, 0, 0, -180deg);
      }
    }
  `;
  return style;
};

export type Styles = ReturnType<typeof createStyles>;
