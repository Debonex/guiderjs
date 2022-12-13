import Guider, { Step } from "@core/index";
// uncomment this line to use built version
// import Guider, { Step } from "@guiderjs/core";

import "./main.css";

const addButton = (content: string, onClick: () => void) => {
  const button = document.createElement("button");
  button.textContent = content;
  button.addEventListener("click", onClick);
  document.querySelector(".control-panel-buttons").append(button);
};

const boundary = document.querySelector(".guider-boundary");

const popoverElement = document.createElement("div");
popoverElement.innerHTML = `<div style="background:#fff;">hello</div>`;

const steps: Step[] = [
  {
    key: "target-1",
    target: {
      selector: ".target-1",
      onClick: () => {
        guider.next();
      },
    },
  },
  {
    key: "target-2",
    target: ".target-2",
    overlay: {
      onClick: () => {
        guider.back();
      },
    },
  },
  {
    key: "target-3",
    target: ".target-3",
    popover: {
      element: popoverElement,
      position: "target-left",
    },
  },
  { key: "target-4", target: ".target-4" },
  { key: "target-5", target: ".target-5" },
  { key: "target-5-1", target: ".target-5-1" },
  { key: "target-6", target: ".target-6" },
  { key: "target-6-1", target: ".target-6-1" },
  { key: "no-target", popover: { position: "center" } },
];

const guider = new Guider({
  boundary,
  steps,
  onExit: () => {
    console.log("exit");
  },
  onStart: () => {
    console.log("start");
  },
  onStepStart: console.log,
  popover: {
    element: popoverElement,
  },
});

addButton("start", () => guider.start());
addButton("next", () => guider.next());
addButton("back", () => guider.back());
addButton("exit", () => guider.exit());

steps.forEach((step) => {
  addButton(step.key, () => guider.start(step.key));
});

document
  .querySelector(".target-6-1")
  .addEventListener("click", () => guider.start("target-6-1"));
