---
sidebar_position: 1
---

## Installation

To get started with React, install `@guiderjs/react` via npm:

```shell
npm install @guiderjs/react
```

## Basic example

```tsx
// App.tsx
import Guider, { IGuider, Step } from "@guiderjs/react";
import { FC, useRef } from "react";

const App: FC = () => {
  // guider instance
  const guider = useRef<IGuider>(null);
  // guider steps
  const steps: Step[] = [
    {
      // step key (necessary)
      key: "card",
      // highlight target element with className `card`
      target: ".card",
    },
  ];

  return (
    <div>
      <div className="card">Card content</div>
      <button onClick={() => guider.current?.start()}>start</button>
      <Guider ref={guider} steps={steps} />
    </div>
  );
};
```

## Custom animation

You can customize the animation of how popover enter in and enter out.

Write two keyframes in your own css file, `guiderjs-${custom}` and `guiderjs-${custom}-out`, which stand how popover enters in and enters out.

Set [popoverAnimation](/docs/react/Component%20props) as `custom` to use your own animation.

```css
@keyframes guiderjs-custom {
  from {
    opacity: 0;
    transform: rotate3d(0, 1, 0, -180deg);
  }
  to {
    opacity: 1;
    transform: rotate3d(0, 1, 0, 0deg);
  }
}
@keyframes guiderjs-custom-out {
  from {
    opacity: 1;
    transform: rotate3d(0, 1, 0, 0deg);
  }
  to {
    opacity: 0;
    transform: rotate3d(0, 1, 0, -180deg);
  }
}
```

:::tip

Set `opacity` as `0` at **the start of your enter-in keyframes** and **the end of your enter-out keyframes** to makes guiderjs works properly.
:::

## API

### IGuider

```ts
interface IGuider {
  /**
   * start guider from the step has given key
   * if no step key given, start from the first step
   * guider needs to be `show` or `stop` status
   * @param stepKey key of the step to start
   */
  start: (stepKey?: string) => void;
  /**
   * go to next step, if current step is the last step, exit
   */
  next: () => void;
  /**
   * go back one step, if current step is the first step, do nothing.
   */
  back: () => void;
  /**
   * exit guider
   */
  exit: () => Promise<void>;
}
```

### Guider

[Component props](/docs/react/Component%20props)

### Step

[Step](/docs/react/Step)
