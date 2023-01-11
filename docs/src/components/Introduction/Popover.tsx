import React, { FC, useContext } from "react";
import { IntroductionContext } from "./context";

type PopoverProps = {
  title?: string;
  content?: string;
};

const Popover: FC<PopoverProps> = (props) => {
  const context = useContext(IntroductionContext);

  return (
    <div className="bg-card outline-primary w-40 rounded-md px-4 py-2 shadow-sm outline outline-1">
      <div className="text-lg font-bold">{props.title}</div>
      <div>{props.content}</div>
      <div className="flex gap-2 py-2">
        <button
          className="button button--primary button--sm"
          onClick={() => context.guider.current.next()}
        >
          Next
        </button>
        <button
          className="button button--primary button--sm"
          onClick={() => context.guider.current.exit()}
        >
          Exit
        </button>
      </div>
    </div>
  );
};

export default Popover;
