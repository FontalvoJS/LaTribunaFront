import { ReactNode } from "react";

interface MainProps {
  children: ReactNode;
}

export default function Main({ children }: MainProps): JSX.Element {
  return <main id="main">{children}</main>;
}
