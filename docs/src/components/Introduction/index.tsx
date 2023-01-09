import React, { FC, useRef, useEffect } from "react";
import Guider, { IGuider, Step } from "@guiderjs/react";

const Introduction: FC = () => {
  const guider = useRef<IGuider>();

  const steps: Step[] = [{ key: "target", target: ".t-target" }];

  useEffect(() => {
    guider.current.start();
  });

  return (
    <section className="relative flex items-center justify-center p-16">
      <div className="t-target">target</div>
      <Guider steps={steps} ref={guider} />
    </section>
  );
};

export default Introduction;
