import { FC, useRef } from "react";
import Guider, { IGuider } from "@react/index";
// import Guider, { IGuider } from "@guiderjs/react";
import "../main.css";

const App: FC = () => {
  const guider = useRef<IGuider>();

  return (
    <div className="grid h-screen w-screen grid-rows-[auto,minmax(0,1fr)]">
      <div className="p-1">
        <div className="flex gap-2 p-1">
          <button onClick={() => guider.current.start()}>start</button>
          <button onClick={() => guider.current.next()}>next</button>
          <button onClick={() => guider.current.back()}>back</button>
          <button onClick={() => guider.current.exit()}>exit</button>
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
              onStepStart: (step) => console.log(`start ${step.key}`),
            },
            {
              key: "target2",
              target: ".target2",
              onStepExit: (step) => console.log(`exit ${step.key}`),
            },
          ]}
          onStart={() => console.log("start")}
          onExit={() => console.log("exit")}
          popover={<div className="rounded-md bg-white p-2">popover</div>}
        />
      </div>
    </div>
  );
};

export default App;
