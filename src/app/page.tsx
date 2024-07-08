"use client";
import PrincipalSection from "./assets/components/sections/principal_sections";
import MiniSection from "./assets/components/sections/mini_section/mini_section";
import News from "./assets/components/sections/news/news";
import CustomModal from "./assets/components/modal/modal";
import LoginForm, {
  SignUpForm,
  ResetPass,
} from "./assets/components/authForms/login/login";
import { useLaTribunaAuthFormContext } from "./assets/context/auth";
import { useSession } from "./assets/context/session";
export default function Home(): JSX.Element {
  const { showLoginForm, showSignupForm, showResetPasswordForm } =
    useLaTribunaAuthFormContext();
  const {isLoggedIn} = useSession();
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
    return <></>;
  };
  return (
    <>
      <PrincipalSection />
      <News />
      <MiniSection />
      {isLoggedIn === false ? (
        <CustomModal>{getFormComponent()}</CustomModal>
      ) : (
        <div></div>
      )}
    </>
  );
}
