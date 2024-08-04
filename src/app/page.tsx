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

export default function Home(): JSX.Element {
  const {
    showLoginForm,
    showSignupForm,
    showResetPasswordForm,
    showVerifyEmail,
    showContactme,
  } = useLaTribunaFormContext();
  const { isLoggedIn } = useSession();

  // Obtiene el componente de formulario correspondiente
  const getFormComponent = (): JSX.Element => {
    if (showLoginForm) {
      return <LoginForm />;
    }
    if (showSignupForm) {
      return <SignUpForm />;
    }
    if (showResetPasswordForm) {
      return <ResetPass />;
    }
    if (showVerifyEmail) {
      return <EmailVerify />;
    }
    if (showContactme) {
      return <ContactMe />;
    }
    return <></>;
  };

  return (
    <>
      <PrincipalSection />
      <News />
      <MiniSection />
      {isLoggedIn === false && (
        <CustomModal>{getFormComponent()}</CustomModal>
      )}
      <LeagueTable />
      <MiniSectionBottom />
    </>
  );
}
