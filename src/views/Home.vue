<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Searchbar from '../components/Searchbar.vue';
import Card from '../components/Card.vue';
import { api } from '../composables/services.ts'; // Importe o serviço

// Definindo um tipo para o Pokémon
interface Pokemon {
  name: string;
  url: string;
}

// Array reativo para armazenar os Pokémon
const pokemons = ref<Pokemon[]>([]);

// Função para buscar Pokémon
const fetchPokemons = async () => {
  try {
    const response = await api.get<Pokemon[]>('pokemon'); // Faz a requisição
    pokemons.value = response.data.results; // Armazena os resultados
  } catch (error) {
    console.error('Erro ao buscar Pokémon:', error);
  }
};

// Chama a função quando o componente é montado
onMounted(() => {
  fetchPokemons();
});
</script>

<template>
  <div class="mt-8 px-4 md:p-0">
    <Searchbar />
  </div>
  <div class="my-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-y-4">
    <Card v-for="(pokemon, index) in pokemons" :key="index" :name="pokemon.name" :url="pokemon.url" />
  </div>
</template>
