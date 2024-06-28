"use client";
import styles from "./login.module.css";
import {
  LoginService,
  SignUpService,
  forgotPassService,
} from "@/app/services/auth";
import { useLaTribunaAuthFormContext } from "@/app/context/authForm";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserDataLogin, UserDataSignup, ForgotPass } from "@/app/types/types";
import { useThrottle } from "../../hooks/useThrottle";
import { useState } from "react";
import {
  loginValidator,
  signupValidator,
  forgotPassValidator,
} from "@/app/validations/validations";

export default function LoginForm(): JSX.Element {
  const { handlerForm } = useLaTribunaAuthFormContext();
  const [data, setData] = useState<UserDataLogin>({
    email: "",
    password: "",
    remember: "false",
  });

  const showSignUp = () => {
    handlerForm("signup");
  };
  const showResetPassword = () => {
    handlerForm("reset");
  };
  const onSubmit = async (data: UserDataLogin): Promise<void> => {
    setData(data);
    await LoginService(data);
  };

  const throttledSubmit = useThrottle((data: UserDataLogin): void => {
    onSubmit(data);
  }, 1000);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginValidator),
    defaultValues: {
      email: "",
      password: "",
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
            <div className={styles.welcomeLine1}>La Tribuna</div>
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
                    className={styles.input}
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
                    className={styles.input}
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
            <a href="#" style={{ float: "left" }} onClick={showSignUp}>
              Registrarme
            </a>
            <a href="#" style={{ float: "right" }} onClick={showResetPassword}>
              Recuperar
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}
export function SignUpForm(): JSX.Element {
  const { handlerForm } = useLaTribunaAuthFormContext();
  const [data, setData] = useState<UserDataSignup>({
    name: "",
    email: "",
    email_confirmation: "",
    password: "",
    password_confirmation: "",
  });

  const showLogin = (): void => {
    handlerForm("login");
  };
  const showResetPassword = (): void => {
    handlerForm("reset");
  };
  const onSubmit = async (data: UserDataSignup): Promise<void> => {
    setData(data);
    await SignUpService(data);
  };
  const throttledSubmit = useThrottle((data: UserDataSignup) => {
    onSubmit(data);
  }, 1000);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupValidator),
    defaultValues: {
      name: "",
      email: "",
      email_confirmation: "",
      password: "",
      password_confirmation: "",
    },
  });
  return (
    <div className={styles.formUi}>
      <form onSubmit={handleSubmit(throttledSubmit)} className={styles.form}>
        <div className={styles.formBody}>
          <div className={styles.welcomeLines}>
            <div className={styles.welcomeLine1}>La Tribuna</div>
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
                    className={styles.input}
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
                    className={styles.input}
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
                    className={styles.input}
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
                    className={styles.input}
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
                    className={styles.input}
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
            <a href="#" style={{ float: "right" }} onClick={showResetPassword}>
              Recuperar
            </a>
            <a href="#" style={{ float: "left" }} onClick={showLogin}>
              Ya tengo una!
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}
export function ResetPass(): JSX.Element {
  const { handlerForm } = useLaTribunaAuthFormContext();
  const [data, setData] = useState<ForgotPass>({
    email: "",
  });
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
    setData(data);
    await forgotPassService(data);
  };
  const throttledSubmit = useThrottle((data: ForgotPass): void => {
    onSubmit(data);
  }, 1000);
  return (
    <div className={styles.formUi}>
      <form onSubmit={handleSubmit(throttledSubmit)} className={styles.form}>
        <div className={styles.formBody}>
          <div className={styles.welcomeLines}>
            <div className={styles.welcomeLine1}>La Tribuna</div>
            <div className={styles.welcomeLine2}>
              Para amantes del futbol colombiano
            </div>
          </div>
          <p className={styles.reset_text}>Recibirás un correo electronico para restablecer tu contraseña.</p>
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
        </div>
      </form>
    </div>
  );
}
