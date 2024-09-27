<template>
  <div class="relative max-w-md mx-auto">
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Search..."
      class="shadow-xl w-full py-2 pl-10 pr-4 text-muted-foreground bg-background border-2 border-accent rounded-full focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition-all duration-300 ease-in-out"
      :class="{ 'pl-4': searchQuery }"
      @focus="isFocused = true"
      @blur="isFocused = false"
    />
    <div
      class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-all duration-300 ease-in-out"
      :class="{ 'opacity-0': searchQuery }"
    >
      <SearchIcon :class="[isFocused ? 'text-primary' : 'text-muted-foreground']" class="w-5 h-5" />
    </div>
    <button
      v-if="searchQuery"
      @click="clearSearch"
      class="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-primary transition-colors duration-200 ease-in-out"
    >
      <XIcon class="w-5 h-5" />
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { SearchIcon, XIcon } from 'lucide-vue-next'

const searchQuery = ref('')
const isFocused = ref(false)

const clearSearch = () => {
  searchQuery.value = ''
}
</script>

<style scoped>
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}


</style>