"use client";
import PrincipalSection from "./assets/components/sections/principal_sections";
import MiniSection from "./assets/components/sections/mini_section/mini_section";
import News from "./assets/components/sections/news/news";
import LeagueTable from "./assets/components/positionTable/positions";
import MiniSectionBottom from "./assets/components/sections/mini_section/mini_section_bottom";
import Head from "next/head";
export default function Home(): JSX.Element {
  return (
    <>

      <PrincipalSection />
      <News />
      <MiniSection />
      <LeagueTable />
      <MiniSectionBottom />
    </>
  );
}
