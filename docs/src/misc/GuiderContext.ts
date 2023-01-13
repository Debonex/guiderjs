import { IGuider } from "@guiderjs/react";
import { MutableRefObject, createContext } from "react";

export type GuiderContext = {
  guider: MutableRefObject<IGuider>;
};

const GuiderContext = createContext<GuiderContext>(null);

export default GuiderContext;
