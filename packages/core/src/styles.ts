import animationCss from "./animations.css?raw";

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
      overflow: "visible",
      visibility: "hidden",
      display: "flex",
      flexDirection: "column",
    }),
    overlayTop: defineStyle({
      pointerEvents: "all",
      transition: "300ms all ease",
    }),
    middle: defineStyle({
      display: "flex",
    }),
    overlayLeft: defineStyle({
      pointerEvents: "all",
      transition: "300ms all ease",
    }),
    control: defineStyle({
      position: "relative",
      transition: "300ms all ease",
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

export { animationCss };

export type Styles = ReturnType<typeof createStyles>;
