import csrf_fetch from "./csrfToken";
import { UserDataLogin } from "../types/types";
import { AxiosResponse } from "axios";
import alertify from "../notifications/toast/alert_service";
interface AxioObjectError {
  message: string;
  errors: {};
}
let welcome = {
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
): Promise<AxiosResponse | any> => {
  const endpoint = "login";
  const response = await csrf_fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    data: JSON.stringify(data),
  });
  // HANDLE ALL RESPONSE HTTP STATUS OF LARAVEL API
  if (response.status === 200 && response.data.success === true) {
    alertify.success(messageSelected);
  } else {
    alertify.error(response.data.message);
  }
};
