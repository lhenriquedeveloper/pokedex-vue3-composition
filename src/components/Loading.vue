<template>
  <div
    class="flex items-center justify-center h-screen bg-white dark:bg-[#3d3d3d]"
  >
    <div class="relative">
      <div
        class="w-48 h-48 rounded-full bg-white border-8 border-gray-800 relative overflow-hidden animate-pulse"
      >
        <div class="absolute w-full h-1/2 bg-red-600 top-0"></div>
        <div class="absolute w-full h-1/2 bg-white bottom-0"></div>
        <div
          class="absolute w-16 h-16 bg-white rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-8 border-gray-800 z-10"
        ></div>
        <div
          class="absolute w-12 h-12 bg-gray-300 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pokeball-button"
        ></div>
      </div>
      <div
        class="text-black dark:text-white text-2xl font-bold mt-4 text-center animate-bounce"
      >
        Loading Pokédex...
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {};
  },
});
</script>

<style scoped>
@keyframes pokeball-button {
  0%,
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
  50% {
    transform: translate(-50%, -50%) scale(0.8);
    opacity: 0.8;
  }
}

.animate-pokeball-button {
  animation: pokeball-button 1.5s infinite;
}
</style>
