"use client";
import styles from "./login.module.css";
import { useLaTribunaAuthFormContext } from "@/app/context/authForm";
export default function LoginForm(): JSX.Element {
  const { handlerForm } = useLaTribunaAuthFormContext();
  const showSignUp = () => {
    handlerForm("signup");
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
        style={{ height: "450px" }}
      >
        <div className={styles.formBody} style={{ top: "50%" }}>
          <div className={styles.welcomeLines}>
            <div className={styles.welcomeLine1}>La Tribuna</div>
            <div className={styles.welcomeLine2}>
              Para amantes del fútbol colombiano
            </div>
          </div>
          <div className={styles.inputArea}>
            <div className={styles.formInp}>
              <input
                placeholder="Nombre de usuario o correo electrónico"
                type="text"
              />
            </div>
            <div className={styles.formInp}>
              <input placeholder="Contraseña" type="password" />
            </div>
          </div>
          <div className={styles.submitButtonCvr}>
            <label className={styles.rememberMe} htmlFor="rememberMe">
              <input
                type="checkbox"
                id="rememberMe"
                className={styles.checkbox}
              />
              <span className={styles.rememberMeTag}>Recordarme</span>
            </label>

            <button className={styles.submitButton} type="submit">
              Ingresar
            </button>
          </div>
          <div className={styles.forgotPass}>
            <a href="#" style={{ float: "left" }} onClick={showResetPassword}>
              Recuperar
            </a>
            <a href="#" style={{ float: "right" }} onClick={showSignUp}>
              Registrarme
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
        style={{ height: "500px" }}
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
              <input name="name" placeholder="Apodo" type="text" required />
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
            <button className={styles.submitButton} type="submit">
              Registrarme
            </button>
          </div>
          <div className={styles.forgotPass}>
            <a href="#" style={{ float: "left" }} onClick={showResetPassword}>
              Recuperar
            </a>
            <a href="#" style={{ float: "right" }} onClick={showLogin}>
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
            <button className={styles.submitButton} type="submit">
              Recuperar
            </button>
          </div>
          <div className={styles.forgotPass}>
            <a href="#" style={{ float: "left" }} onClick={showSignUp}>
              Registrarme
            </a>
            <a href="#" style={{ float: "right" }} onClick={showLogin}>
              Ya tengo una!
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}
