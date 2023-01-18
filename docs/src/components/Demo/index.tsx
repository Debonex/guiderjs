import Guider, { IGuider } from "@guiderjs/react";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from "@mui/material/FormLabel";
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
  const [popoverAnimation, setPopoverAnimation] = useState("flip-y");
  const [popoverPosition, setPopoverPosition] = useState("auto");

  return (
    <GuiderContext.Provider value={{ guider: guider, stepIdx: 0, steps }}>
      <div className="p-2 md:p-4">
        <FormLabel>popoverAnimationDuration</FormLabel>
        <Slider
          value={animationDuration}
          onChange={(_, v) => setAnimationDuration(v as number)}
          valueLabelDisplay="auto"
          valueLabelFormat={(v) => `${v}ms`}
          max={2000}
        ></Slider>

        <FormLabel>popoverAnimation</FormLabel>
        <RadioGroup
          row
          value={popoverAnimation}
          onChange={(_, v) => setPopoverAnimation(v)}
        >
          <FormControlLabel value="flip-y" control={<Radio />} label="flip-y" />
          <FormControlLabel value="fade" control={<Radio />} label="fade" />
          <FormControlLabel value="scale" control={<Radio />} label="scale" />
        </RadioGroup>
      </div>

      <Button
        className="!mb-2"
        variant="contained"
        onClick={() => guider.current.start()}
      >
        rerun
      </Button>

      <div className="relative flex h-40 items-center justify-center p-4">
        <div className="target p-4">target</div>
        <Guider
          ref={guider}
          steps={steps}
          popoverAnimationDuration={`${animationDuration}ms`}
          popoverAnimation={popoverAnimation}
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
