import { ProfileModifyProps } from "../types/types";
import alertify from "../notifications/toast/alert_service";
import { custom_axios } from "../services/custom_axios";

export const UpdateProfileService = async (
  data: ProfileModifyProps
): Promise<void | string> => {
  const endpoint = "/profile/update-profile";
  try {
    const userUpdated = await custom_axios(endpoint, {
      method: "POST",
      data: JSON.stringify(data),
      withCredentials: true,
    });
    if (localStorage.getItem("user")) localStorage.removeItem("user");
    localStorage.setItem("user", JSON.stringify(userUpdated.data.user));
    alertify.success("Se actualizó tu perfil");
  } catch (error: any) {
    if (error.response.status === 401) {
      alertify.info(
        error.response.data.error + ", serás redirigido a la página principal"
      );
      localStorage.removeItem("user");
      return "redirect";
    } else if (error.response.status >= 400)
      alertify.error(error.response.data.error);
  }
};
