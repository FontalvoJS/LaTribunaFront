import { useEffect, useRef } from "react";
import { useSideHeaderContext } from "@/app/assets/context/sideHeader";
import { MainProps } from "@/app/assets/types/types";

export default function Main({ children }: MainProps): JSX.Element {
  const { showSideHeader } = useSideHeaderContext();
  const mainRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (mainRef.current) {
      if (!showSideHeader) {
        mainRef.current.style.marginLeft = "0";
      } else {
        mainRef.current.style.marginLeft = "300px";
      }
    }
  }, [showSideHeader]);
  return <main id="main" ref={mainRef}>{children}</main>;
}
