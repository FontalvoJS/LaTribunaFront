import * as Yup from "yup";
export const loginValidator = Yup.object().shape({
  email: Yup.string()
    .required("Su usuario o email es obligatorio")
    .min(4, "El usuario o email incompleto, por favor verifique"),
  password: Yup.string()
    .required("La contraseña es obligatoria")
    .min(8, "La contraseña debe tener al menos 8 caracteres"),
  remember: Yup.string(),
});

export const emailVerify = Yup.object().shape({
  email: Yup.string()
    .required("El email es obligatorio")
    .email("El email no es valido"),
  code: Yup.string().required("El Código es obligatorio").min(6).max(6),
});

export const signupValidator = Yup.object().shape({
  email: Yup.string()
    .required("El nombre o email es obligatorio")
    .email("El email no es valido"),
  email_confirmation: Yup.string()
    .oneOf([Yup.ref("email")], "Los correos no coinciden")
    .required(),
  password: Yup.string()
    .required("La contraseña es obligatoria")
    .min(8, "La contraseña debe tener al menos 8 caracteres"),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref("password")], "Las contraseñas no coinciden")
    .required(),
  name: Yup.string()
    .required("El nombre es obligatorio")
    .min(4, "El nombre debe tener al menos 4 caracteres")
    .max(30, "El nombre debe tener menos de 30 caracteres"),
});
export const forgotPassValidator = Yup.object().shape({
  email: Yup.string()
    .required("El email es obligatorio")
    .email("El email no es valido"),
});

export const passwordResetValidator = Yup.object().shape({
  password: Yup.string()
    .required("La contraseña es obligatoria")
    .min(8, "La contraseña debe tener al menos 8 caracteres"),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref("password")], "Las contraseñas no coinciden")
    .required(),
  token: Yup.string().required("El token es obligatorio"),
  email: Yup.string().required("El email es obligatorio"),
});
export const contactmeValidator = Yup.object().shape({
  email: Yup.string()
    .required("El nombre o email es obligatorio")
    .email("El email no es valido"),
  name: Yup.string()
    .required("El nombre es obligatorio")
    .min(4, "El nombre debe tener al menos 4 caracteres")
    .max(30, "El nombre debe tener menos de 30 caracteres"),
  subject: Yup.string().required("El asunto es obligatorio").max(200, "El asunto debe tener menos de 200 caracteres").min(4, "El asunto debe tener al menos 10 caracteres"),
  message: Yup.string().required("El mensaje es obligatorio"),
});
