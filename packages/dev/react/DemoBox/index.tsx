import { Step, useGuider } from "@react/index";
import { FC, useState } from "react";
import styles from "./DemoBox.module.css";
// import { useGuider } from "@guiderjs/react";

const DemoBox: FC = () => {
  const steps: Step[] = [
    {
      key: "start",
      target: `.${styles.target1}`,
      popover: {
        element: <div>dd</div>,
      },
    },
  ];

  const [overlayColor, setOverlayColor] = useState("#333333");
  const [overlayOpacity, setOverlayOpacity] = useState(0.5);
  const [gap, setGap] = useState(8);

  const guider = useGuider({
    boundary: "#demo-container",
    steps,
    overlay: { color: overlayColor, opacity: overlayOpacity },
    popover: {
      element: null,
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
      </div>
    </>
  );
};

export default DemoBox;
