import styles from "./mini_section.module.css";
import Image from "next/image";
export default function MiniSection(): JSX.Element {
  return (
    <div id={styles.mini_section}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
            <h3>
              Artículos impactantes generados por inteligencia artificial, foro
              de discusión, transmisiones en vivo y mucho más proxímamente...{" "}
              <br /> <b>¡Para la mejor comunidad futbolera!</b>
            </h3>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
            <div className={styles.logo_uefa}>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
