import axios, { AxiosInstance, AxiosResponse } from "axios";

export const API_URL = "https://pokeapi.co/api/v2";

const API = (url = API_URL): AxiosInstance => {
  return axios.create({
    baseURL: url,
  });
};

export interface Pokemon {
  id: number;
  name: string;
}

export interface PokemonResponse {
  value: { id: number; name: string }[];
  results: Pokemon[];
}

export interface Type {
  id: number;
  name: string;
}

export const getAllPokemons = async (): Promise<
  AxiosResponse<PokemonResponse>
> => {
  try {
    return await API().get<PokemonResponse>("/pokemon?limit=-1");
  } catch (error) {
    console.error("Error fetching all Pokémon data:", error);
    throw error;
  }
};

export const getPokemons = async (
  offset: number,
  limit: number
): Promise<AxiosResponse<PokemonResponse>> => {
  try {
    return await API().get<PokemonResponse>(
      `/pokemon?offset=${offset}&limit=${limit}`
    );
  } catch (error) {
    console.error(
      `Error fetching Pokémon list (offset: ${offset}, limit: ${limit}):`,
      error
    );
    throw error;
  }
};

export const getPokemonByName = async (
  name: string
): Promise<AxiosResponse<Pokemon>> => {
  try {
    return await API().get<Pokemon>(`/pokemon/${name}`);
  } catch (error) {
    console.error(`Error fetching Pokémon: ${name}:`, error);
    throw error;
  }
};

export const getTypeByName = async (
  name: string
): Promise<AxiosResponse<Type>> => {
  try {
    return await API().get<Type>(`/type/${name}`);
  } catch (error) {
    console.error(`Error fetching Pokémon type: ${name}:`, error);
    throw error;
  }
};
