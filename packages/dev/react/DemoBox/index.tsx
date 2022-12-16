import { Step, useGuider } from "@react/index";
// import { Step, useGuider } from "@guiderjs/react";
import { FC, useState } from "react";
import styles from "./DemoBox.module.css";
import Popover from "./Popover";

const DemoBox: FC = () => {
  const [overlayColor, setOverlayColor] = useState("#333333");
  const [overlayOpacity, setOverlayOpacity] = useState(0.5);
  const [gap, setGap] = useState(8);

  const steps: Step[] = [
    {
      key: "target1",
      target: `.${styles.target1}`,
      popover: {
        element: <div>dd</div>,
      },
    },
    {
      key: "target2",
      target: `.${styles.target2}`,
      popover: {
        gap: 20,
      },
    },
  ];
  console.log("use guider");

  const guider = useGuider({
    boundary: "#demo-container",
    steps,
    overlay: { color: overlayColor, opacity: overlayOpacity },
    popover: {
      element: <Popover />,
      gap: gap,
    },
  });

  return (
    <>
      <span>overlay color</span>
      <input
        type="text"
        value={overlayColor}
        onChange={(e) => setOverlayColor(e.target.value)}
      />
      <span>overlay opacity</span>
      <input
        type="number"
        value={overlayOpacity}
        min={0}
        max={1}
        step={0.1}
        onChange={(e) => setOverlayOpacity(Number(e.target.value))}
      />
      <span>popover gap</span>
      <input
        type="number"
        value={gap}
        onChange={(e) => setGap(Number(e.target.value))}
      />
      <button onClick={() => guider.current.start()}>start</button>
      <div className={styles.container} id="demo-container">
        <div className={styles.target1}>target1</div>
        <div className={styles.target2}>target2</div>
      </div>
    </>
  );
};

export default DemoBox;
