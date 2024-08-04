"use client";
import styles from "./mini_section.module.css";
export default function MiniSectionBottom(): JSX.Element {
  return (
    <div id={styles.mini_section}>
      <div className="container">
        <div className="row mt-5 mb-5">
          <div className="col-xs-12 col-sm-12 col-md-9 col-lg-9 col-xl-9">
            <h3 className="text-uppercase">
              ¿Tienes un parche o un equipo favorito?
              <br /> <b>PERSONALIZA TU PERFIL</b>
            </h3>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">
            <div className={styles.logo_uefa}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
