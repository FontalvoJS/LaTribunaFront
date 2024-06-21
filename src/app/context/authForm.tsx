"use client"; // Asegúrate de agregar esto al principio
import { AuthContextProps } from "@/app/types/types";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
  useEffect,
} from "react";

const LaTribunaContextAuthForm = createContext<
  AuthContextProps | undefined
>(undefined);

export const LaTribunaProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // user data states
  const [user, setUser] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  // states
  const [showModalForm, setShowModalForm] = useState<boolean>(false);
  const [activeForm, setActiveForm] = useState<string>("login");
  const [showLoginForm, setShowLoginForm] = useState<boolean>(true);
  const [showSignupForm, setShowSignupForm] = useState<boolean>(false);
  const [showResetPasswordForm, setShowResetPasswordForm] =
    useState<boolean>(false);
  // handlers
  const handleShowModalForm = (): void => setShowModalForm(true);
  const handleCloseModalForm = (): void => setShowModalForm(false);
  const handleUser = (user: string): void => setUser(user);
  const handlerPassword = (password: string): void => setPassword(password);
  const handlerForm = (activeForm: string): void => {
    setActiveForm(activeForm);
  };
  // effects
  useEffect(() => {
    switch (activeForm) {
      case "login":
        setShowLoginForm(true);
        setShowSignupForm(false);
        setShowResetPasswordForm(false);
        break;
      case "signup":
        setShowLoginForm(false);
        setShowSignupForm(true);
        setShowResetPasswordForm(false);
        break;
      case "reset":
        setShowLoginForm(false);
        setShowSignupForm(false);
        setShowResetPasswordForm(true);
        break;
      default:
        break;
    }
  }, [activeForm]);
  // value
  const value = useMemo(
    () => ({
      showModalForm,
      showLoginForm,
      showSignupForm,
      showResetPasswordForm,
      user,
      password,
      handleUser,
      handleShowModalForm,
      handleCloseModalForm,
      handlerForm,
    }),
    [
      showModalForm,
      showLoginForm,
      showSignupForm,
      showResetPasswordForm,
      user,
      password,
    ]
  );

  return (
    <LaTribunaContextAuthForm.Provider value={value}>
      {children}
    </LaTribunaContextAuthForm.Provider>
  );
};

export const useLaTribunaAuthFormContext = (): AuthContextProps => {
  const context = useContext(LaTribunaContextAuthForm);
  if (!context) {
    throw new Error(
      "useLaTribunaAuthFormContext must be used within a LaTribunaProvider"
    );
  }
  return context;
};
