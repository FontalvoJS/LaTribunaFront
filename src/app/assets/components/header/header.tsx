"use client";
import Image from "next/image";
import styles from "./header.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import { IconProp } from "@fortawesome/fontawesome-svg-core";
// import {
//   faTwitter,
//   faFacebook,
//   faInstagram,
// } from "@fortawesome/free-brands-svg-icons";
import {
  faSignInAlt,
  faPlayCircle,
  faCaretLeft,
  faUser,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useLaTribunaAuthFormContext } from "@/app/assets/context/auth";
import { useSideHeaderContext } from "@/app/assets/context/sideHeader";
import { useSession } from "@/app/assets/context/session";
import React from "react";
export default function Header(): JSX.Element {
  const { handleShowModalForm } = useLaTribunaAuthFormContext();
  const { showSideHeader, handleCloseSideHeader, handleShowSideHeader } =
    useSideHeaderContext();
  const { isLoggedIn, name, parche, imgSelectedClub, club } = useSession();
  const hideHeader = (): void => {
    handleCloseSideHeader();
  };
  const showHeader = (): void => {
    handleShowSideHeader();
  };
  const showBarDetector = async (): Promise<void> => {
    showHeader();
  };
  const headerHandler = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    if (event.currentTarget.getAttribute("data-hidden") === "true") {
      hideHeader();
    } else {
      showHeader();
    }
  };
  const imagePath =
    club && club !== "ignore"
      ? `/images/clubes/${imgSelectedClub}`
      : "/images/logos/logo.svg";
  const loginButton: JSX.Element = (
    <li>
      {isLoggedIn === false ? (
        <div onClick={handleShowModalForm}>
          <Link href="#" className="nav-link scrollto active">
            <span className={styles.icons_span}>
              <FontAwesomeIcon width={14} icon={faSignInAlt as IconProp} />
            </span>
            <span> Acceder al club </span>
          </Link>
        </div>
      ) : (
        <div>
          <Link href="/perfil" className="nav-link scrollto active">
            <span className={styles.icons_span}>
              <FontAwesomeIcon width={14} icon={faUser as IconProp} />
            </span>
            <span> {name} </span>
          </Link>
        </div>
      )}
    </li>
  );
  return (
    <header
      id={styles.header}
      className={showSideHeader ? styles.show_header : styles.hide_header}
    >
      <div
        className={showSideHeader ? styles.close_menu : styles.open_menu}
        onMouseOver={!showSideHeader ? showBarDetector : undefined}
        data-hidden={showSideHeader}
        onClick={headerHandler}
      >
        <FontAwesomeIcon width={15} icon={faCaretLeft as IconProp} />
      </div>
      <div className="d-flex flex-column mt-5">
        <div className={styles.profile}>
          <Image
            src={imagePath}
            alt="logo"
            width={150}
            height={150}
            className="img-fluid rounded-circle"
          />
          <h1 className="text-light">
            <a href="index.html">La Tribuna</a>
          </h1>
          {parche !== "" && (
            <div>
              <span className={styles.marginParche}> [{parche}] </span>
            </div>
          )}
          {/* <div
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
          </div> */}
        </div>

        <nav id={styles.navbar} className="nav-menu navbar">
          <ul>
            {loginButton}
            <li>
              <a type="button" className="nav-link scrollto">
                <span>Analisis criticos</span>
              </a>
            </li>
            <li>
              <a href="#about" className="nav-link scrollto">
                <span>Discusiones</span>
              </a>
            </li>
            <li>
              <a type="button" className="nav-link scrollto">
                <span>
                  Predicciones por <b>IA</b>
                  <strong></strong>
                </span>
              </a>
            </li>
            <li>
              <a type="button" className="nav-link scrollto">
                <span>Contáctame</span>
              </a>
            </li>
            <li className={styles.li_dropdown}>
              <div className="dropdown open">
                <button
                  className="btn btn-secondary"
                  type="button"
                  id="triggerId"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span className={styles.icons_span_play}>
                    <FontAwesomeIcon
                      width={14}
                      icon={faPlayCircle as IconProp}
                    />
                  </span>
                  Transmisiones
                </button>
                <div className="dropdown-menu" aria-labelledby="triggerId">
                  <button className={styles.buttons_menu + " dropdown-item"}>
                    Liga BetPlay
                  </button>
                  <button className={styles.buttons_menu + " dropdown-item"}>
                    UEFA Champions League
                  </button>
                  <button className={styles.buttons_menu + " dropdown-item"}>
                    Premier League
                  </button>
                </div>
              </div>
            </li>

            <li>
              <hr className={styles.hr} />
              <a type="button" className="nav-link scrollto">
                <span
                  style={{ color: "#f1c40f" }}
                  className={styles.icons_span}
                >
                  <FontAwesomeIcon width={14} icon={faSignOutAlt as IconProp} />
                </span>
                <span>Salir</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
