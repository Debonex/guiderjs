<script setup lang="ts">
import Guider, { IGuider, Step } from "@vue3/index";
import { ref } from "vue";

const guider = ref<IGuider>();
const steps: Step[] = [
  {
    key: "target1",
    target: ".target1",
    overlayClass: "overlay-black",
    preventTarget: false,
  },
  {
    key: "target2",
    target: ".target2",
    onTargetClick: () => console.log("click"),
    targetClass: "custom-target",
  },
];

const test = () => {
  console.log("test");
};

const handleStepStart = (step: Step, idx: number) => {
  console.log(step.key, idx);
};

const handleStart = () => {
  guider.value?.start();
};

const handleNext = () => {
  guider.value?.next();
};

const handleBack = () => {
  guider.value?.back();
};

const handleExit = () => {
  guider.value?.exit();
};
</script>

<template>
  <div class="grid h-screen grid-rows-[auto,minmax(0,1fr)]">
    <div class="flex gap-2 p-1">
      <button @click="handleStart()">start</button>
      <button @click="handleNext()">next</button>
      <button @click="handleBack()">back</button>
      <button @click="handleExit()">exit</button>
    </div>
    <div class="relative bg-slate-50 p-4">
      <div class="target1 bg-sky-300 p-2">target1</div>
      <div class="target2 mt-4 bg-red-300 p-2">target1</div>
      <Guider
        :steps="steps"
        :on-start="test"
        :on-step-start="handleStepStart"
        ref="guider"
      >
        <template #target1>
          <div class="rounded-md bg-white p-2">popover</div>
        </template>
        <template #target2>
          <div class="rounded-md bg-white p-2">popover target2</div>
        </template>
      </Guider>
    </div>
  </div>
</template>

<style>
.overlay-black {
  background-color: black !important;
}

.custom-target {
  border: 1px solid black;
}
</style>
