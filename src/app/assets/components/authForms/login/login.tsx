import styles from "./login.module.css";
import {
  LoginService,
  SignUpService,
  forgotPassService,
  generateTokenForEmailService,
  verifyEmailService,
} from "@/app/assets/services/auth";
import { useLaTribunaFormContext } from "@/app/assets/context/auth";
import { useSession } from "@/app/assets/context/session";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  UserDataLogin,
  UserDataSignup,
  ForgotPass,
  EmailVerifyProps,
  ContactMeProps,
} from "@/app/assets/types/types";
import { useThrottle } from "../../hooks/useThrottle";
import {
  loginValidator,
  signupValidator,
  forgotPassValidator,
  emailVerify,
  contactmeValidator,
} from "@/app/assets/validations/validations";
import alertify from "@/app/assets/notifications/toast/alert_service";
import { useEffect, useState } from "react";
import { uploadContact } from "@/app/assets/services/contact";

export default function LoginForm(): JSX.Element {
  const { handlerForm } = useLaTribunaFormContext();
  const { handleIsLoggedIn } = useSession();
  const showSignUp = () => {
    handlerForm("signup");
  };
  const showResetPassword = () => {
    handlerForm("reset");
  };
  const onSubmit = async (data: UserDataLogin): Promise<void> => {
    const alert = alertify.loading("Iniciando sesión...");
    const res = await LoginService(data);
    if (typeof res === "boolean") {
      handleIsLoggedIn(res);
    }
    alertify.dismiss(alert);
  };

  const throttledSubmit = useThrottle((data: UserDataLogin): void => {
    onSubmit(data);
  }, 5000);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginValidator),
    defaultValues: {
      email: "mejia_andres@hotmail.es",
      password: "1470Caro_",
      remember: "false",
    },
  });

  return (
    <div className={styles.formUi}>
      <form
        onSubmit={handleSubmit(throttledSubmit)}
        className={styles.form}
        style={{ height: "470px" }}
      >
        <div className={styles.formBody} style={{ top: "45%" }}>
          <div className={styles.welcomeLines}>
            <div className={styles.welcomeLine1}>LA TRIBUNA </div>
            <div className={styles.welcomeLine2}>
              Para amantes del fútbol colombiano
            </div>
          </div>
          <div className={styles.inputArea}>
            <div className={styles.formInp}>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder="Usuario o email"
                    type="text"
                    className={styles.input + " form-control"}
                  />
                )}
              />
            </div>
            {errors.email && (
              <p className={styles.errors_tags}>{errors.email.message}</p>
            )}
            <div className={styles.formInp}>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder="Contraseña"
                    type="password"
                    className={styles.input + " form-control"}
                  />
                )}
              />
            </div>
            {errors.password && (
              <p className={styles.errors_tags}>{errors.password.message}</p>
            )}
          </div>
          <div className={styles.submitButtonCvr}>
            <label className={styles.rememberMe} htmlFor="rememberMe">
              <Controller
                name="remember"
                control={control}
                render={({ field }) => (
                  <input
                    type="checkbox"
                    id={"rememberMe"}
                    className={styles.checkbox + " " + styles.rememberMe}
                  />
                )}
              />
              <span className={styles.rememberMeTag}>Recordarme</span>
            </label>

            <button className={styles.submitButton}>Ingresar</button>
          </div>
          <div className={styles.forgotPass}>
            <button
              type="button"
              style={{ float: "left" }}
              onClick={showSignUp}
            >
              Registrarme
            </button>
            <button
              type="button"
              style={{ float: "right" }}
              onClick={showResetPassword}
            >
              Recuperar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
