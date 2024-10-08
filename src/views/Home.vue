<template>
  <div class="mt-8 px-4 md:p-0">
    <Searchbar @filter="onFilter" @clear="onClear" />
    <div v-if="loading" class="flex justify-center items-center mt-4">
      <Loading />
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
    <button
      @click="loadMore"
      class="m-4 p-2 bg-primary-dark align-middle justify-center flex flex-row w-64 items-center shadow-xl text-white rounded hover:opacity-75 transition-all duration-500"
      :disabled="loading || isAllLoaded"
    >
    {{ $t('ShowMore') }} <ChevronDown />
    </button>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from "vue";
import Searchbar from "../components/Searchbar.vue";
import Card from "../components/Card.vue";
import Loading from "../components/Loading.vue";
import { getPokemons } from "../composables/services.ts";
import { ChevronDown } from "lucide-vue-next";

interface Pokemon {
  name: string;
  url: string;
}

export default {
  components: {
    Searchbar,
    Card,
    Loading,
    ChevronDown,
  },
  setup() {
    const pokemons = ref<Pokemon[]>([]);
    const filteredPokemons = ref<Pokemon[]>([]);
    const searchParams = ref({ query: "", type: "" });
    const loading = ref(false);
    const offset = ref(0);
    const limit = 20;
    const isAllLoaded = ref(false);

    const fetchPokemons = async () => {
      try {
        loading.value = true;
        const response = await getPokemons(offset.value, limit);
        const newPokemons: any = response.data.results.map((pokemon) => ({
          ...pokemon,
        }));

        if (newPokemons.length < limit) {
          isAllLoaded.value = true;
        }

        pokemons.value.push(...newPokemons);
        filterPokemons();
      } catch (error) {
        console.error("Error fetching Pokémon:", error);
      } finally {
        loading.value = false;
      }
    };

    const filterPokemons = () => {
      const query = searchParams.value.query.toLowerCase();

      filteredPokemons.value = pokemons.value
        .filter((pokemon) => {
          const matchesName = pokemon.name.toLowerCase().includes(query);
          const matchesId = pokemon.url.includes(query);
          return matchesName || matchesId;
        })
        .slice(0, offset.value + limit);
    };

    const onFilter = async (params: { query: string; type: string }) => {
      searchParams.value = params;
      loading.value = true;
      await new Promise((resolve) => setTimeout(resolve, 1000));
      filterPokemons();
      loading.value = false;
    };

    const onClear = () => {
      searchParams.value = { query: "", type: "" };
      filteredPokemons.value = [...pokemons.value].slice(
        0,
        offset.value + limit
      );
    };

    const loadMore = () => {
      offset.value += limit;
      fetchPokemons();
    };

    onMounted(() => {
      fetchPokemons();
    });

    return {
      pokemons,
      filteredPokemons,
      searchParams,
      loading,
      isAllLoaded,
      onFilter,
      onClear,
      loadMore,
    };
  },
};
</script>
