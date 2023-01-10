import { IGuider, Step } from "@guiderjs/react";
import { createContext, MutableRefObject } from "react";

type IntroductionContext = {
  steps: Step[];
  guider: MutableRefObject<IGuider>;
};

export const IntroductionContext = createContext<IntroductionContext>(null);
