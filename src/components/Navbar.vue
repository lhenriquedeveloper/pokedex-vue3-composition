<template>
  <nav class="bg-background dark:bg-background-dark shadow-xl">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex">
          <div class="flex-shrink-0 flex items-center">
            <img src="../assets/pokeballs.png" class="w-8" alt="PokedexIcon" />
            <span class="ml-2 text-2xl font-bold text-primary">Pokedex</span>
          </div>
        </div>
        <div class="flex items-center">
          <div class="mr-4">
            <button @click="changeLanguage('en')" class="text-muted-foreground hover:text-primary">
              EN
            </button>
            <button @click="changeLanguage('pt')" class="text-muted-foreground hover:text-primary ml-2">
              PT
            </button>
          </div>
          <SidebarMenu />
          <button
            type="button"
            @click="toggleTheme"
            class="text-muted-foreground hover:text-primary transition-all duration-500 ml-4"
          >
            <span class="sr-only">Toggle theme</span>
            <SunIcon class="h-6 w-6" v-if="!themeStore.isDarkMode" />
            <MoonIcon class="h-6 w-6" v-else />
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { useI18n } from 'vue-i18n';
import { useThemeStore } from "../stores/themeStore";
import { SunIcon, MoonIcon } from "lucide-vue-next";
import SidebarMenu from "./SidebarMenu.vue";

export default {
  components: {
    SunIcon,
    MoonIcon,
    SidebarMenu,
  },
  setup() {
    const themeStore = useThemeStore();
    const { locale } = useI18n(); 

    const toggleTheme = () => {
      themeStore.toggleTheme();
    };

    const changeLanguage = (lang) => {
      locale.value = lang;
    };

    return {
      themeStore,
      toggleTheme,
      changeLanguage,
    };
  },
};
</script>

