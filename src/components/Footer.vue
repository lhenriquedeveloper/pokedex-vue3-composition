<template>
  <footer
    class="bg-background dark:bg-background-dark text-muted-foreground dark:text-muted-darkForeground"
  >
    <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <div class="flex items-center space-x-2 mb-4 md:mb-0">
          <img src="../assets/pokeballs.png" class="w-8" alt="PokedexIcon">
          <span class="text-primary dark:text-primary-dark font-bold text-xl"
            >Pokedex</span
          >
        </div>
        <div class="flex flex-col items-center md:items-end space-y-2">
          <p class="text-sm flex flex-row gap-x-2">
            {{ $t('footer') }}
            <HeartIcon
              class="w-5 h-5 text-primary dark:text-primary-dark animate-pulse"
            />
            {{ $t('by') }}
            <a
              href="https://github.com/lhenriquedeveloper"
              class="font-semibold text-primary dark:text-primary-dark hover:underline transition-colors duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              lhenriquedeveloper
            </a>
          </p>
          <p class="text-sm">&copy; {{ currentYear }} {{ $t('arr') }}.</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { ref, onMounted } from "vue";
import { HeartIcon } from "lucide-vue-next";

export default {
  components: {
    HeartIcon,
  },
  setup() {
    const currentYear = ref(new Date().getFullYear());

    onMounted(() => {
      setInterval(() => {
        currentYear.value = new Date().getFullYear();
      }, 60000);
    });

    return {
      currentYear,
    };
  },
};
</script>

