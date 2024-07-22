"use client";
import {
  UserDataLogin,
  ForgotPass,
  UserDataSignup,
  ResetPass,
  User,
} from "../types/types";
import alertify from "../notifications/toast/alert_service";
import { custom_axios } from "./custom_axios";
import { AxiosError, AxiosResponse } from "axios";

export const LoginService = async (
  data: UserDataLogin
): Promise<User | AxiosError | boolean> => {
  const endpoint = "/auth/login";
  try {
    const response = await custom_axios(endpoint, {
      method: "POST",
      data: JSON.stringify(data),
    });
    alertify.success("¡Bienvenido a BeerClub!");
    if (!!response.data.user_session) {
      localStorage.setItem("user", JSON.stringify(response.data.user_session));
      return true;
    } else {
      return false;
    }
  } catch (error: any) {
    if (error.response.status >= 400) alertify.error(error.response.data.error);
    return false;
  }
};
export const SignUpService = async (data: UserDataSignup): Promise<void> => {
  try {
    const endpoint = "/auth/register";
    const response = await custom_axios(endpoint, {
      method: "POST",
      data: JSON.stringify(data),
    });
    if (response.status === 201) {
      alertify.success(
        "¡Gracias por registrarte, espera mientras cargamos todo!"
      );
      localStorage.setItem("tk_id", response.data.token);
    }
  } catch (error: any) {
    if (error.response.status >= 400 && error.response.data.error?.length > 0) {
      alertify.error(error.response.data.error);
      return;
    }
    if (error.response.data) {
      const obj = { ...error.response.data };
      for (let prop in obj) {
        const property = obj[prop];
        property.forEach((error: string) => {
          alertify.error(error);
        });
      }
    }
  }
};
export const forgotPassService = async (data: ForgotPass): Promise<void> => {
  try {
    const endpoint = "/auth/forgot-password";
    const response = await custom_axios(endpoint, {
      method: "POST",
      data: JSON.stringify(data),
    });
    if (response.status === 200) {
      alertify.success("Se envió el email para cambiar tu contraseña");
    }
  } catch (error: any) {
    if (error.response.status >= 400) alertify.error(error.response.data.error);
  }
};
export const resetPassService = async (data: ResetPass): Promise<void> => {
  try {
    const endpoint = "/auth/reset-password";
    const response = await custom_axios(endpoint, {
      method: "POST",
      data: JSON.stringify(data),
    });
    if (response.status === 200) {
      alertify.success(response.data.message);
    }
  } catch (error: any) {
    if (error.response.status >= 400) alertify.error(error.response.data.error);
    setTimeout(() => {
      window.location.href = "http://localhost:3000/";
    }, 3000);
  }
};
export const logoutService = async (): Promise<void> => {
  try {
    const endpoint = "/auth/logout";
    await custom_axios(endpoint, {
      method: "POST",
    });
    localStorage.removeItem("user");
    // remove cookie jwt
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    alertify.success("¡Hasta pronto!");
  } catch (error: any) {
    if (error.response.status >= 400) alertify.error(error.response.data.error);
  }
};
export const verifySession = async (token: string): Promise<Boolean | any> => {
  try {
    const endpoint = "/auth/verify-token/" + token;
    const response = await custom_axios(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error: any) {
    return false;
  }
};