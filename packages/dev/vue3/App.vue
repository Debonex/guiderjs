<template>
  <div class="grid h-screen grid-rows-[auto,minmax(0,1fr)]">
    <div class="flex gap-4">
      <button @click="handleStart()">start</button>
      <button @click="handleNext()">next</button>
      <button @click="handleBack()">back</button>
      <button @click="handleExit()">exit</button>
    </div>
    <div class="relative flex flex-col gap-2 p-2">
      <div class="target1">target1</div>
      <div class="target2">target2</div>
      <div class="target3">target3</div>
      <Guider :steps="steps" :on-start="() => test()" ref="guider" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Guider, { IGuider, Step } from "@guiderjs/vue3";
import { ref } from "vue";

const guider = ref<IGuider>();

const steps: Step[] = [
  { key: "target1", target: ".target1" },
  { key: "target2", target: ".target2" },
  { key: "target3", target: ".target3" },
];

const test = () => {
  console.log("test");
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
