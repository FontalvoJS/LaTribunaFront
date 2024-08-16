'use client';
import axios from "axios";

let baseURL = "";

if (typeof window !== "undefined") {
  baseURL = window.location.origin + "/api/";
} else {
  // Puedes definir una URL base alternativa para el entorno del servidor si es necesario
  baseURL = "http://localhost/api/";
}

export const custom_axios = axios.create({
  baseURL: baseURL, // URL base dinámica
  timeout: 10000,
  withCredentials: true,
});