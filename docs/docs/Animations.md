## Built-in animations

We have some built-in animations:

- flip-y
- fade
- scale

[Demo](/docs/Demo)

## Custom animations

You can customize the animation of how popover enter in and enter out.

Write two keyframes in your own css file, `guiderjs-${custom}` and `guiderjs-${custom}-out`, which describe how popover enters in and enters out.

Set `popoverAnimation` as your custom animation name to use your own animation.

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
