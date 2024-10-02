<template>
  <div
    v-if="isOpen && pokemon && pokemon.name"
    class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4 lg:px-8"
  >
    <div
      class="bg-background dark:bg-gray-800 rounded-lg p-4 sm:p-6 w-full max-w-xl sm:max-w-2xl lg:max-w-3xl flex flex-col lg:flex-row"
    >
      <div
        class="w-full lg:w-1/3 flex justify-center items-center mb-4 lg:mb-0"
      >
        <img
          :src="pokemonImage"
          :alt="pokemon.name"
          class="hidden lg:block w-full h-auto object-cover rounded-lg"
        />
      </div>
      <div class="w-full lg:w-2/3 lg:pl-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl sm:text-2xl font-bold text-primary capitalize">
            {{ pokemon.name }} (#{{ pokemon.id }})
          </h3>
          <button @click="closeModal" class="text-gray-500 hover:text-gray-700">
            &times;
          </button>
        </div>
        <div class="mb-4">
          <h4
            class="font-bold text-base mb-2 text-gray-900 dark:text-white flex items-center"
          >
          {{ $t('types') }} <TypeOutline class="ml-2" />
          </h4>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="type in pokemon.types"
              :key="type"
              class="px-2 py-1 rounded-full text-xs font-semibold text-white"
              :class="getTypeColor(type)"
            >
              {{ type }}
            </span>
          </div>
        </div>
        <div class="mb-4">
          <h4
            class="font-bold text-base mb-2 text-gray-900 dark:text-white flex items-center"
          >
          {{ $t('Statistics') }} <ChartNoAxesColumnDecreasing class="ml-2" />
          </h4>
          <div v-for="(stat, index) in pokemon.stats" :key="index" class="mb-2">
            <span class="block text-sm text-gray-600 dark:text-gray-300">
              {{ stat.name }}: {{ stat.value }}
            </span>
            <div class="w-full bg-gray-300 rounded-full h-2">
              <div
                class="bg-primary dark:bg-primary-dark h-2 rounded-full transition-all duration-500"
                :style="{ width: `${(stat.value / 255) * 100}%` }"
              ></div>
            </div>
          </div>
        </div>
        <div v-if="evolutionChain.length" class="mb-4">
          <h4
            class="font-bold text-base mb-2 text-black dark:text-white flex items-center"
          >
          {{ $t('EvolutionChain') }} <Link class="ml-2" />
          </h4>
          <div
            class="flex flex-col space-y-4 sm:space-y-2 sm:flex-wrap items-center justify-center"
          >
            <div
              v-for="evolution in evolutionChain"
              :key="evolution.name"
              class="flex items-center w-full p-2 transition-all duration-300 relative overflow-hidden shadow-lg cursor-pointer bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-300 hover:shadow-xl hover:scale-105 rounded-lg"
            >
              <img
                :src="evolution.image"
                :alt="evolution.name"
                class="w-12 h-12 sm:w-16 sm:h-16 object-contain rounded-full bg-gray-200 dark:bg-gray-700 border-2 sm:border-4 border-indigo-500 dark:border-indigo-300 z-10"
              />

              <span
                class="ml-4 capitalize text-lg sm:text-xl font-semibold italic"
              >
                {{ evolution.name }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from "vue";
import { getTypeColor } from "../composables/utils/getTypeColor.ts";
import axios from "axios";
import {
  Link,
  ChartNoAxesColumnDecreasing,
  TypeOutline,
} from "lucide-vue-next";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

export default {
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    pokemon: {
      type: Object,
      required: true,
    },
  },
  components: {
    Link,
    ChartNoAxesColumnDecreasing,
    TypeOutline,
  },
  emits: ["onClose"],

  setup(props, { emit }) {
    const $toast = useToast();

    const evolutionChain = ref([]);

    const pokemonImage = computed(() => {
      return props.pokemon && props.pokemon.name
        ? `https://img.pokemondb.net/sprites/home/normal/${props.pokemon.name}.png`
        : "";
    });

    const fetchEvolutionData = async () => {
      if (!props.pokemon || !props.pokemon.name) return;

      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon-species/${props.pokemon.name}`
        );
        const data = response.data;

        if (data.evolution_chain) {
          const evolutionResponse = await axios.get(data.evolution_chain.url);
          evolutionChain.value = extractEvolutions(evolutionResponse.data);
        } else {
          console.warn("No evolution chain found for this Pokémon.");
          let instaceWarn = $toast.info(
            "No evolution chain found for this Pokémon."
          );
        }
      } catch (error) {
        console.error("Error fetching Pokémon Species to Chain:", error);
        let instaceError = $toast.error(
          "Error fetching Pokémon Species to Chain."
        );
      }
    };

    const extractEvolutions = (data) => {
      const evolutions = [];
      const addedEvolutions = new Set();

      if (data.chain) {
        let current = data.chain;
        if (current.species) {
          evolutions.push({
            name: current.species.name,
            image: `https://img.pokemondb.net/sprites/home/normal/${current.species.name}.png`,
          });
          addedEvolutions.add(current.species.name);
        }
        const addEvolutions = (chain) => {
          chain.evolves_to.forEach((evolution) => {
            if (!addedEvolutions.has(evolution.species.name)) {
              evolutions.push({
                name: evolution.species.name,
                image: `https://img.pokemondb.net/sprites/home/normal/${evolution.species.name}.png`,
              });
              addedEvolutions.add(evolution.species.name);
              addEvolutions(evolution);
            }
          });
        };
        addEvolutions(current);
      }
      return evolutions;
    };
    watch(
      () => [props.pokemon, props.isOpen],
      ([newPokemon, newIsOpen]) => {
        if (newIsOpen && newPokemon && newPokemon.name) {
          fetchEvolutionData();
        }
      },
      { immediate: true }
    );
    const closeModal = () => {
      emit("onClose");
    };
    return {
      evolutionChain,
      pokemonImage,
      fetchEvolutionData,
      closeModal,
      getTypeColor,
    };
  },
};
</script>
<style scoped>
.bg-white {
  background-color: #ffffff;
}
.text-gray-900 {
  color: #1f2937;
}
.hover\:scale-105:hover {
  transform: scale(1.05);
}

.dark .bg-gray-800 {
  background-color: #2d3748;
}
.dark .text-gray-300 {
  color: #e2e8f0;
}
.dark .bg-gray-900 {
  background-color: #1a202c;
}
.dark .border-indigo-300 {
  border-color: #818cf8;
}

.transition-all {
  transition: all 0.3s ease-in-out;
}
</style>