export function SignUpForm(): JSX.Element {
  const { handlerForm } = useLaTribunaFormContext();

  const showLogin = (): void => {
    handlerForm("login");
  };
  const showResetPassword = (): void => {
    handlerForm("reset");
  };
  const onSubmit = async (data: UserDataSignup): Promise<void> => {
    // await SignUpService(data);
    localStorage.setItem("verifyng_data", JSON.stringify(data));
    const alert = alertify.loading(
      "Espere mientras se envía el codigo de verificación al email asociado..."
    );
    const res = await generateTokenForEmailService(data.email);
    alertify.dismiss(alert);
    if (!res) {
      handlerForm("signup");
    } else {
      handlerForm("verify");
    }
  };
  const throttledSubmit = useThrottle((data: UserDataSignup) => {
    onSubmit(data);
  }, 5000);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupValidator),
    defaultValues: {
      name: "FontalvoJS",
      email: "mejia_andres@hotmail.es",
      email_confirmation: "mejia_andres@hotmail.es",
      password: "1470Caro_",
      password_confirmation: "1470Caro_",
    },
  });
  return (
    <div className={styles.formUi}>
      <form onSubmit={handleSubmit(throttledSubmit)} className={styles.form}>
        <div className={styles.formBody}>
          <div className={styles.welcomeLines}>
            <div className={styles.welcomeLine1}>LA TRIBUNA </div>
            <div className={styles.welcomeLine2}>
              Para amantes del fútbol colombiano
            </div>
          </div>
          <div className={styles.inputArea}>
            <div className={styles.formInp}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder="Nombre"
                    type="text"
                    className={styles.input + " form-control"}
                  />
                )}
              />
            </div>
            {errors.name && (
              <p className={styles.errors_tags}>{errors.name.message}</p>
            )}
            <div className={styles.formInp}>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder="Correo electrónico"
                    type="text"
                    className={styles.input + " form-control"}
                  />
                )}
              />
            </div>
            {errors.email && (
              <p className={styles.errors_tags}>{errors.email.message}</p>
            )}
            <div className={styles.formInp}>
              <Controller
                name="email_confirmation"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder="Confirma correo electrónico"
                    type="text"
                    className={styles.input + " form-control"}
                  />
                )}
              />
            </div>
            {errors.email_confirmation && (
              <p className={styles.errors_tags}>
                {errors.email_confirmation.message}
              </p>
            )}
            <div className={styles.formInp}>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder="Contraseña"
                    type="password"
                    className={styles.input + " form-control"}
                  />
                )}
              />
            </div>
            {errors.password && (
              <p className={styles.errors_tags}>{errors.password.message}</p>
            )}
            <div className={styles.formInp}>
              <Controller
                name="password_confirmation"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder="Confirma contraseña"
                    type="password"
                    className={styles.input + " form-control"}
                  />
                )}
              />
            </div>
            {errors.password_confirmation && (
              <p className={styles.errors_tags}>
                {errors.password_confirmation.message}
              </p>
            )}
          </div>
          <div className={styles.submitButtonCvr}>
            <button className={styles.submitButton}>Registrarme</button>
          </div>
          <div className={styles.forgotPass}>
            <button
              type="button"
              style={{ float: "right" }}
              onClick={showResetPassword}
            >
              Recuperar
            </button>
            <button type="button" style={{ float: "left" }} onClick={showLogin}>
              Ya tengo una!
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
export function ResetPass(): JSX.Element {
  const { handlerForm } = useLaTribunaFormContext();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(forgotPassValidator),
    defaultValues: {
      email: "",
    },
  });

  const showLogin = () => {
    handlerForm("login");
  };
  const showSignUp = () => {
    handlerForm("signup");
  };

  const onSubmit = async (data: ForgotPass): Promise<void> => {
    await forgotPassService(data);
  };
  const throttledSubmit = useThrottle((data: ForgotPass): void => {
    onSubmit(data);
  }, 5000);
  return (
    <div className={styles.formUi}>
      <form onSubmit={handleSubmit(throttledSubmit)} className={styles.form}>
        <div className={styles.formBody}>
          <div className={styles.welcomeLines}>
            <div className={styles.welcomeLine1}>LA TRIBUNA </div>
            <div className={styles.welcomeLine2}>
              Para amantes del futbol colombiano
            </div>
          </div>
          <p className={styles.reset_text}>
            Recibirás un correo electronico para restablecer tu contraseña.
          </p>
          <div className={styles.inputArea}>
            <div className={styles.formInp}>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder="Correo electrónico"
                    type="email"
                  />
                )}
              />
            </div>
            {errors.email && (
              <p className={styles.errors_tags}>{errors.email.message}</p>
            )}
          </div>
          <div className={styles.submitButtonCvr}>
            <button className={styles.submitButton}>Recuperar</button>
          </div>
          <div className={styles.forgotPass}>
            <button type="button" style={{ float: "left" }} onClick={showLogin}>
              Iniciar sesión
            </button>
            <button
              type="button"
              style={{ float: "right" }}
              onClick={showSignUp}
            >
              Registrarme
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export function EmailVerify(): JSX.Element {
  const { handlerForm } = useLaTribunaFormContext();
  const [code, setCode] = useState<string | null>(null);
  const [dataUser, setData] = useState<UserDataSignup | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EmailVerifyProps>({
    resolver: yupResolver(emailVerify),
    defaultValues: {
      email: "",
      code: "",
    },
  });

  useEffect(() => {
    const data = localStorage.getItem("verifyng_data");
    if (data) {
      const parsedData = JSON.parse(data);
      setData(parsedData);
      reset({
        email: parsedData.email,
        code: "",
      });
    }
  }, [reset]);

  useEffect(() => {
    if (dataUser && code) {
      const verifyData = async () => {
        const res = await verifyEmailService(code, dataUser);
        if (res) {
          handlerForm("login");
        } else {
          reset({ email: dataUser.email, code: "" });
        }
      };
      verifyData();
    }
  }, [code, dataUser, handlerForm, reset]);

  const onSubmit = async (data: EmailVerifyProps): Promise<void> => {
    setCode(data.code);
  };

  const throttledSubmit = useThrottle((data: EmailVerifyProps): void => {
    onSubmit(data);
  }, 1000);

  return (
    <div className={styles.formUi}>
      <form
        onSubmit={handleSubmit(throttledSubmit)}
        className={styles.form}
        style={{ height: "470px" }}
      >
        <div className={styles.formBody} style={{ top: "45%" }}>
          <div className={styles.welcomeLines}>
            <div className={styles.welcomeLine1}>LA TRIBUNA </div>
            <div className={styles.welcomeLine2}>
              Ingresa el codigo que enviamos a tu correo para continuar tu
              registro
            </div>
          </div>
          <div className={styles.inputArea}>
            <div className={styles.formInp + " d-none"}>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder="email"
                    hidden
                    type="text"
                    className={styles.input + " form-control"}
                  />
                )}
              />
            </div>
            {errors.email && (
              <p className={styles.errors_tags}>{errors.email.message}</p>
            )}
            <div className={styles.formInp}>
              <Controller
                name="code"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder="Codigo"
                    type="text"
                    className={styles.input + " form-control"}
                  />
                )}
              />
            </div>
            {errors.code && (
              <p className={styles.errors_tags}>{errors.code.message}</p>
            )}
          </div>
          <div className={styles.submitButtonCvr}>
            <button className={styles.submitButton}>Verificar</button>
          </div>
        </div>
      </form>
    </div>
  );
}
export function ContactMe(): JSX.Element {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(contactmeValidator),
    defaultValues: {
      name: "Tu nombre",
      email: "Tu email donde responderemos",
      subject: "Asunto",
      message: "Redacta el mensaje aquí",
    },
  });
  const onSubmit = async (data: ContactMeProps): Promise<void> => {
    await uploadContact(data);
    reset({
      name: "Tu nombre",
      email: "Tu email donde responderemos",
      subject: "Asunto",
      message: "Redacta el mensaje aquí",
    });
  };
  const throttledSubmit = useThrottle((data: ContactMeProps) => {
    onSubmit(data);
  }, 5000);
  return (
    <div className={styles.formUi}>
      <form onSubmit={handleSubmit(throttledSubmit)} className={styles.form}>
        <div className={styles.formBody}>
          <div className={styles.welcomeLines}>
            <div className={styles.welcomeLine1}>LA TRIBUNA </div>
            <div className={styles.welcomeLine2}>
              Para amantes del fútbol colombiano
            </div>
          </div>
          <div className={styles.inputArea}>
            <div className={styles.formInp}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder="Nombre"
                    type="text"
                    className={styles.input + " form-control"}
                  />
                )}
              />
            </div>
            {errors.name && (
              <p className={styles.errors_tags}>{errors.name.message}</p>
            )}
            <div className={styles.formInp}>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder="Correo electrónico"
                    type="text"
                    className={styles.input + " form-control"}
                  />
                )}
              />
            </div>
            {errors.email && (
              <p className={styles.errors_tags}>{errors.email.message}</p>
            )}
            <div className={styles.formInp}>
              <Controller
                name="subject"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder="Asunto"
                    type="text"
                    className={styles.input + " form-control"}
                  />
                )}
              />
            </div>
            {errors.subject && (
              <p className={styles.errors_tags}>{errors.subject.message}</p>
            )}
            <Controller
              name="message"
              control={control}
              render={({ field }) => (
                <textarea
                  {...field}
                  className={styles.textarea + " form-control"}
                ></textarea>
              )}
            />
            {errors.message && (
              <p className={styles.errors_tags}>{errors.message.message}</p>
            )}
          </div>
          <div className={styles.submitButtonCvr}>
            <button className={styles.submitButton}>Envíar</button>
          </div>
        </div>
      </form>
    </div>
  );
}
