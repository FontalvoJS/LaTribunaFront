import { useEffect } from "react";
import styles from "./footer.module.css";
import { useSideHeaderContext } from "@/app/assets/context/sideHeader";
export default function Footer(): JSX.Element {
  const { showSideHeader } = useSideHeaderContext();
  useEffect(() => {
    if (!showSideHeader) {
      const footer = document.getElementsByTagName("footer")[0];
      footer.style.left = "-300px";
    }
  });
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
