import Guider, { Step } from "@vanilla/index";
import "./style.css";

const buttonsContainer = document.querySelector(".buttons");
const addButton = (content: string, onClick: () => void) => {
  const button = document.createElement("button");
  button.textContent = content;
  button.addEventListener("click", onClick);
  buttonsContainer?.append(button);
};

const popoverElement = document.createElement("div");
popoverElement.innerHTML = `<div style="background:#fff;">hello</div>`;

const steps: Step[] = [
  {
    key: "target-1",
    target: ".target-1",
    onOverlayClick: () => console.log("click target 1 overlay"),
  },
  {
    key: "target-2",
    target: ".target-2",
    onTargetClick: () => console.log("click target 2"),
  },
  { key: "target-3", target: ".target-3" },
];

const guider = new Guider({
  boundary: ".guider-boundary",
  steps,
  onExit: () => {
    console.log("exit");
  },
  onStart: () => {
    console.log("start");
  },
  onStepStart: (step, idx) => {
    console.log(step.key, idx);
  },
  popover: popoverElement,
});

addButton("start", () => guider.start());
addButton("next", () => guider.next());
addButton("back", () => guider.back());
addButton("exit", () => guider.exit());

steps.forEach((step) => {
  addButton(step.key, () => guider.start(step.key));
});
