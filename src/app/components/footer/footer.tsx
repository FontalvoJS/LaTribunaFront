import styles from "./footer.module.css";
export default function Footer(): JSX.Element {
  return (
    <footer id={styles.footer}>
      <div className="container">
        <div className={styles.copyright}>
          By:
          <strong> FontalvoJS</strong>
        </div>
      </div>
    </footer>
  );
}
