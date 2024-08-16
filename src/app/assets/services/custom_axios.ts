'use client';
import axios from "axios";

export const custom_axios = axios.create({
  baseURL: "https://la-tribuna-front.vercel.app", // Cambia esto a tu URL base
  timeout: 10000,
  withCredentials: true,
});
