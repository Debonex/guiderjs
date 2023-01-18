import Guider, {
  IGuider,
  PopoverAnchor,
  PopoverPosition,
} from "@guiderjs/react";
import Button from "@mui/material/Button";
import FormLabel from "@mui/material/FormLabel";
import Slider from "@mui/material/Slider";
import Popover from "@site/src/components/Popover";
import GuiderContext from "@site/src/misc/GuiderContext";
import React, { FC, useEffect, useRef, useState } from "react";
import RadioGroup from "./RadioGroup";

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

  const [overlayOpacity, setOverlayOpacity] = useState(0.5);
  const [animationDuration, setAnimationDuration] = useState(400);
  const [popoverAnimation, setPopoverAnimation] = useState("flip-y");
  const [popoverPosition, setPopoverPosition] =
    useState<PopoverPosition>("auto");
  const [popoverAnchor, setPopoverAnchor] = useState<PopoverAnchor>("middle");

  return (
    <GuiderContext.Provider value={{ guider: guider, stepIdx: 0, steps }}>
      <div className="p-2 md:p-4">
        {/* <FormLabel>overlayOpacity</FormLabel>
        <Slider
          value={overlayOpacity}
          onChange={(_, v) => setOverlayOpacity(v as number)}
          valueLabelDisplay="auto"
          step={0.01}
          max={1}
        ></Slider> */}

        <FormLabel>popoverAnimationDuration</FormLabel>
        <Slider
          value={animationDuration}
          onChange={(_, v) => setAnimationDuration(v as number)}
          valueLabelDisplay="auto"
          valueLabelFormat={(v) => `${v}ms`}
          max={2000}
        ></Slider>

        <RadioGroup<string>
          value={popoverAnimation}
          values={["flip-y", "fade", "scale"]}
          label="popoverAnimation"
          onChange={(v) => setPopoverAnimation(v)}
        />

        <RadioGroup<PopoverPosition>
          value={popoverPosition}
          values={[
            "auto",
            "target-bottom",
            "target-left",
            "target-right",
            "target-top",
          ]}
          label="popoverPosition"
          onChange={(v) => setPopoverPosition(v)}
        />

        <RadioGroup<PopoverAnchor>
          value={popoverAnchor}
          values={["start", "middle", "end"]}
          label="popoverAnchor"
          onChange={(v) => setPopoverAnchor(v)}
        />
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
          overlayOpacity={overlayOpacity}
          popoverAnimationDuration={`${animationDuration}ms`}
          popoverAnimation={popoverAnimation}
          popoverPosition={popoverPosition}
          popoverAnchor={popoverAnchor}
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
