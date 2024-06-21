"use client";
import Image from "next/image";
import styles from "./header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { config } from "@fortawesome/fontawesome-svg-core";
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
import { useSideHeaderContext } from "@/app/context/sideHeader";
import React, { useEffect } from "react";
export default function Header(): JSX.Element {
  const { handleShowModalForm } = useLaTribunaAuthFormContext();
  const { showSideHeader, handleCloseSideHeader, handleShowSideHeader } =
    useSideHeaderContext();
  const hideHeader = (): void => {
    handleCloseSideHeader();
  };
  const showHeader = (): void => {
    handleShowSideHeader();
  };
  const headerHanlder = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    if (event.currentTarget.getAttribute("data-hidden") === "true") {
      hideHeader();
    } else {
      showHeader();
    }
  };
  return (
    <header
      id={styles.header}
      className={showSideHeader ? styles.show_header : styles.hide_header}
    >
      <div
        className={showSideHeader ? styles.close_menu : styles.open_menu}
        data-hidden={showSideHeader}
        onClick={headerHanlder}
      >
        <FontAwesomeIcon width={15} icon={faCaretLeft as IconProp} />
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
              <a className="nav-link scrollto active">
                <span className={styles.icons_span}>
                  <FontAwesomeIcon width={14} icon={faSignInAlt as IconProp} />
                </span>
                <span> Acceder al club </span>
              </a>
            </li>
            <li>
              <a href="#about" className="nav-link scrollto">
                <span>
                  Las <b>4</b> verdades | analisís y critica
                </span>
              </a>
            </li>
            <li>
              <a href="#about" className="nav-link scrollto">
                <span>Discusiones</span>
              </a>
            </li>
            <li>
              <a href="#about" className="nav-link scrollto">
                <span>
                  Predicciones por <b>IA</b>
                  <strong></strong>
                </span>
              </a>
            </li>
            <li>
              <a href="#about" className="nav-link scrollto">
                <span>Contáctame</span>
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
          </ul>
        </nav>
      </div>
    </header>
  );
}
