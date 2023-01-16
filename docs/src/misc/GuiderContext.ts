import { IGuider, Step } from "@guiderjs/react";
import { MutableRefObject, createContext } from "react";

export type GuiderContext = {
  guider: MutableRefObject<IGuider>;
  stepIdx: number;
  steps: Step[];
};

const GuiderContext = createContext<GuiderContext>(null);

export default GuiderContext;
