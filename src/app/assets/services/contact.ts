import { custom_axios } from "./custom_axios";
import { ContactMeProps } from "../types/types";
import alertify from "../notifications/toast/alert_service";

export const uploadContact = async (data: ContactMeProps): Promise<void> => {
  const translations: { [key: string]: string } = {
    name: "Nombre",
    email: "Email",
    subject: "Asunto",
    message: "Mensaje"
  };

  try {
    const endpoint: string = "/articles/contact";
    const response: any = await custom_axios(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      data: JSON.stringify(data)
    });

    if (response.status === 200) {
      alertify.success(response.data.message);
    }
  } catch (error: any) {
    if (error.response.data) {
      Object.keys(error.response.data).forEach((key: string) => {
        error.response.data[key].forEach((message: string) => {
          alertify.error(`${translations[key] || key}: ${message}`);
        });
      });
    } else {
      alertify.error("Error desconocido");
    }
  }
}