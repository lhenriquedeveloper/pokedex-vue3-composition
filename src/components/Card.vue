<template>
  <div class="max-w-sm mx-auto">
    <div 
      class="bg-background dark:bg-background-dark rounded-lg overflow-hidden shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
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
        <h2 class="text-2xl font-bold text-primary dark:text-primary-dark mb-2">{{ pokemon.name }}</h2>
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
          <div v-for="(stat, index) in pokemon.stats" :key="index" class="flex flex-col">
            <span class="text-muted-foreground dark:text-muted-darkForeground">{{ stat.name }}</span>
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
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios' // Certifique-se de ter axios instalado

const props = defineProps({
  name: String,
  url: String,
})

const pokemon = ref({
  id: null,
  name: '',
  image: '',
  types: [],
  stats: []
});

// Função para buscar dados do Pokémon
const fetchPokemonData = async () => {
  try {
    const response = await axios.get(props.url); // Faz a requisição para a URL completa
    const data = response.data;

    // Extrai os dados relevantes
    pokemon.value.id = data.id;
    pokemon.value.name = data.name;
    pokemon.value.image = data.sprites.front_default; // Imagem do Pokémon
    pokemon.value.types = data.types.map(typeInfo => typeInfo.type.name); // Tipos do Pokémon
    pokemon.value.stats = data.stats.map(statInfo => ({
      name: statInfo.stat.name,
      value: statInfo.base_stat
    })); // Stats do Pokémon
  } catch (error) {
    console.error('Error fetching Pokémon data:', error);
  }
}

// Chama a função ao montar o componente
onMounted(fetchPokemonData);

const getTypeColor = (type) => {
  const colors = {
    normal: 'bg-gray-400',
    fire: 'bg-red-500',
    water: 'bg-blue-500',
    electric: 'bg-yellow-400',
    grass: 'bg-green-500',
    ice: 'bg-blue-300',
    fighting: 'bg-red-600',
    poison: 'bg-purple-500',
    ground: 'bg-yellow-600',
    flying: 'bg-indigo-400',
    psychic: 'bg-pink-500',
    bug: 'bg-green-400',
    rock: 'bg-yellow-700',
    ghost: 'bg-purple-600',
    dragon: 'bg-indigo-600',
    dark: 'bg-gray-700',
    steel: 'bg-gray-400',
    fairy: 'bg-pink-300'
  }
  return colors[type.toLowerCase()] || 'bg-gray-500'
}
</script>
