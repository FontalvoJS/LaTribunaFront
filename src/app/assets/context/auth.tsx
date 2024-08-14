"use client";
import { AuthContextProps, User } from "@/app/assets/types/types";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
  useCallback,
} from "react";

// Contexto
const LaTribunaContextAuthForm = createContext<AuthContextProps | undefined>(
  undefined
);

// Proveedor
export const LaTribunaProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Estado para almacenar el usuario
  const [user, setUser] = useState<User | null>(null);

  // Estado para controlar la visibilidad del modal
  const [showModalForm, setShowModalForm] = useState<boolean>(false);

  // Estado para controlar qué formulario está activo
  const [activeForm, setActiveForm] = useState<string>("login");

  // Funciones de manejo
  const handleShowModalForm = useCallback(() => setShowModalForm(true), []);
  const handleCloseModalForm = useCallback(() => setShowModalForm(false), []);
  const handleUser = useCallback((user: User) => setUser(user), []);
  const handlerContactme = useCallback(() => {
    setActiveForm((prev) => (prev === "contactme" ? "login" : "contactme"));
  }, []);
  const handlerForm = useCallback((activeForm: string) => {
    setActiveForm(activeForm);
    
  }, []);

  // Calcula los estados de los formularios según el formulario activo
  const formStates = useMemo(() => {
    return {
      showLoginForm: activeForm === "login",
      showSignupForm: activeForm === "signup",
      showResetPasswordForm: activeForm === "reset",
      showVerifyEmail: activeForm === "verify",
      showContactme: activeForm === "contactme",
    };
  }, [activeForm]);

  // Valor del contexto
  const value = useMemo(
    () => ({
      showModalForm,
      user,
      activeForm,
      setActiveForm,
      handleUser,
      handleShowModalForm,
      handleCloseModalForm,
      handlerForm,
      handlerContactme,
      ...formStates,
    }),
    [
      showModalForm,
      user,
      activeForm,
      setActiveForm,
      handleUser,
      handleShowModalForm,
      handleCloseModalForm,
      handlerForm,
      handlerContactme,
      formStates,
    ]
  );

  return (
    <LaTribunaContextAuthForm.Provider value={value}>
      {children}
    </LaTribunaContextAuthForm.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useLaTribunaFormContext = (): AuthContextProps => {
  const context = useContext(LaTribunaContextAuthForm);
  if (!context) {
    throw new Error(
      "useLaTribunaFormContext must be used within a LaTribunaProvider"
    );
  }
  return context;
};
