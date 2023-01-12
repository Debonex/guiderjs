import Guider, { IGuider } from "@react/index";
import { useRef } from "react";

function App() {
  const guider = useRef<IGuider>(null);
  return (
    <div className="grid h-screen w-screen grid-rows-[auto,minmax(0,1fr)]">
      <div className="p-1">
        <div className="flex gap-2 p-1">
          <button onClick={() => guider.current?.start()}>start</button>
          <button onClick={() => guider.current?.next()}>next</button>
          <button onClick={() => guider.current?.back()}>back</button>
          <button onClick={() => guider.current?.exit()}>exit</button>
        </div>
      </div>
      <div className="relative bg-slate-50 p-4">
        <div className="target1 bg-sky-300 p-2">target1</div>
        <div className="target2 mt-4 bg-red-300 p-2">target2</div>
        <Guider
          ref={guider}
          steps={[
            {
              key: "target1",
              target: ".target1",
              payload: { info: "payload of target1" },
              preventTarget: false,
              onStepStart: (step, index) =>
                console.log(`start ${step.key} ${index} ${step.payload.info}`),
              overlayClass: "overlay-black",
            },
            {
              key: "target2",
              target: ".target2",
              onStepExit: (step, index) =>
                console.log(`exit ${step.key} ${index}`),
            },
          ]}
          onStart={() => console.log("start")}
          onExit={() => console.log("exit")}
          popover={<div className="rounded-md bg-white p-2">popover</div>}
        />
      </div>
    </div>
  );
}

export default App;
