import {
  UserDataLogin,
  ForgotPass,
  UserDataSignup,
  ResetPass,
} from "../types/types";
import alertify from "../notifications/toast/alert_service";
import axios from "axios";
import { AxiosError } from "axios";

const custom_axios = axios.create({
  baseURL: "http://localhost:3000/api/auth/", // Cambia esto a tu URL base
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
custom_axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
const welcome = {
  messages: [
    "¡Qué alegría tenerte de vuelta! 🤙",
    "¡Wuuu, regresaste! Bienvenido 🤙",
    "¡Epa, casi no vuelves! 🤙",
  ],
};

const messageSelected =
  welcome.messages[Math.floor(Math.random() * welcome.messages.length)];

export const LoginService = async (
  data: UserDataLogin
): Promise<void | AxiosError> => {
  const endpoint = "login";
  try {
    const response = await custom_axios(endpoint, {
      method: "POST",
      data: JSON.stringify(data),
    });
    if (response.status === 200) {
      alertify.success(messageSelected);
      localStorage.setItem("token", response.data.token);
    }
  } catch (error: any) {
    if (error.response.status > 400) alertify.error(error.response.data.error);
  }
};
export const SignUpService = async (data: UserDataSignup): Promise<void> => {
  try {
    const endpoint = "register";
    const response = await custom_axios(endpoint, {
      method: "POST",
      data: JSON.stringify(data),
    });
    if (response.status === 201) {
      alertify.success(
        "¡Gracias por registrarte, espera mientras cargamos todo!"
      );
      localStorage.setItem("token", response.data.token);
    }
  } catch (error: any) {
    console.log(error);
    if (error.response.status > 400) alertify.error(error.response.data.error);
  }
};
export const forgotPassService = async (data: ForgotPass): Promise<void> => {
  try {
    const endpoint = "forgot-password";
    const response = await custom_axios(endpoint, {
      method: "POST",
      data: JSON.stringify(data),
    });
    if (response.status === 200) {
      alertify.success(response.data.message);
    }
  } catch (error: any) {
    if (error.response.status > 400) alertify.error(error.response.data.error);
  }
};
export const resetPassService = async (data: ResetPass): Promise<void> => {
  const endpoint = "reset-password";
  const response = await custom_axios(endpoint, {
    method: "POST",
    data: JSON.stringify(data),
  });
  if (response?.status === 200) {
    alertify.success("Tu contraseña ha sido restablecida");
  } else {
    alertify.error(response?.data.message);
  }
};


