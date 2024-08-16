import axios from "axios";

export const custom_axios = axios.create({
  baseURL: "localhost/api/", // Cambia esto a tu URL base
  timeout: 10000,
  withCredentials: true,
});
