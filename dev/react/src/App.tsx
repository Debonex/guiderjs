import Guider, { IGuider } from "@react/index";
import { useRef, useState } from "react";

function App() {
  const guider = useRef<IGuider>(null);

  const [duration, setDuration] = useState("400ms");
  const [opacity, setOpacity] = useState(0.3);
  return (
    <div className="grid h-screen w-screen grid-rows-[auto,minmax(0,1fr)]">
      <div className="p-1">
        <div className="flex gap-2 p-1">
          <button onClick={() => guider.current?.start()}>start</button>
          <button onClick={() => guider.current?.next()}>next</button>
          <button onClick={() => guider.current?.back()}>back</button>
          <button onClick={() => guider.current?.exit()}>exit</button>
          <input
            type="text"
            value={duration}
            onInput={(e) => setDuration(e.currentTarget.value)}
          />
          <button onClick={() => setOpacity(1 - opacity)}>
            change opacity
          </button>
        </div>
      </div>
      <div className="relative bg-slate-50 p-4">
        <div className="target1 bg-sky-300 p-2">target1</div>
        <div className="target2 mt-4 bg-red-300 p-2">target2</div>
        <div className="flex gap-4">
          <div className="target3 p-4">target3</div>
          <div className="target4 p-4">target4</div>
        </div>
        <Guider
          ref={guider}
          popoverAnimationDuration={duration}
          steps={[
            {
              key: "target1",
              target: ".target1",
              payload: { info: "payload of target1" },
              preventTarget: false,
              onStepStart: (step, index) =>
                console.log(`start ${step.key} ${index} ${step.payload.info}`),
              overlayClass: "overlay-black",
              popover: <div className="rounded-md bg-white p-2">popover</div>,
              overlayOpacity: opacity,
            },
            {
              key: "target2",
              target: ".target2",
              onStepExit: (step, index) =>
                console.log(`exit ${step.key} ${index}`),
              popover: <div className="rounded-md bg-white p-2">popover2</div>,
              popoverAnimation: "scale",
              popoverAnimationFunction:
                "cubic-bezier(0.175, 0.885, 0.320, 1.275)",
            },
            {
              key: "target3",
              target: ".target3",
              popover: <div className="rounded-md bg-white p-3">popover3</div>,
            },
            {
              key: "target4",
              target: ".target4",
              popover: <div className="rounded-md bg-white p-4">popover4</div>,
            },
          ]}
          onStart={() => console.log("start")}
          onExit={() => console.log("exit")}
        />
      </div>
    </div>
  );
}

export default App;
