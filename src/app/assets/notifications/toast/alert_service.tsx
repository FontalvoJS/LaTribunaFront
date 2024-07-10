import { toast, ToastPosition } from "react-toastify";

const alertify = {
  success: (
    message: string,
    position: ToastPosition | undefined = "bottom-right"
  ) =>
    toast.success(message, {
      position,
    }),
  error: (
    message: string,
    position: ToastPosition | undefined = "bottom-right"
  ) =>
    toast.error(message, {
      position,
    }),
  warning: (
    message: string,
    position: ToastPosition | undefined = "bottom-right"
  ) =>
    toast.warn(message, {
      position,
    }),
  info: (
    message: string | JSX.Element,
    position: ToastPosition | undefined = "bottom-right"
  ) =>
    toast.info(message, {
      position,
    }),
  loading: (
    message: string,
    position: ToastPosition | undefined = "bottom-right"
  ) =>
    toast.loading(message, {
      position,
    }),

  dismiss: (alert: any) => toast.dismiss(alert),
  
};

export default alertify;
