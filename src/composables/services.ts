import axios, { AxiosInstance, AxiosResponse } from "axios";

// Define the base API URL
export const API_URL = "https://pokeapi.co/api/v2";

// Create a typed API client
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
  value: { id: number; name: string; }[];
  results: Pokemon[];
}


export interface Type {
  id: number;
  name: string;
}


// Get all Pokémon
export const getAllPokemons = (): Promise<AxiosResponse<PokemonResponse>> => {
  return API().get<PokemonResponse>("/pokemon?limit=-1");
};

// Get Pokémon (with limit)
export const getPokemons = (offset: number, limit: number): Promise<AxiosResponse<PokemonResponse>> => {
  return API().get<PokemonResponse>(`/pokemon?offset=${offset}&limit=${limit}`);
};

// Get Pokémon by name
export const getPokemonByName = (name: string): Promise<AxiosResponse<Pokemon>> => {
  return API().get<Pokemon>(`/pokemon/${name}`);
};

// Get type by name
export const getTypeByName = (name: string): Promise<AxiosResponse<Type>> => {
  return API().get<Type>(`/type/${name}`);
};
