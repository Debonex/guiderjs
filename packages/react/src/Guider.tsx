import CoreGuider, {
  animationCss,
  createStyles,
  getDefaultOption,
  GuiderOption,
  IGuider,
  Step as CoreStep,
} from "@guiderjs/core";
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
type Option = GuiderOption<ReactElement>;
type Step = CoreStep<ReactElement>;

const Guider: ForwardRefRenderFunction<IGuider, Option> = (props, ref) => {
  const container = useRef<HTMLDivElement>();
  const overlayLeft = useRef<HTMLDivElement>();
  const overlayTop = useRef<HTMLDivElement>();
  const control = useRef<HTMLDivElement>();
  const popover = useRef<HTMLDivElement>();
  const guider = useRef<CoreGuider<ReactElement>>();
  const [currentStep, setCurrentStep] = useState<Step>(null);
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
        className={currentStep?.overlayClass}
      />
      <div style={styles.middle}>
        <div
          ref={overlayLeft}
          style={overlayStyles(styles.overlayLeft)}
          onClick={handleOverlayClick}
          className={currentStep?.overlayClass}
        />
        <div
          ref={control}
          style={{
            ...styles.control,
            cursor: currentStep?.onTargetClick ? "pointer" : "initial",
            pointerEvents: currentStep?.preventTarget ? "initial" : "none",
          }}
          className={currentStep?.targetClass}
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
          className={currentStep?.overlayClass}
        />
      </div>
      <div
        style={overlayStyles(styles.overlayBottom)}
        onClick={handleOverlayClick}
        className={currentStep?.overlayClass}
      />
    </div>
  );
};

const ForwardedGuider = forwardRef(Guider);

export default ForwardedGuider;

export type { IGuider, Option, Step };
