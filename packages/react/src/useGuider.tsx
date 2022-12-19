// import Guider, {
//   GuiderOption as CoreGuiderOption,
//   PopoverOption as CorePopoverOption,
//   Step as CoreStep,
// } from "@core/index";
// import { ReactElement, useEffect, useRef } from "react";
// import { createRoot } from "react-dom/client";

// export type PopoverOption = Omit<CorePopoverOption, "element"> & {
//   element?: ReactElement;
// };

// export type GuiderOption = Omit<
//   CoreGuiderOption,
//   "boundary" | "popover" | "steps"
// > & {
//   boundary?: string;
//   popover?: PopoverOption;
//   steps: Step[];
// };

// export type Step = Omit<CoreStep, "popover"> & {
//   popover?: PopoverOption;
// };

// const coreOption = (option: GuiderOption): CoreGuiderOption => {
//   const domElement = (element: ReactElement) => {
//     if (element instanceof Element) {
//       return element;
//     }

//     const domElement = document.createElement("div");
//     createRoot(domElement).render(element);
//     return domElement;
//   };

//   const transformedOption: CoreGuiderOption = Object.assign({}, option);
//   if (transformedOption.popover?.element) {
//     transformedOption.popover.element = domElement(option.popover.element);
//   }

//   transformedOption.steps.forEach((step, idx) => {
//     if (step.popover?.element) {
//       step.popover.element = domElement(option.steps[idx].popover.element);
//     }
//   });

//   return transformedOption;
// };

// const useGuider = (option: GuiderOption) => {
//   const guider = useRef<Guider>();

//   if (guider.current) {
//     guider.current.updateOption(coreOption(option));
//   }

//   useEffect(() => {
//     guider.current = new Guider(coreOption(option));

//     return () => {
//       guider.current.unmount();
//     };
//   }, []);

//   return guider;
// };

// export default useGuider;
