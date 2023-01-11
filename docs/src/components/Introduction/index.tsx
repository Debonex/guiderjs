import Guider, { IGuider, Step } from "@guiderjs/react";
import React, { FC, useEffect, useRef } from "react";
import { IntroductionContext } from "./context";
import Popover from "./Popover";

const Introduction: FC = () => {
  const guider = useRef<IGuider>();

  const steps: Step[] = [
    {
      key: "target",
      target: ".t-target",
      popover: <Popover title="Target" content="This is target" />,
    },
  ];

  useEffect(() => {
    guider.current.start();
  });

  return (
    <IntroductionContext.Provider value={{ steps, guider }}>
      <section className=" relative mx-auto flex max-w-[500px] items-center justify-center rounded-md border p-16">
        <div className="t-target p-4">target</div>
        <Guider steps={steps} ref={guider} />
      </section>
    </IntroductionContext.Provider>
  );
};

export default Introduction;
