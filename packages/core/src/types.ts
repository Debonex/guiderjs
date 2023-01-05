export type GuiderOption<T> = {
  steps: Step<T>[];
  onStart?: () => void;
  onExit?: () => void;
  target?: string;
  onTargetClick?: () => void;
  overlayColor?: string;
  overlayOpacity?: number;
  onOverlayClick?: () => void;
  zIndex?: number;
  popover?: T;
  popoverPosition?:
    | "auto"
    | "center"
    | "target-top"
    | "target-bottom"
    | "target-left"
    | "target-right";
  popoverGap?: number;
  popoverLeft?: string;
  popoverTop?: string;
  popoverAnimation?: string;
  popoverAnimationDuration?: string;
  popoverAnimationFunction?: string;
  onStepStart?: (step?: Step<T>) => void;
  onStepExit?: (step?: Step<T>) => void;
};

export type Step<T> = {
  key: string;
  target?: string;
  onTargetClick?: () => void;
  overlayColor?: string;
  overlayOpacity?: number;
  onOverlayClick?: () => void;
  zIndex?: number;
  popover?: T;
  popoverPosition?:
    | "auto"
    | "center"
    | "target-top"
    | "target-bottom"
    | "target-left"
    | "target-right";
  popoverGap?: number;
  popoverLeft?: string;
  popoverTop?: string;
  popoverAnimation?: string;
  popoverAnimationDuration?: string;
  popoverAnimationFunction?: string;
  onStepStart?: (step?: Step<T>) => void;
  onStepExit?: (step?: Step<T>) => void;
};

export interface IGuider {
  /**
   * start guider from the step has given key, if no step key given, start from the first step.
   * guider needs to be `show` or `stop` status
   * @param stepKey key of the step to start
   */
  start: (stepKey?: string) => void;
  /**
   * go to next step, if current step is the last step, exit
   */
  next: () => void;
  /**
   * go back one step, if current step is the first step, do nothing.
   */
  back: () => void;
  /**
   * exit guider
   */
  exit: () => Promise<void>;
}

export type Status = "stop" | "stepStarting" | "stepExiting" | "show";

export const getDefaultOption = <T>() => {
  const defaultOption: GuiderOption<T> = {
    steps: [],
    overlayColor: "#333333",
    overlayOpacity: 0.5,
    zIndex: 99999,
    popoverPosition: "auto",
    popoverGap: 8,
    popoverTop: "0px",
    popoverLeft: "0px",
    popoverAnimation: "flip-y",
    popoverAnimationDuration: "400ms",
    popoverAnimationFunction: "ease",
  };
  return defaultOption;
};
