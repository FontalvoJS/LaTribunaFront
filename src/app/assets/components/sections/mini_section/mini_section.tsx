"use client";
import styles from "./mini_section.module.css";
import Image from "next/image";
export default function MiniSection(): JSX.Element {
  return (
    <div id={styles.mini_section}>
      <div className="container">
        <div className="row mt-5 mb-5">
          {/* <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
            <div className={styles.logo_uefa}>
            </div>
          </div> */}
          <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">
            <div className={styles.logo_old}></div>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-9 col-lg-9 col-xl-9">
            <h3 className="text-uppercase">
              Artículos generado por IA y transmisiones en vivo
              <br /> <b>¡NO TE LO PUEDES PERDER!</b>
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
