<template>
  <div class="mt-8 px-4 md:p-0">
    <Searchbar v-model="searchParams" />
  </div>
  <div class="my-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-y-4">
    <Card
      v-for="(pokemon, index) in filteredPokemons"
      :key="index"
      :name="pokemon.name"
      :url="pokemon.url"
    />
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import Searchbar from "../components/Searchbar.vue";
import Card from "../components/Card.vue";
import { api } from "../composables/services.ts";
interface Pokemon {
  name: string;
  url: string;
  types: string[];
}
const pokemons = ref<Pokemon[]>([]);
const filteredPokemons = ref<Pokemon[]>([]);
const searchParams = ref({ query: "", type: "" });
const allTypes = ref<string[]>([]);

const fetchPokemons = async () => {
  try {
    const response = await api.get<Pokemon[]>("pokemon");
    pokemons.value = response.data.results.map(pokemon => ({
      ...pokemon,
      types: [] 
    }));
    filteredPokemons.value = [...pokemons.value]; 
  } catch (error) {
    console.error("Error fetching Pokémon:", error);
  }
};
const handleTypesLoaded = (types: string[]) => {
  allTypes.value.push(...types);
  console.log("teste",allTypes.value)
};
const filterPokemons = () => {
  const { query, type } = searchParams.value;
  const normalizedQuery = query.toLowerCase();

  filteredPokemons.value = pokemons.value.filter((pokemon) => {
    const matchesQuery = pokemon.name.toLowerCase().includes(normalizedQuery);
    return matchesQuery;
  });
};

onMounted(() => {
  fetchPokemons();
});
watch(searchParams, () => {
  filterPokemons(); 
});
</script>
