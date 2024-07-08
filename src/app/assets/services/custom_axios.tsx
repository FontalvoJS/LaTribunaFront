import axios from "axios";

export const custom_axios = axios.create({
  baseURL: "http://localhost:3000/api/", // Cambia esto a tu URL base
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});
