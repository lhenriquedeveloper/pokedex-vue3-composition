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

export const getAllPokemons = (): Promise<AxiosResponse<PokemonResponse>> => {
  return API().get<PokemonResponse>("/pokemon?limit=-1");
};

export const getPokemons = (
  offset: number,
  limit: number
): Promise<AxiosResponse<PokemonResponse>> => {
  return API().get<PokemonResponse>(`/pokemon?offset=${offset}&limit=${limit}`);
};

export const getPokemonByName = (
  name: string
): Promise<AxiosResponse<Pokemon>> => {
  return API().get<Pokemon>(`/pokemon/${name}`);
};

export const getTypeByName = (name: string): Promise<AxiosResponse<Type>> => {
  return API().get<Type>(`/type/${name}`);
};
