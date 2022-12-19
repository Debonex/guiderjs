import { createStyles } from "@core/styles";
import {
  defaultOption,
  GuiderOption,
  IGuider,
  Status,
  Step,
} from "@core/types";
import deepmerge from "@core/utils/deepmerge";
import {
  CSSProperties,
  forwardRef,
  ForwardRefRenderFunction,
  ReactElement,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

const ForwardedGuider: ForwardRefRenderFunction<
  IGuider,
  GuiderOption<ReactElement>
> = (props, ref) => {
  console.log("render guider");
  const containerDom = useRef<HTMLDivElement>();
  const status = useRef<Status>("stop");
  const currentStepIdx = useRef(-1);
  const [currentStep, setCurrentStep] = useState<Step<ReactElement>>(null);
  const styles = createStyles() as {
    [P in keyof ReturnType<typeof createStyles>]: CSSProperties;
  };

  const guiderOption = deepmerge(defaultOption, props);

  const playCurrentStepIdx = async (fromStop = false) => {
    status.current = "stepStarting";
    if (!fromStop) {
      await exitCurrentStep();
    }
    setCurrentStep(
      deepmerge(guiderOption, props.steps[currentStepIdx.current])
    );

    status.current = "show";
  };

  const exitCurrentStep = async () => {
    status.current = "stepExiting";
    currentStep.onStepExit && currentStep.onStepExit();
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
      containerDom.current.style.visibility = "visible";
      // TODO debounce resize
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

  const exitImpl = async () => {};

  useImperativeHandle<IGuider, IGuider>(ref, () => ({
    start: startImpl,
    next: nextImpl,
    back: backImpl,
    exit: exitImpl,
  }));

  return (
    <div ref={containerDom} style={styles.container}>
      <div style={styles.overlayTop}></div>
      <div style={styles.middle}>
        <div style={styles.overlayLeft}></div>
        <div style={styles.control}>
          <div style={styles.popover}>{status.current}</div>
        </div>
        <div style={styles.overlayRight}></div>
      </div>
      <div style={styles.overlayBottom}></div>
    </div>
  );
};

const Guider = forwardRef(ForwardedGuider);

export default Guider;

export type { IGuider };
