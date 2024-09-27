<script setup lang="ts">
import { computed } from "vue";
import { useThemeStore } from './stores/themeStore'
import Home from './views/Home.vue'
import Navbar from './components/Navbar.vue'

const themeStore = useThemeStore();
const themeClass = computed(() => (themeStore.isDarkMode ? 'dark' : ''));
</script>

<template>
  <div :class="themeClass">
    <div class="bg-white dark:bg-[#3d3d3d] min-h-screen">
      <Navbar />
      <Home />
    </div>
  </div>
</template>
