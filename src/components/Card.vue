<template>
  <div class="max-w-sm mx-auto">
    <div
      class="bg-background cursor-pointer dark:bg-background-dark rounded-lg overflow-hidden shadow-lg ease-in-out transform hover:scale-105 hover:shadow-xl duration-500 transition-all"
      @click="() => openModal()"
    >
      <div class="relative">
        <img
          :src="pokemon.image"
          :alt="pokemon.name"
          class="w-full h-48 object-cover object-center"
        />
        <div
          class="absolute top-0 right-0 bg-primary dark:bg-primary-dark text-white px-2 py-1 rounded-bl-lg font-semibold text-sm"
        >
          #{{ pokemon.id }}
        </div>
      </div>
      <div class="p-4">
        <h2 class="text-2xl font-bold text-primary dark:text-primary-dark mb-2">
          {{ pokemon.name }}
        </h2>
        <div class="flex space-x-2 mb-4">
          <span
            v-for="type in pokemon.types"
            :key="type"
            class="px-2 py-1 rounded-full text-xs font-semibold text-white"
            :class="getTypeColor(type)"
          >
            {{ type }}
          </span>
        </div>
        <div class="grid grid-cols-2 gap-4 text-sm">
          <div
            v-for="(stat, index) in pokemon.stats"
            :key="index"
            class="flex flex-col"
          >
            <span
              class="text-muted-foreground dark:text-muted-darkForeground"
              >{{ stat.name }}</span
            >
            <div class="w-full bg-accent dark:bg-accent-dark rounded-full h-2">
              <div
                class="bg-primary dark:bg-primary-dark h-2 rounded-full transition-all duration-500 ease-out"
                :style="{ width: `${(stat.value / 255) * 100}%` }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <PokemonModal
      :pokemon="pokemon"
      :isOpen="isModalOpen"
      @onClose="closeModal"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import PokemonModal from "./PokemonModal.vue";
import { getTypeColor } from "../composables/utils/getTypeColor.ts";

const props = defineProps({
  name: String,
  url: String,
});

const pokemon = ref({
  id: null,
  name: "",
  image: "",
  types: [],
  stats: [],
});

const isModalOpen = ref(false);

const fetchPokemonData = async () => {
  try {
    const response = await axios.get(props.url);
    const data = response.data;
    pokemon.value.id = data.id;
    pokemon.value.name = data.name;
    pokemon.value.image = data.sprites.front_default;
    pokemon.value.types = data.types.map((typeInfo) => typeInfo.type.name);
    pokemon.value.stats = data.stats.map((statInfo) => ({
      name: statInfo.stat.name,
      value: statInfo.base_stat,
    }));
  } catch (error) {
    console.error("Error fetching Pokémon data:", error);
  }
};

const openModal = () => {
  console.log("Modal Opened");
  isModalOpen.value = true;
  console.log("isModalOpen", isModalOpen.value);
};

const closeModal = () => {
  isModalOpen.value = false;
};

onMounted(fetchPokemonData);
</script>
