import { createStyles, animationCss } from "@core/styles";
import {
  defaultOption,
  GuiderOption,
  IGuider,
  Status,
  Step,
} from "@core/types";
import debounce from "@core/utils/debounce";
import deepmerge from "@core/utils/deepmerge";
import PopoverManager from "@core/PopoverManager";
import TargetManager from "@core/TargetManager";
import {
  CSSProperties,
  forwardRef,
  ForwardRefRenderFunction,
  ReactElement,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

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
  const popoverManager = useRef<PopoverManager<ReactElement>>();
  const targetManager = useRef<TargetManager<ReactElement>>();
  const status = useRef<Status>("stop");
  const currentStepIdx = useRef(-1);
  const currentStepRef = useRef<Step<ReactElement>>(null);
  const [currentStep, setCurrentStep] = useState<Step<ReactElement>>(null);
  const styles = createStyles() as {
    [P in keyof ReturnType<typeof createStyles>]: CSSProperties;
  };

  useEffect(() => {
    popoverManager.current = new PopoverManager(
      popover.current,
      control.current,
      overlayTop.current,
      overlayLeft.current,
      container.current
    );
    targetManager.current = new TargetManager(
      container.current,
      overlayTop.current,
      overlayLeft.current,
      control.current
    );
    const resizeObserver = new ResizeObserver(
      debounce(() => targetManager.current.start(currentStepRef.current))
    );
    resizeObserver.observe(container.current);
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const handleOverlayClick = () => {
    currentStep.onOverlayClick && currentStep.onOverlayClick();
  };

  const overlayStyles = (styles: CSSProperties): CSSProperties => ({
    ...styles,
    cursor: currentStep?.onOverlayClick ? "pointer" : "initial",
    backgroundColor: currentStep?.overlayColor,
    opacity: currentStep?.overlayOpacity,
  });

  // full option
  const guiderOption = deepmerge(defaultOption, props);

  const playCurrentStepIdx = async (fromStop = false) => {
    status.current = "stepStarting";
    if (!fromStop) {
      await exitCurrentStep();
    }
    const stepOption = deepmerge(
      guiderOption,
      props.steps[currentStepIdx.current]
    );
    // update appearance
    setCurrentStep(stepOption);
    stepOption.onStepStart && stepOption.onStepStart(stepOption);
    currentStepRef.current = stepOption;
    await targetManager.current.start(stepOption);
    await popoverManager.current.start(stepOption);
    status.current = "show";
  };

  const exitCurrentStep = async () => {
    status.current = "stepExiting";
    currentStep.onStepExit && currentStep.onStepExit(currentStep);
    await popoverManager.current.exit(currentStep);
  };

  const startImpl = (stepKey?: string) => {
    if (
      (status.current !== "show" && status.current !== "stop") ||
      !props.steps.length
    ) {
      return;
    }
    if (stepKey) {
      currentStepIdx.current = props.steps.findIndex(
        (step) => step.key === stepKey
      );
    } else {
      currentStepIdx.current = 0;
    }
    if (status.current === "stop") {
      props.onStart && props.onStart();
      // no need to render the whole guider
      container.current.style.visibility = "visible";
      playCurrentStepIdx(true);
    } else {
      playCurrentStepIdx();
    }
  };

  const nextImpl = () => {
    if (status.current !== "show") {
      return;
    }
    if (currentStepIdx.current === props.steps.length - 1) {
      exitImpl();
    } else {
      currentStepIdx.current++;
      playCurrentStepIdx();
    }
  };

  const backImpl = () => {
    if (status.current !== "show" || currentStepIdx.current <= 0) {
      return;
    }
    currentStepIdx.current--;
    playCurrentStepIdx();
  };

  const exitImpl = async () => {
    if (status.current !== "show") {
      return;
    }
    await exitCurrentStep();
    await targetManager.current.updateControl(0, 0, 0, 0);
    guiderOption.onExit && guiderOption.onExit();
    container.current.style.visibility = "hidden";
    currentStepIdx.current = -1;
    setCurrentStep(null);
    status.current = "stop";
  };

  useImperativeHandle<IGuider, IGuider>(ref, () => ({
    start: startImpl,
    next: nextImpl,
    back: backImpl,
    exit: exitImpl,
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
