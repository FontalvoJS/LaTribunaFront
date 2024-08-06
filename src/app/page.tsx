"use client";
import PrincipalSection from "./assets/components/sections/principal_sections";
import MiniSection from "./assets/components/sections/mini_section/mini_section";
import News from "./assets/components/sections/news/news";
import CustomModal from "./assets/components/modal/modal";
import LoginForm, {
  SignUpForm,
  ResetPass,
  ContactMe,
  EmailVerify,
} from "./assets/components/authForms/login/login";
import { useLaTribunaFormContext } from "./assets/context/auth";
import { useSession } from "./assets/context/session";
import LeagueTable from "./assets/components/positionTable/positions";
import MiniSectionBottom from "./assets/components/sections/mini_section/mini_section_bottom";
import GetFormComponent from "./assets/utils/getFormComponent";
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
