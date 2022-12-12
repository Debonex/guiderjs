/**
 * define common types in this file.
 */

/** step option */
export type Step = {
  key: string;
} & CommonOption;

/** global option */
export type GuiderOption = {
  boundary?: Element;
  steps?: Step[];
  onStart?: () => void;
  onExit?: () => void;
} & CommonOption;

/** target option */
export type TargetOption = {
  selector: string;
  onClick?: (e?: MouseEvent) => void;
};

export type PopoverPosition =
  | "auto"
  | "center"
  | "target-top"
  | "target-bottom"
  | "target-left"
  | "target-right";

export type PopoverAnimation = "flip-y";

/** option in each step and global option */
type CommonOption = {
  target?: string | TargetOption;
  overlay?: {
    color?: string;
    opacity?: number;
    onClick?: (e?: MouseEvent) => void;
  };
  zIndex?: number;
  onStepStart?: (step?: Step) => void;
  onStepExit?: (step?: Step) => void;
  popover?: {
    element?: Element;
    position?: PopoverPosition;
    gap?: number;
    left?: string;
    top?: string;
    animation?: PopoverAnimation;
    animationDuration?: string;
    animationTimingFunction?: string;
  };
};

export type Status = "stop" | "stepStarting" | "stepExiting" | "show";
