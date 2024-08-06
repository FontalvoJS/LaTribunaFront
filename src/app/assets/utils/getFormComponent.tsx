"use client";
import { useLaTribunaFormContext } from "../context/auth";
import { useSession } from "../context/session";
import LoginForm, {
  SignUpForm,
  ResetPass,
  EmailVerify,
  ContactMe,
} from "../components/authForms/login/login";

export default function GetFormComponent(): JSX.Element {
  const {
    showLoginForm,
    showSignupForm,
    showResetPasswordForm,
    showVerifyEmail,
    showContactme,
  } = useLaTribunaFormContext();
  const { isLoggedIn } = useSession();

  if (isLoggedIn === false || showContactme) {
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
  }

  return <></>;
}
