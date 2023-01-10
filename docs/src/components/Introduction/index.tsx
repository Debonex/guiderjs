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
      popoverPosition: "target-top",
    },
  ];

  useEffect(() => {
    guider.current.start();
  });

  return (
    <IntroductionContext.Provider value={{ steps, guider }}>
      <section className="relative flex items-center justify-center p-16">
        <div className="t-target">target</div>
        <Guider steps={steps} ref={guider} />
      </section>
    </IntroductionContext.Provider>
  );
};

export default Introduction;
