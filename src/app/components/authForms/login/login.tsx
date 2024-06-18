"use client";
import styles from "./login.module.css";
import { useLaTribunaAuthFormContext } from "@/app/context/authForm";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
export default function LoginForm(): JSX.Element {
  const { handlerForm } = useLaTribunaAuthFormContext();

  const showSignUp = () => {
    handlerForm("signup");
  };
  const showResetPassword = () => {
    handlerForm("reset");
  };

  const validationSchema = Yup.object().shape({
    user: Yup.string()
      .required("El nombre o email es obligatorio")
      .min(4, "El nombre o email incompleto, por favor verifique"),
    pass: Yup.string()
      .required("La contraseña es obligatoria")
      .min(8, "La contraseña debe tener al menos 8 caracteres"),
  });
  // Inicializa el hook de formulario con el esquema de validación
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  // Función para manejar el envío del formulario
  const onSubmit = (data: Object) => {
    console.log(data);
  };

  return (
    <div className={styles.formUi}>
      <span>
        <strong>X</strong>
      </span>
      <form
        onSubmit={handleSubmit(onSubmit)}
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
                name="user"
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
            {errors.user && (
              <p className={styles.errors_tags}>{errors.user.message}</p>
            )}
            <div className={styles.formInp}>
              <Controller
                name="pass"
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
            {errors.pass && (
              <p className={styles.errors_tags}>{errors.pass.message}</p>
            )}
          </div>
          <div className={styles.submitButtonCvr}>
            <label className={styles.rememberMe} htmlFor="rememberMe">
              <input
                type="checkbox"
                id={"rememberMe"}
                className={styles.checkbox + " " + styles.rememberMe}
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
  const showLogin = () => {
    handlerForm("login");
  };
  const showResetPassword = () => {
    handlerForm("reset");
  };
  return (
    <div className={styles.formUi}>
      <span>
        <strong>X</strong>
      </span>
      <form
        action=""
        method="post"
        className={styles.form}
        style={{ height: "520px" }}
      >
        <div className={styles.formBody} style={{ top: "40%" }}>
          <div className={styles.welcomeLines}>
            <div className={styles.welcomeLine1}>La Tribuna</div>
            <div className={styles.welcomeLine2}>
              Para amantes del fútbol colombiano
            </div>
          </div>
          <div className={styles.inputArea}>
            <div className={styles.formInp}>
              <input id="name" placeholder="Apodo" type="text" required />
            </div>
            <div className={styles.formInp}>
              <input
                name="email"
                placeholder="Correo electrónico"
                type="email"
                required
              />
            </div>
            <div className={styles.formInp}>
              <input
                name="email_confirmation"
                placeholder="Confirma el correo electrónico"
                type="email"
                required
              />
            </div>
            <div className={styles.formInp}>
              <input placeholder="Contraseña" type="password" />
            </div>
            <div className={styles.formInp}>
              <input
                placeholder="Confirma la contraseña"
                type="password_confirmation"
              />
            </div>
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
  const showLogin = () => {
    handlerForm("login");
  };
  const showSignUp = () => {
    handlerForm("signup");
  };
  return (
    <div className={styles.formUi}>
      <span>
        <strong>X</strong>
      </span>
      <form
        action=""
        method="post"
        className={styles.form}
        style={{ height: "450px" }}
      >
        <div className={styles.formBody} style={{ top: "50%" }}>
          <div className={styles.welcomeLines}>
            <div className={styles.welcomeLine1}>La Tribuna</div>
            <div className={styles.welcomeLine2}>
              Te enviaremos un correo para restablecer tu contraseña
            </div>
          </div>
          <div className={styles.inputArea}>
            <div className={styles.formInp}>
              <input
                name="email"
                placeholder="Correo electrónico"
                type="email"
                required
              />
            </div>
            <div className={styles.formInp}>
              <input placeholder="Contraseña" type="password" />
            </div>
          </div>
          <div className={styles.submitButtonCvr}>
            <button className={styles.submitButton}>Recuperar</button>
          </div>
          <div className={styles.forgotPass}>
            <a href="#" style={{ float: "right" }} onClick={showSignUp}>
              Registrarme
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
