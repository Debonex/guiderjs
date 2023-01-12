# Guiderjs React

A React component for creating customizable and animated guider on your website.

## Get started

### Installation

```shell
# npm
$ npm install @guiderjs/react
# yarn
$ yarn add @guiderjs/react
```

### usage

```tsx
// App.tsx
import Guider, { IGuider, Step } from "@guiderjs/react";
import { FC, useRef } from "react";

const App: FC = () => {
  // guider instance
  const guider = useRef<IGuider>(null);
  // guider steps
  const steps: Step[] = [{ key: "card", target: ".card" }];

  return (
    <div>
      <div className="card">Card content</div>
      <button onClick={() => guider.current?.start()}>start</button>
      <Guider ref={guider} steps={steps} />
    </div>
  );
};
```

### API

#### IGuider

```ts
interface IGuider {
  /**
   * start guider from the step has given key, if no step key given, start from the first step.
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

#### Component props

| props                    | description                                                                   | type                                                                                     | default   |
| ------------------------ | ----------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | --------- |
| steps (required)         | an array contains info of guider steps                                        | Step[]                                                                                   | -         |
| onStart                  | the callback function when guider start                                       | () => void                                                                               | -         |
| onExit                   | the callback function when guider exited                                      | () => void                                                                               | -         |
| target                   | selector to select target (highlighted) element                               | string                                                                                   | -         |
| targetClass              | className of target                                                           | string                                                                                   | -         |
| preventTarget            | if prevent interaction of origin target element                               | boolean                                                                                  | true      |
| onTargetClick            | the callback function when user click target (highlighted) part               | () => void                                                                               | -         |
| overlayColor             | background color of overlays                                                  | string                                                                                   | "#333333" |
| overlayOpacity           | opacity of overlays                                                           | number                                                                                   | 0.5       |
| overlayClass             | className of overlays                                                         | string                                                                                   | -         |
| zIndex                   | zindex property of guider container                                           | number                                                                                   | 99999     |
| popover                  | popover element                                                               | React.ReactElement                                                                       | -         |
| popoverPosition          | position of popover (works when you have popover)                             | "auto" \| "center" \| "target-top" \| "target-bottom" \| "target-left" \| "target-right" | "auto"    |
| popoverAnchor            | popover position to target                                                    | "start"\|"middle"\|"end"                                                                 | "middle"  |
| popoverGap               | gap (px) between popover and target, (works when you have popover and target) | number                                                                                   | 8         |
| popoverLeft              | left property of popover                                                      | string                                                                                   | "0px"     |
| popoverTop               | top property of popover                                                       | string                                                                                   | "0px"     |
| popoverAnimation         | popover animation name                                                        | string                                                                                   | "flip-y"  |
| popoverAnimationDuration | popover animation duration                                                    | string                                                                                   | "400ms"   |
| popoverAnimationFunction | popover animation timing function                                             | string                                                                                   | "ease"    |
| onStepStart              | the callback function when step start                                         | (step:Step,index:number) => void                                                         | -         |
| onStepExit               | the callback function when step exit                                          | (step:Step,index:number) => void                                                         | -         |

#### Step

(info of one guider step, will override component props)

| property                 | description                                                                   | type                                                                                     | default   |
| ------------------------ | ----------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | --------- |
| key (required)           | unique key of step                                                            | string                                                                                   | -         |
| target                   | selector to select target (highlighted) element                               | string                                                                                   | -         |
| targetClass              | className of target                                                           | string                                                                                   | -         |
| preventTarget            | if prevent interaction of origin target element                               | boolean                                                                                  | true      |
| onTargetClick            | the callback function when user click target (highlighted) part               | () => void                                                                               | -         |
| overlayColor             | background color of overlays                                                  | string                                                                                   | "#333333" |
| overlayOpacity           | opacity of overlays                                                           | number                                                                                   | 0.5       |
| overlayClass             | className of overlays                                                         | string                                                                                   | -         |
| zIndex                   | zindex property of guider container                                           | number                                                                                   | 99999     |
| popover                  | popover element                                                               | React.ReactElement                                                                       | -         |
| popoverPosition          | position of popover (works when you have popover)                             | "auto" \| "center" \| "target-top" \| "target-bottom" \| "target-left" \| "target-right" | "auto"    |
| popoverAnchor            | popover position to target                                                    | "start"\|"middle"\|"end"                                                                 | "middle"  |
| popoverGap               | gap (px) between popover and target, (works when you have popover and target) | number                                                                                   | 8         |
| popoverLeft              | left property of popover                                                      | string                                                                                   | "0px"     |
| popoverTop               | top property of popover                                                       | string                                                                                   | "0px"     |
| popoverAnimation         | popover animation name                                                        | string                                                                                   | "flip-y"  |
| popoverAnimationDuration | popover animation duration                                                    | string                                                                                   | "400ms"   |
| popoverAnimationFunction | popover animation timing function                                             | string                                                                                   | "ease"    |
| onStepStart              | the callback function when step start                                         | (step:Step,index:number) => void                                                         | -         |
| onStepExit               | the callback function when step exit                                          | (step:Step,index:number) => void                                                         | -         |
| payload                  | step payload                                                                  | any                                                                                      | -         |
