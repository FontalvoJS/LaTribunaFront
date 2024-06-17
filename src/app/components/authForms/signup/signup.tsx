import styles from "../login/login.module.css";
export default function SignUpForm():JSX.Element {
  return (
    <div className={styles.formUi}>
      <span>
        <strong>X</strong>
      </span>
      <form action="" method="post" className={styles.form}>
        <div className={styles.formBody}>
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

            <button className={styles.submitButton} type="submit">
              Registrarme
            </button>
          </div>
          <div className={styles.forgotPass}>
            <a href="#" style={{ float: "right" }}>
              Ya tienes una cuenta?
            </a>
            <a href="#" style={{ float: "left" }}>
              Olvidaste tu contraseña?
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}
