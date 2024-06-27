"use client";
import PrincipalSection from "./components/sections/principal_sections";
import MiniSection from "./components/sections/mini_section/mini_section";
import News from "./components/sections/news/news";
import CustomModal from "./components/modal/modal";
import LoginForm, {
  SignUpForm,
  ResetPass,
} from "./components/authForms/login/login";
import { useLaTribunaAuthFormContext } from "./context/authForm";
export default function Home(): JSX.Element {
  const { showLoginForm, showSignupForm, showResetPasswordForm } =
  useLaTribunaAuthFormContext();
  return (
    <>
      <PrincipalSection />
      <News />
      <MiniSection />
      <CustomModal>
        {showLoginForm ? (
          <LoginForm />
        ) : showSignupForm ? (
          <SignUpForm />
        ) : showResetPasswordForm ? (
          <ResetPass />
        ) : (
          <LoginForm />
        )}
      </CustomModal>
    </>
  );
}
