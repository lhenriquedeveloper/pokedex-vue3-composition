<template>
  <div class="flex flex-col items-center align-middle justify-center">
    <div class="relative max-w-md mx-auto w-full">
      <input
        type="text"
        v-model="internalSearchQuery.query"
        placeholder="Search by name or ID.."
        class="shadow-xl w-full py-2 pl-10 pr-4 text-muted-foreground bg-background border-2 border-accent rounded-full focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition-all duration-300 ease-in-out"
      />
    </div>
    <div class="flex flex-row">
      <button
        @click="updateSearchQuery"
        class="mt-4 p-2 bg-primary flex flex-row w-24 shadow-xl text-white rounded hover:opacity-75 transition-all duration-500"
      >
        <Search class="mr-2" /> Search
      </button>
      <button
        @click="clearSearch"
        class="mt-4 ml-2 p-2 bg-accent-dark shadow-xl dark:bg-white dark:text-accent-dark w-24 flex flex-row text-white rounded hover:opacity-75 transition-all duration-500"
      >
        <CircleX class="mr-2" /> Clear
      </button>
    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import { pokemonTypes } from "../composables/utils/types";
import { Search, CircleX } from "lucide-vue-next";

export default {
  components: {
    Search,
    CircleX,
  },
  emits: ["filter", "clear"],
  setup(props, { emit }) {
    const internalSearchQuery = ref({
      query: "",
      type: "",
    });

    const emitFilter = () => {
      emit("filter", {
        query: internalSearchQuery.value.query,
        type: internalSearchQuery.value.type,
      });
    };

    const updateSearchQuery = () => {
      emitFilter();
    };

    const clearSearch = () => {
      internalSearchQuery.value.query = "";
      internalSearchQuery.value.type = "";
      emit("clear"); 
    };

    return {
      internalSearchQuery,
      updateSearchQuery,
      clearSearch,
      pokemonTypes,
    };
  },
};
</script>
