import axios, { AxiosInstance, AxiosResponse } from "axios";

const baseUrl = "https://pokeapi.co/api/v2/";

const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  Accept: "*/*",
};


const axiosInstance: AxiosInstance = axios.create({
  method: "GET",
  baseURL: baseUrl,
  headers: headers,
});


interface ApiResponse<T> extends AxiosResponse<T> {}

export const api = {
  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return axiosInstance.get<T>(endpoint);
  },

  async post<T, R>(endpoint: string, body: T): Promise<ApiResponse<R>> {
    return axiosInstance.post<T, AxiosResponse<R>>(endpoint, body);
  },

  async put<T, R>(endpoint: string, body: T): Promise<ApiResponse<R>> {
    return axiosInstance.put<T, AxiosResponse<R>>(endpoint, body);
  },

  async delete<R>(endpoint: string): Promise<ApiResponse<R>> {
    return axiosInstance.delete<R>(endpoint);
  },
};

export default axiosInstance;
