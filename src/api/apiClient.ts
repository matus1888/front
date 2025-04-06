import axios from "axios";

export const baseURL = "http://192.168.1.43:4000";
export const apiClient = axios.create({
  //TODO to env params
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwtToken"); // Получаем токен из localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Добавляем токен в заголовок
  }
  return config;
});
