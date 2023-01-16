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

See [Animations](/docs/Animations)

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
