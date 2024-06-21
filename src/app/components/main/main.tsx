import { useEffect } from "react";
import { useSideHeaderContext } from "@/app/context/sideHeader";
import { MainProps } from "@/app/types/types";

export default function Main({ children }: MainProps): JSX.Element {
  const { showSideHeader } = useSideHeaderContext();
  useEffect(() => {
    const main = document.getElementsByTagName("main")[0];
    if (!showSideHeader) {
      main.style.marginLeft = "0";
    } else {
      main.style.marginLeft = "300px";
    }
  }, [showSideHeader]);
  return <main id="main">{children}</main>;
}
