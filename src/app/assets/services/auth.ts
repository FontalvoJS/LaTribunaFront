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
import { returnToHome } from "./posts";

export const LoginService = async (
  data: UserDataLogin
): Promise<any | boolean> => {
  const endpoint = "/auth/login";
  try {
    const response = await custom_axios(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      data: JSON.stringify(data),
    });
    if (!!response.data.user_session) {
      localStorage.setItem("user", JSON.stringify(response.data.user_session));
      alertify.success("¡Bienvenido a La Tribuna!");
      return true;
    }
  } catch (error: any) {
    alertify.error(error.response.data.error);
    return false;
  }
};
export const SignUpService = async (data: UserDataSignup): Promise<boolean | void> => {
  try {
    const endpoint = "/auth/register";
    const response = await custom_axios(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      data: JSON.stringify(data),
    });
    if (response.status === 202) {
      alertify.success(
        "¡Validamos tu información, solo debes confirmar el correo.!"
      );
      return true;
    } else {
      false
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
    return false;
  }
};
export const forgotPassService = async (data: ForgotPass): Promise<void> => {
  try {
    const endpoint = "/auth/forgot-password";
    const response = await custom_axios(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      data: JSON.stringify(data),
    });
    if (response.status === 200) {
      alertify.success("Se envió el email para cambiar tu contraseña");
    }
  } catch (error: any) {
    returnToHome(error);
  }
};
export const resetPassService = async (data: ResetPass): Promise<void> => {
  try {
    const endpoint = "/auth/reset-password";
    const response = await custom_axios(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      data: JSON.stringify(data),
    });
    if (response.status === 200) {
      alertify.success(response.data.message);
    }
  } catch (error: any) {
    returnToHome(error);
  }
};
export const logoutService = async (): Promise<void> => {
  try {
    const endpoint = "/auth/logout";
    await custom_axios(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
    });
    localStorage.removeItem("user");
    alertify.success("¡Hasta pronto!");
  } catch (error: any) {
    returnToHome(error);
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
export const generateTokenForEmailService = async (data: string): Promise<Boolean | any> => {
  try {
    const endpoint = `/auth/generate-token/${data}`;
    const response = await custom_axios(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: JSON.stringify(data),
    });
    if (response.status === 200) {
      alertify.success(response.data.message);
    }
    return true;
  } catch (error: any) {
    alertify.error(error.response.data.error);
    return false;
  }
}
export const verifyEmailService = async (token: string, data: UserDataSignup): Promise<Boolean | any> => {
  try {
    const endpoint = `/auth/verify-email/`;
    const dataToSend = {
      token: token,
      ...data
    };
    const response = await custom_axios(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: dataToSend
    });
    if (response.status === 201) {
      alertify.success(response.data.message);
      return true;
    }
  } catch (error: any) {
    alertify.error(error.response.data.error);
    return false;
  }
}