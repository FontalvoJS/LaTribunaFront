import styles from "./footer.module.css";
export default function Footer(): JSX.Element {
  return (
    <footer id={styles.footer}>
      <div className="container">
        <div className={styles.copyright}>
          Desarrollado por:
          <strong> FontalvoJS</strong>
        </div>
      </div>
    </footer>
  );
}
