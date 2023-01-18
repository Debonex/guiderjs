import Guider, { IGuider } from "@guiderjs/react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import Popover from "@site/src/components/Popover";
import GuiderContext from "@site/src/misc/GuiderContext";
import React, { FC, useEffect, useRef, useState } from "react";

const Demo: FC = () => {
  const guider = useRef<IGuider>();
  useEffect(() => {
    guider.current.start();
  }, []);

  const steps = [
    {
      key: "target",
      target: ".target",
    },
  ];

  const [animationDuration, setAnimationDuration] = useState(400);

  return (
    <GuiderContext.Provider value={{ guider: guider, stepIdx: 0, steps }}>
      <div className="p-2">
        Animation duration
        <Slider
          value={animationDuration}
          onChange={(_, v) => setAnimationDuration(v as number)}
          valueLabelDisplay="auto"
          valueLabelFormat={(v) => `${v}ms`}
          max={2000}
        ></Slider>
        <Button variant="contained" onClick={() => guider.current.start()}>
          rerun
        </Button>
      </div>
      <div className="relative flex h-40 items-center justify-center p-4">
        <div className="target">target</div>
        <Guider
          ref={guider}
          steps={steps}
          popoverAnimationDuration={`${animationDuration}ms`}
          popoverAnimation="scale"
          popover={
            <Popover title="Popover" hideButton>
              <div className="pb-4">This is popover</div>
            </Popover>
          }
        />
      </div>
    </GuiderContext.Provider>
  );
};

export default Demo;
