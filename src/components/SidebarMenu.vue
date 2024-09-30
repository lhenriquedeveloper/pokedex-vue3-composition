<template>
  <div>
    <button @click="toggleSidebar" class="p-2">
      <MenuIcon class="h-6 w-6 text-primary dark:text-primary-dark" />
    </button>
    
    <transition name="fade">
      <div
        v-if="isSidebarOpen"
        class="fixed inset-0 bg-black bg-opacity-50 z-10"
        @click="closeSidebar"
      ></div>
    </transition>

    <transition name="slide">
      <aside
        v-if="isSidebarOpen"
        class="fixed right-0 top-0 h-full w-64 bg-background dark:bg-background-dark shadow-lg z-20"
        :class="{ 'slide-in': isSidebarOpen, 'slide-out': !isSidebarOpen }"
      >
        <div class="p-4">
          <h2 class="text-lg font-bold text-primary dark:text-primary-dark mb-2">Favorite Pokemons:          </h2>
          <ul>
            <li
              v-for="pokemon in favorites"
              :key="pokemon"
              class="px-2 py-1 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer capitalize font-medium"
            >
              {{ pokemon }}
            </li>
          </ul>
        </div>
      </aside>
    </transition>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { MenuIcon } from 'lucide-vue-next';

export default {
  components: {
    MenuIcon,
  },
  setup() {
    const isSidebarOpen = ref(false);

    const toggleSidebar = () => {
      isSidebarOpen.value = !isSidebarOpen.value;
    };

    const closeSidebar = () => {
      isSidebarOpen.value = false;
    };

    const favorites = computed(() => {
      return JSON.parse(localStorage.getItem('favorites')) || [];
    });

    return {
      isSidebarOpen,
      toggleSidebar,
      closeSidebar,
      favorites,
    };
  },
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.slide-in {
  transform: translateX(0);
  transition: transform 0.4s ease-in-out; /* Aumentamos a duração para 0.4s */
}

.slide-out {
  transform: translateX(100%);
  transition: transform 0.4s ease-in-out; /* Aumentamos a duração para 0.4s */
}
</style>
