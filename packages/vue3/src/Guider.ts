import CoreGuider, {
  createStyles,
  getDefaultOption,
  IGuider,
  Step as CoreStep,
} from "@guiderjs/core";
import { defineComponent, h, onMounted, PropType, Ref, ref } from "vue";

type Step = CoreStep<boolean>;

export type { IGuider, Step };
const defaultOption = getDefaultOption<boolean>();

export default defineComponent({
  name: "Guider",
  props: {
    steps: { type: Object as PropType<Step[]>, required: true },
    onStart: Function as PropType<() => void>,
    onExit: Function as PropType<() => void>,
    target: String,
    onTargetClick: Function as PropType<() => void>,
    overlayColor: String,
    overlayOpacity: Number,
    onOverlayClick: Function as PropType<() => void>,
    zIndex: Number,
    popover: Boolean,
    popoverPosition: String as PropType<
      | "auto"
      | "center"
      | "target-top"
      | "target-bottom"
      | "target-left"
      | "target-right"
    >,
    popoverGap: Number,
    popoverLeft: String,
    popoverTop: String,
    popoverAnimation: String,
    popoverAnimationDuration: String,
    popoverAnimationFunction: String,
    onStepStart: Function as PropType<(step?: Step) => void>,
    onStepExit: Function as PropType<(step?: Step) => void>,
  },
  setup: (props, { expose }) => {
    const styles = createStyles();
    const guider = ref<CoreGuider<boolean>>();
    const currentStep = ref<Step>();
    const popover = ref<HTMLDivElement>(null);
    const control = ref<HTMLDivElement>(null);
    const overlayTop = ref<HTMLDivElement>(null);
    const overlayLeft = ref<HTMLDivElement>(null);
    const container = ref<HTMLDivElement>(null);
    // remove undefined properties
    const option = { ...props };
    let property: keyof typeof option;
    for (property in option) {
      if (option[property] === undefined) {
        delete option[property];
      }
    }

    if (guider.value) {
      guider.value.setOption({ ...defaultOption, ...option });
    }

    expose({
      start: (stepKey: string) => guider.value?.start(stepKey),
      next: () => guider.value?.next(),
      back: () => guider.value?.back(),
      exit: () => guider.value?.exit(),
    });

    const hOverlay = (
      overlayStyles: Partial<CSSStyleDeclaration>,
      ref?: Ref<HTMLDivElement>
    ) => {
      return h("div", {
        style: {
          ...overlayStyles,
          backgroundColor: currentStep.value?.overlayColor,
          opacity: currentStep.value?.overlayOpacity,
          cursor: currentStep.value?.onOverlayClick ? "pointer" : "initial",
        },
        ref,
        onClick: currentStep.value?.onOverlayClick,
      });
    };

    onMounted(() => {
      guider.value = new CoreGuider<boolean>(
        popover.value,
        control.value,
        overlayTop.value,
        overlayLeft.value,
        container.value,
        { ...defaultOption, ...option },
        (step) => {
          currentStep.value = step;
        }
      );
    });

    return () => {
      const overlayLeftNode = hOverlay(styles.overlayLeft, overlayLeft);
      const overlayTopNode = hOverlay(styles.overlayTop, overlayTop);
      const overlayRightNode = hOverlay(styles.overlayRight);
      const overlayBottomNode = hOverlay(styles.overlayBottom);
      const popoverNode = h("div", { style: styles.popover, ref: popover });
      const controlNode = h(
        "div",
        {
          style: {
            ...styles.control,
            cursor: currentStep.value?.onTargetClick ? "pointer" : "initial",
            pointerEvents: currentStep.value?.onTargetClick ? "all" : "none",
          },
          ref: control,
          onClick: () => currentStep.value?.onTargetClick(),
        },
        popoverNode
      );
      const middleNode = h("div", { style: styles.middle }, [
        overlayLeftNode,
        controlNode,
        overlayRightNode,
      ]);
      const containerNode = h(
        "div",
        { style: styles.container, ref: container },
        [overlayTopNode, middleNode, overlayBottomNode]
      );

      return containerNode;
    };
  },
});
