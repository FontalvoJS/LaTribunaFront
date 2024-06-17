'use client'; 
import Image from "next/image";
import styles from "./header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faTwitter,
  faFacebook,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import {
  faSignInAlt,
  faPlayCircle,
  faCaretLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useLaTribunaAuthFormContext } from "@/app/context/authForm";
export default function Header(): JSX.Element {
  const { handleShowModalForm } = useLaTribunaAuthFormContext();
  return (
    <header id={styles.header}>
      <div className={styles.close_menu}>
        <FontAwesomeIcon
          width={15}
          icon={faCaretLeft as IconProp}
        />
      </div>
      <div className="d-flex flex-column mt-5">
        <div className={styles.profile}>
          <Image
            src="/images/logos/logo.svg"
            alt="logo"
            width={150}
            height={150}
            className="img-fluid rounded-circle"
          />
          <h1 className="text-light">
            <a href="index.html">La Tribuna</a>
          </h1>
          <div
            className={`social-links mt-3 mb-3 text-center ${styles.socialLinks}`}
          >
            <a href="#" className={styles.iconLink}>
              <FontAwesomeIcon width={20} icon={faTwitter as IconProp} />
            </a>
            <a href="#" className={styles.iconLink}>
              <FontAwesomeIcon width={20} icon={faFacebook as IconProp} />
            </a>
            <a href="#" className={styles.iconLink}>
              <FontAwesomeIcon width={20} icon={faInstagram as IconProp} />
            </a>
          </div>
        </div>

        <nav id={styles.navbar} className="nav-menu navbar">
          <ul>
            <li onClick={handleShowModalForm}>
              <a href="#about" className="nav-link scrollto active">
                <span className={styles.icons_span}>
                  <FontAwesomeIcon width={14} icon={faSignInAlt as IconProp} />
                </span>
                <span> Inicia sesión</span>
              </a>
            </li>
            <li>
              <a href="#about" className="nav-link scrollto">
                <span className={styles.icons_span_play}>
                  <FontAwesomeIcon width={14} icon={faPlayCircle as IconProp} />
                </span>
                <span> Transmisiones</span>
              </a>
            </li>
            {/* <li>
              <a href="#about" className="nav-link scrollto">
                <span className={styles.icons_span}>
                  <FontAwesomeIcon
                    width={14}
                    icon={faDiagramProject as IconProp}
                  />
                </span>
                <span>Foro</span>
              </a>
            </li> */}
            <li>
              <a href="#about" className="nav-link scrollto">
                <span>✨</span>
                <span>
                  Artículos <strong>IA</strong>
                </span>
              </a>
            </li>
            <li>
              <a href="#about" className="nav-link scrollto">
                <span>✨</span>
                <span>
                  Predicciones
                  <strong> IA</strong>
                </span>
              </a>
            </li>
            <li>
              <a href="#about" className="nav-link scrollto">
                <i className="bx bx-user"></i> <span>Contáctame</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
