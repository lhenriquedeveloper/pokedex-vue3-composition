<template>
  <div class="mt-8 px-4 md:p-0">
    <Searchbar @filter="onFilter" @clear="onClear" />
    <div v-if="loading" class="flex justify-center items-center mt-4">
      <span>Loading...</span>
    </div>
  </div>
  <div
    v-if="!loading"
    class="my-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-y-4"
  >
    <Card
      v-for="(pokemon, index) in filteredPokemons"
      :key="index"
      :name="pokemon.name"
      :url="pokemon.url"
    />
  </div>
  <div class="flex justify-center mt-4">
    <button @click="loadMore" class="btn-show-more" :disabled="loading || isAllLoaded">
      Show More
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import Searchbar from "../components/Searchbar.vue";
import Card from "../components/Card.vue";
import { getPokemons } from "../composables/services.ts";

interface Pokemon {
  name: string;
  url: string;
}

const pokemons = ref<Pokemon[]>([]);
const filteredPokemons = ref<Pokemon[]>([]);
const searchParams = ref({ query: "", type: "" });
const loading = ref(false);
const offset = ref(0); // Para rastrear o deslocamento atual
const limit = 20; // Número de Pokémons por vez
const isAllLoaded = ref(false); // Para rastrear se todos os Pokémons foram carregados




const fetchPokemons = async () => {
  try {
    loading.value = true;
    const response = await getPokemons(offset.value, limit); // Passa offset e limit
    const newPokemons = response.data.results.map((pokemon) => ({
      ...pokemon,
    }));

    // Se não houver novos Pokémons, desabilita o botão de carregar mais
    if (newPokemons.length < limit) {
      isAllLoaded.value = true;
    }

    pokemons.value.push(...newPokemons); // Adiciona novos Pokémons ao array existente;
    filterPokemons(); // Chama a função de filtro após carregar novos Pokémons
  } catch (error) {
    console.error("Error fetching Pokémon:", error);
  } finally {
    loading.value = false;
  }
};

const filterPokemons = () => {
  const query = searchParams.value.query.toLowerCase();

  filteredPokemons.value = pokemons.value.filter((pokemon) => {
    const matchesName = pokemon.name.toLowerCase().includes(query);
    const matchesId = pokemon.url.includes(query);
    return matchesName || matchesId;
  }).slice(0, offset.value + limit); // Aplica filtro e paginação
};

const onFilter = async (params: { query: string; type: string }) => {
  searchParams.value = params;
  loading.value = true;
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulando carregamento
  filterPokemons();
  loading.value = false;
};

const onClear = () => {
  searchParams.value = { query: "", type: "" };
  filteredPokemons.value = [...pokemons.value].slice(0, offset.value + limit); // Reseta a lista filtrada
};

const loadMore = () => {
  offset.value += limit; // Incrementa o offset
  fetchPokemons(); // Busca mais Pokémons
};

onMounted(() => {
  fetchPokemons();
});
</script>

<style scoped>
.btn-show-more {
  background-color: #3b82f6; /* Cor de fundo */
  color: white; /* Cor do texto */
  padding: 8px 16px; /* Espaçamento */
  border: none; /* Sem borda */
  border-radius: 4px; /* Bordas arredondadas */
  cursor: pointer; /* Mão ao passar o mouse */
  transition: background-color 0.3s; /* Transição suave */
}

.btn-show-more:hover {
  background-color: #2563eb; /* Cor de fundo ao passar o mouse */
}
</style>
