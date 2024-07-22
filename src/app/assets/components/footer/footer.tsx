'use client';
import { useEffect, useRef } from "react";
import styles from "./footer.module.css";
import { useSideHeaderContext } from "@/app/assets/context/sideHeader";
export default function Footer(): JSX.Element {
  const { showSideHeader } = useSideHeaderContext();
  const footerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!showSideHeader && footerRef.current) {
      footerRef.current.style.left = "-300px";
    }
  });
  return (
    <footer ref={footerRef} id={styles.footer}>
      <div className="container">
        <div className={styles.copyright}>
          By:
          <strong> FontalvoJS</strong>
        </div>
      </div>
    </footer>
  );
}
