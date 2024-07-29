"use client";
import styles from "./principal_sections.module.css";
import Image from "next/image";
export default function PrincipalSection(): JSX.Element {
  return (
    <>
      <section id={styles.about} className={styles.section}>
        <div className="container">
          <div className={styles.section_title}>
            <div className={styles.logos_card}>
              <Image
                src="/images/logos/betplay.webp"
                alt="LA TRIBUNA "
                width={500}
                height={500}
              />
              <Image
                src="/images/logos/uefa.png"
                alt="LA TRIBUNA "
                width={500}
                height={500}
              />
              <Image
                src="/images/logos/premier.png"
                alt="LA TRIBUNA "
                width={500}
                height={500}
              />
            </div>
            <h2 className={styles.title_primary_section}>
              Únete a nuestra comunidad <br /> y disfruta la pasión del futbol en todo
              momento.
            </h2>
          </div>
        </div>
      </section>
    </>
  );
}
