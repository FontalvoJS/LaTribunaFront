'use client';
import styles from "./news.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft, faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";

export default function News() {
  return (
    <div className="container mt-4 mb-4">
      <div className="row">
        <div className="col-12">
          <div className={`alert ${styles.alert_dark}`}>
            <span>
              <b>Lo último |</b> Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Laudantium, eaque? In
            </span>
            <div className={styles.controls_alert}>
              <span>
                <FontAwesomeIcon icon={faArrowAltCircleLeft} width={20} />
              </span>
              <span>
                <FontAwesomeIcon icon={faArrowAltCircleRight} width={20} />
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
          <div id={styles.principal_news}>
            <h4 id={styles.principal_new_title}>Titulo de la noticia</h4>
          </div>
        </div>
        <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
          <div className={styles.content_card}>
            <h4 className={styles.content_card_title}>Titulo de la noticia</h4>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
          <div className={styles.content_card}>
            <h4 className={styles.content_card_title}>Titulo de la noticia</h4>
          </div>
        </div>
        <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
          <div id={styles.principal_news}>
            <h4 id={styles.principal_new_title}>Titulo de la noticia</h4>
          </div>
        </div>
      </div>
    </div>
  );
}
