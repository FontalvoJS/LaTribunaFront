"use client";
import Header from "./components/header/header";
import Main from "./components/main/main";
import Footer from "./components/footer/footer";
import PrincipalSection from "./components/sections/principal_sections";
import MiniSection from "./components/sections/mini_section/mini_section";
import News from "./components/sections/news/news";
import CustomModal from "./components/modal/modal";
import LoginForm, {
  SignUpForm,
  ResetPass,
} from "./components/authForms/login/login";
import { useLaTribunaAuthFormContext } from "./context/authForm";
import { ToastContainer, toast } from "react-toastify";
export default function Home(): JSX.Element {
  const { showLoginForm, showSignupForm, showResetPasswordForm } =
    useLaTribunaAuthFormContext();
  return (
    <>
      <Main>
        <ToastContainer position="top-right" draggable theme="dark" autoClose={5000} closeOnClick/>
        <Header />
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
      </Main>
      <Footer />
    </>
  );
}
