import CoreGuider from "@core/Guider";
import { animationCss, createStyles } from "@core/styles";
import { getDefaultOption, GuiderOption, IGuider, Step } from "@core/types";
import {
  CSSProperties,
  forwardRef,
  ForwardRefRenderFunction,
  ReactElement,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

const defaultOption = getDefaultOption<ReactElement>();

const Guider: ForwardRefRenderFunction<IGuider, GuiderOption<ReactElement>> = (
  props,
  ref
) => {
  console.log("render guider");
  const container = useRef<HTMLDivElement>();
  const overlayLeft = useRef<HTMLDivElement>();
  const overlayTop = useRef<HTMLDivElement>();
  const control = useRef<HTMLDivElement>();
  const popover = useRef<HTMLDivElement>();
  const guider = useRef<CoreGuider<ReactElement>>();
  const [currentStep, setCurrentStep] = useState<Step<ReactElement>>(null);
  const styles = createStyles() as {
    [P in keyof ReturnType<typeof createStyles>]: CSSProperties;
  };

  useEffect(() => {
    guider.current = new CoreGuider<ReactElement>(
      popover.current,
      control.current,
      overlayTop.current,
      overlayLeft.current,
      container.current,
      { ...defaultOption, ...props },
      (step) => setCurrentStep(step)
    );
    return () => {
      guider.current.release();
    };
  }, []);

  const handleOverlayClick = () => {
    currentStep?.onOverlayClick && currentStep.onOverlayClick();
  };

  const overlayStyles = (styles: CSSProperties): CSSProperties => ({
    ...styles,
    cursor: currentStep?.onOverlayClick ? "pointer" : "initial",
    backgroundColor: currentStep?.overlayColor,
    opacity: currentStep?.overlayOpacity,
  });

  if (guider.current) {
    guider.current.setOption({ ...defaultOption, ...props });
    // guider.current.setUpdateUI((step) => setCurrentStep(step));
  }

  useImperativeHandle<IGuider, IGuider>(ref, () => ({
    start: (key) => guider.current.start(key),
    next: () => guider.current.next(),
    back: () => guider.current.back(),
    exit: () => guider.current.exit(),
  }));

  return (
    <div
      ref={container}
      style={{ ...styles.container, zIndex: currentStep?.zIndex }}
    >
      <style>{animationCss}</style>
      <div
        ref={overlayTop}
        style={overlayStyles(styles.overlayTop)}
        onClick={handleOverlayClick}
      />
      <div style={styles.middle}>
        <div
          ref={overlayLeft}
          style={overlayStyles(styles.overlayLeft)}
          onClick={handleOverlayClick}
        />
        <div
          ref={control}
          style={{
            ...styles.control,
            cursor: currentStep?.onTargetClick ? "pointer" : "initial",
            pointerEvents: currentStep?.onTargetClick ? "all" : "none",
          }}
          onClick={() =>
            currentStep?.onTargetClick && currentStep.onOverlayClick()
          }
        >
          <div ref={popover} style={styles.popover}>
            {currentStep?.popover}
          </div>
        </div>
        <div
          style={overlayStyles(styles.overlayRight)}
          onClick={handleOverlayClick}
        />
      </div>
      <div
        style={overlayStyles(styles.overlayBottom)}
        onClick={handleOverlayClick}
      />
    </div>
  );
};

const ForwardedGuider = forwardRef(Guider);

export default ForwardedGuider;

export type { IGuider };
