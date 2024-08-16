import axios from "axios";

export const custom_axios = axios.create({
  baseURL: "http://localhost/api/", // Cambia esto a tu URL base
  timeout: 10000,
  withCredentials: true,
});
