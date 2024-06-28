import { ReactNode } from "react";
export interface MainProps {
  children: ReactNode;
}
export interface ModalProps {
  children: ReactNode;
}
export interface Options {
  headers?: Record<string, string>;
  method?: string;
  data?: string;
}
export interface AuthContextProps {
  showModalForm: boolean;
  showLoginForm: boolean;
  showSignupForm: boolean;
  showResetPasswordForm: boolean;
  handleShowModalForm: () => void;
  handleCloseModalForm: () => void;
  handlerForm: (activeForm: string) => void;
}
export interface SideHeaderContextProps {
  showSideHeader: boolean;
  handleShowSideHeader: () => void;
  handleCloseSideHeader: () => void;
}
export interface UserDataLogin {
  email: string;
  password: string;
  remember?: string;
}
export interface UserDataSignup {
  name: string;
  email: string;
  email_confirmation: string;
  password: string;
  password_confirmation: string;
}
export interface HeadersProps {
  headers?: Record<string, string>;
  method?: string;
  body?: string;
}

export interface ForgotPass {
  email: string;
}
export interface ResetPass {
  password: string;
  password_confirmation: string;
}
export interface ChangePasswordProps {
  email: string;
  password: string;
  password_confirmation: string;
  token: string;
}