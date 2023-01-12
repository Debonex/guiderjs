# Guiderjs vue3

A Vue component for creating customizable and animated guider on your website.

## Get started

### Installation

```shell
# npm
$ npm install @guiderjs/vue3
# yarn
$ yarn add @guiderjs/vue3
```

### usage

```vue
<script setup lang="ts">
import Guider, { IGuider, Step } from "@vue3/index";
import { onMounted, ref } from "vue";

const guider = ref<IGuider>();
const steps: Step[] = [{ key: "target1", target: ".target1" }];

onMounted(() => {
  guider.value?.start();
});
</script>

<template>
  <div>
    <div class="target1">target1</div>
    <Guider :steps="steps" ref="guider"></Guider>
  </div>
</template>
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
| popover                  | if show popover                                                               | boolean                                                                                  | true      |
| popoverPosition          | position of popover (works when you have popover)                             | "auto" \| "center" \| "target-top" \| "target-bottom" \| "target-left" \| "target-right" | "auto"    |
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
| popover                  | if show popover                                                               | boolean                                                                                  | true      |
| popoverPosition          | position of popover (works when you have popover)                             | "auto" \| "center" \| "target-top" \| "target-bottom" \| "target-left" \| "target-right" | "auto"    |
| popoverGap               | gap (px) between popover and target, (works when you have popover and target) | number                                                                                   | 8         |
| popoverLeft              | left property of popover                                                      | string                                                                                   | "0px"     |
| popoverTop               | top property of popover                                                       | string                                                                                   | "0px"     |
| popoverAnimation         | popover animation name                                                        | string                                                                                   | "flip-y"  |
| popoverAnimationDuration | popover animation duration                                                    | string                                                                                   | "400ms"   |
| popoverAnimationFunction | popover animation timing function                                             | string                                                                                   | "ease"    |
| onStepStart              | the callback function when step start                                         | (step:Step,index:number) => void                                                         | -         |
| onStepExit               | the callback function when step exit                                          | (step:Step,index:number) => void                                                         | -         |
| payload                  | step payload                                                                  | any                                                                                      | -         |
