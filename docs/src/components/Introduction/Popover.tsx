import React, { FC, useContext } from "react";
import { IntroductionContext } from "./context";

type PopoverProps = {
  title?: string;
  content?: string;
};

const Popover: FC<PopoverProps> = (props) => {
  const context = useContext(IntroductionContext);

  return (
    <div className="bg-card shadow-content w-40 rounded-md px-4 py-2 shadow-sm">
      <div className="text-lg font-bold">{props.title}</div>
      <button
        className="button button--primary button--sm"
        onClick={() => context.guider.current.next()}
      >
        Next
      </button>
    </div>
  );
};

export default Popover;
