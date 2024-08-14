import { toast, ToastPosition } from "react-toastify";

const alertify = {
  success: (
    message: string,
    position: ToastPosition | undefined = "bottom-right"
    
  ) =>
    toast.success(message, {
      position,
      className: "toastify_background"
    }),
  error: (
    message: string,
    position: ToastPosition | undefined = "bottom-right"
  ) =>
    toast.error(message, {
      position,
      className: "toastify_background"
    }),
  warning: (
    message: string,
    position: ToastPosition | undefined = "bottom-right"
  ) =>
    toast.warn(message, {
      position,
      className: "toastify_background"
    }),
  info: (
    message: string | JSX.Element,
    position: ToastPosition | undefined = "bottom-right"
  ) =>
    toast.info(message, {
      position,
      className: "toastify_background"
    }),
  loading: (
    message: string,
    position: ToastPosition | undefined = "bottom-right"
  ) =>
    toast.loading(message, {
      position,
      className: "toastify_background"
    }),

  dismiss: (alert: any) => toast.dismiss(alert),
  
};

export default alertify;
