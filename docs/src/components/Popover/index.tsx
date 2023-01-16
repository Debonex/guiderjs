import GuiderContext from "@site/src/misc/GuiderContext";
import React, { FC, useContext } from "react";

type PopoverProps = {
  title?: string;
  children?: React.ReactNode;
  hideButton?: boolean;
};

const Popover: FC<PopoverProps> = (props) => {
  const { guider, stepIdx } = useContext(GuiderContext);

  const next = () => guider.current.next();
  const back = () => guider.current.back();
  const exit = () => guider.current.exit();

  return (
    <div className="bg-card outline-primary max-w-[320px] rounded-md shadow-sm outline outline-1">
      <div className="flex justify-between px-4 py-2">
        <div className="font-bold">{props.title}</div>
        {!props.hideButton && (
          <div className="cursor-pointer font-bold" onClick={exit}>
            ×
          </div>
        )}
      </div>
      <div className="px-4">{props.children}</div>
      {!props.hideButton && (
        <div className="border-primary flex border-t py-4 px-4">
          {stepIdx !== 0 && (
            <button className="button button--primary" onClick={back}>
              Back
            </button>
          )}
          <button className="button button--primary ml-auto" onClick={next}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Popover;
