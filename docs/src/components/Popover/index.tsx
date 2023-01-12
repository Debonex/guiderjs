import GuiderContext from "@site/src/misc/GuiderContext";
import React, { FC, useContext } from "react";

type PopoverProps = {
  title?: string;
  content?: string;
};

const Popover: FC<PopoverProps> = (props) => {
  const { guider } = useContext(GuiderContext);
  return (
    <div className="bg-card outline-primary w-40 rounded-md px-4 py-2 shadow-sm outline outline-1">
      <div className="text-lg font-bold">{props.title}</div>
      <div>{props.content}</div>
      <div className="flex gap-2 py-2">
        <button
          className="button button--primary button--sm"
          onClick={() => guider.current.next()}
        >
          Next
        </button>
        <button
          className="button button--primary button--sm"
          onClick={() => guider.current.exit()}
        >
          Exit
        </button>
      </div>
    </div>
  );
};

export default Popover;
