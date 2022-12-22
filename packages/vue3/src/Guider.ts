import { createStyles, IGuider } from "@guiderjs/core";
import { defineComponent, h } from "vue";

export type { IGuider };

export default defineComponent<{}, IGuider>({
  name: "Guider",
  setup: (props, { expose }) => {
    const styles = createStyles();

    expose({
      start: () => console.log("start"),
    });

    const container = h("div", { style: styles.container });

    return () => container;
  },
});
