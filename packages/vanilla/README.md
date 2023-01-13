# Guiderjs Vanilla

## Get started

```shell
# npm
$ npm install @guiderjs/vanilla
# yarn
$ yarn add @guiderjs/vanilla
```

### usage

```html
<!-- index.html -->
<div>
  <div class="card">Card content</div>
</div>
```

```ts
// index.ts
import Guider, { Step } from "@guiderjs/vanilla";
// guider steps
const steps: Step[] = [{ key: "card", target: ".card" }];
// guider instance
const guider = new Guider({ steps });
// start guider
guider.start();
```

### API

#### Guider

```ts
class Guider {
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
  /**
   * unmount guider container
   */
  unmount: () => void;
}
```

#### Option

| props                    | description                                                                   | type                                                                                     | default   |
| ------------------------ | ----------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | --------- |
| steps (required)         | an array contains info of guider steps                                        | Step[]                                                                                   | -         |
| boundary                 | selector of boundary element                                                  | string                                                                                   | -         |
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
| popover                  | popover element                                                               | Element                                                                                  | -         |
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
| popover                  | popover element                                                               | Element                                                                                  | -         |
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
