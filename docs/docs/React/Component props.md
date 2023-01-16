---
sidebar_position: 2
---

Props of `<Guider/>`, setting global option of guider, option of each step will override global option with same property.

### steps

`Step[]` _required_

An array contains info of guider steps, property provided by step will override the same property provided by component props.

[More...](/docs/React/Step)

### onStarted

`() => void`

The callback function when guider starts.

### onStarted

`() => void`

The callback function when guider exits.

### target

`string`

Selector for `document.querySelector()` to select target element.

### targetClass

`string`

ClassName of target, not the original target element.

### preventTarget

`boolean`

_default_: `true`

If prevent interaction of the original target element.

### onTargetClick

`() => void`

The callback function when user click target.

### overlayColor

`string`

_default_: `"#333333"`

Background color of overlays.

### overlayOpacity

`number`

_default_: `0.5`

Opacity of overlays.

### overlayClass

`string`

ClassName of overlays.

### zIndex

`number`

_default_: `99999`

zindex property of guider container.

### popover

`React.ReactElement`

Popover element

### popoverPosition

`"auto" | "center" | "target-top" | "target-bottom" | "target-left" | "target-right"`

_default_: `"auto"`

#### "auto"

Default value. If target is not found, popover will be positioned at the start of guider container. If target is found, popover will be positioned to `target-top`, `target-right`, `target-bottom`, `target-left` where there is enough space for popover, if no space around the target element, popover will be positioned at the start of target.

#### "center"

Works when target is not found. position popover at the center of guider container.

#### "target-top"

Works when target is found. position popover at the top of target.

#### "target-bottom"

Works when target is found. position popover at the bottom of target.

#### "target-left"

Works when target is found. position popover at the left of target.

#### "target-right"

Works when target is found. position popover at the right of target.

### popoverAnchor

`"start"|"middle"|"end"`

_default_: `"middle"`

Works when target is found, setting anchor point of popover relative to target.

### popoverGap

`number`

_default_: `8`

Works when target is found, setting gap (px) between popover and target.

### popoverLeft

`string`

_default_: `"0px"`

`left` property of popover element.

### popoverRight

`string`

_default_: `"0px"`

`right` property of popover element.

### popoverAnimation

`string`

_default_: `"flip-y"`

Animation name of popover, we have some built-in animations: `flip-y`.

### popoverAnimationDuration

`string`

_default_: `"400ms"`

Animation duration of popover.

### popoverAnimationFunction

`string`

_default_: `"ease"`

Animation timing function name of popover.

### onStepStart

`(step:Step,index:number) => void`

The callback function when step starts.

### onStepExit

`(step:Step,index:number) => void`

The callback function when step exits.
