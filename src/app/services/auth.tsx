import csrf_fetch from "./csrfToken";
import { UserDataLogin, forgotPass, UserDataSignup } from "../types/types";
import alertify from "../notifications/toast/alert_service";

const welcome = {
  messages: [
    "¡Qué alegría tenerte de vuelta! 🤙",
    "¡Wuuu, regresaste! Bienvenido 🤙",
    "¡Epa, casi no vuelves! 🤙",
  ],
};

const messageSelected =
  welcome.messages[Math.floor(Math.random() * welcome.messages.length)];

export const LoginService = async (data: UserDataLogin): Promise<void> => {
  const endpoint = "login";
  const response = await csrf_fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    data: JSON.stringify(data),
  });
  if (response?.status === 200 && response.data.success === true) {
    alertify.success(messageSelected);
  } else {
    alertify.error(response?.data.message);
  }
};
export const SignUpService = async (data: UserDataSignup): Promise<void> => {
  const endpoint = "register";
  const response = await csrf_fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    data: JSON.stringify(data),
  });
  if (response?.status === 200) {
    alertify.success(
      "¡Gracias por registrarte, espera mientras cargamos todo!"
    );
  } else {
    alertify.error(response?.data.message);
  }
};
export const forgotPassService = async (data: forgotPass): Promise<void> => {
  const endpoint = "forgot-password";
  const response = await csrf_fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    data: JSON.stringify(data),
  });
  if (response?.status === 200) {
    alertify.success(
      "Revisa el correo que te mandamos para restablecer tu contraseña"
    );
  } else {
    alertify.error(response?.data.message);
  }
};
export const resetPassService = async (data: forgotPass): Promise<void> => {
  const endpoint = "reset-password";
  const response = await csrf_fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    data: JSON.stringify(data),
  });
  if (response?.status === 200) {
    alertify.success("Tu contraseña ha sido restablecida");
  } else {
    alertify.error(response?.data.message);
  }
};
