<template>
  <div
    v-if="isOpen && pokemon && pokemon.name"
    class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
  >
    <div class="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-3xl flex">
      <div class="flex-shrink-0 w-1/3 flex justify-center items-center">
        <img
          :src="pokemonImage"
          :alt="pokemon.name"
          class="w-full h-auto object-cover rounded-lg"
        />
      </div>
      <div class="w-2/3 pl-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-2xl font-bold text-primary capitalize">
            {{ pokemon.name }} (#{{ pokemon.id }})
          </h3>
          <button @click="closeModal" class="text-gray-500 hover:text-gray-700">
            &times;
          </button>
        </div>
        <div class="mb-4">
          <h4 class="font-semibold mb-2 text-[#3d3d3d] dark:text-white">
            Types:
          </h4>
          <div class="flex space-x-2">
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
          <h4 class="font-semibold mb-2 text-[#3d3d3d] dark:text-white">
            Statistics:
          </h4>
          <div v-for="(stat, index) in pokemon.stats" :key="index" class="mb-2">
            <span
              class="block text-muted-foreground dark:text-muted-darkForeground"
              >{{ stat.name }}: {{ stat.value }}</span
            >
            <div class="w-full bg-gray-300 rounded-full h-2">
              <div
                class="bg-primary dark:bg-primary-dark h-2 rounded-full transition-all duration-500 ease-out"
                :style="{ width: `${(stat.value / 255) * 100}%` }"
              ></div>
            </div>
          </div>
        </div>
        <div v-if="evolutionChain.length" class="mb-4">
          <h4 class="font-semibold mb-2 text-black dark:text-white">Evolution Chain:</h4>
          <div class="flex items-center space-x-4">
            <div
              v-for="evolution in evolutionChain"
              :key="evolution.name"
              class="flex flex-col items-center p-6 w-[120px] rounded-xl bg-background dark:bg-background-dark cursor-pointer shadow-xl hover:scale-105 hover:shadow-2xl transition-transform duration-300 ease-in-out"
            >
              <img
                :src="evolution.image"
                :alt="evolution.name"
                class="w-16 h-16 object-cover rounded-full mb-1"
              />
              <span class="text-primary capitalize italic text-base ">{{ evolution.name }}</span>
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
  emits: ["onClose"],
  
  setup(props, { emit }) {
    const evolutionChain = ref([]);
    
    const pokemonImage = computed(() => {
      return props.pokemon && props.pokemon.name
        ? `https://img.pokemondb.net/sprites/home/normal/${props.pokemon.name}.png`
        : "";
    });

    const fetchEvolutionData = async () => {
      if (!props.pokemon || !props.pokemon.name) return;

      try {
        console.log("Fetching evolution data for:", props.pokemon.name);
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon-species/${props.pokemon.name}`
        );
        const data = response.data;

        if (data.evolution_chain) {
          const evolutionResponse = await axios.get(data.evolution_chain.url);
          evolutionChain.value = extractEvolutions(evolutionResponse.data);
        } else {
          console.warn("No evolution chain found for this Pokémon.");
        }
      } catch (error) {
        console.error("Error fetching Pokémon Species to Chain:", error);
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

    // Verificação das mudanças em pokemon e isOpen
    watch(
      () => [props.pokemon, props.isOpen], // Monitorar pokemon e isOpen juntos
      ([newPokemon, newIsOpen]) => {
        if (newIsOpen && newPokemon && newPokemon.name) {
          fetchEvolutionData(); // Executa a busca quando o modal abre e pokemon está disponível
        }
      },
      { immediate: true } // Executa imediatamente para garantir a verificação inicial
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
