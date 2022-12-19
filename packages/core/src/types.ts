export type GuiderOption<EL = Element> = {
  steps: Step<EL>[];
  onStart?: () => void;
  onExit?: () => void;
} & CommonOption<EL>;

export type Step<EL = Element> = {
  key: string;
} & CommonOption<EL>;

export type CommonOption<EL = Element> = {
  target?: string;
  overlayColor?: string;
  overlayOpacity?: number;
  zIndex?: number;
  popover?: EL;
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
  onStepStart?: (step?: Step<EL>) => void;
  onStepExit?: (step?: Step<EL>) => void;
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

export const defaultOption: GuiderOption = {
  steps: [],
  overlayColor: "#333333",
  overlayOpacity: 0.5,
  zIndex: 99999,
  popoverPosition: "auto",
  popoverGap: 8,
  popoverLeft: "0px",
  popoverAnimation: "flip-y",
  popoverAnimationDuration: "400ms",
  popoverAnimationFunction: "ease",
};
