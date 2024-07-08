import { toast, ToastPosition } from "react-toastify";

const alertify = {
  success: (
    message: string,
    position: ToastPosition | undefined = "bottom-left"
  ) =>
    toast.success(message, {
      position,
    }),
  error: (
    message: string,
    position: ToastPosition | undefined = "bottom-left"
  ) =>
    toast.error(message, {
      position,
    }),
  warning: (
    message: string,
    position: ToastPosition | undefined = "bottom-left"
  ) =>
    toast.warn(message, {
      position,
    }),
  info: (
    message: string,
    position: ToastPosition | undefined = "bottom-left"
  ) =>
    toast.info(message, {
      position,
    }),
};

export default alertify;
