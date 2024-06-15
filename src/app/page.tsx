import Image from "next/image";
import styles from "./page.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import Header from "./components/header/header";
import Main from "./components/main/main";
import Footer from "./components/footer/footer";
import PrincipalSection, { FirstSectionContent } from "./components/sections/principal_sections";
import MiniSection from "./components/sections/mini_section/mini_section";
import News from "./components/sections/news/news";
export default function Home(): JSX.Element {
  return (
    <>
      <Main>
        <Header />
        <PrincipalSection>
          <FirstSectionContent />
        </PrincipalSection>
        <News />
        <MiniSection />
      </Main>
      <Footer />
    </>
  );
}
