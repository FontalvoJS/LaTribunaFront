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
export interface HeadersProps {
  headers?: Record<string, string>;
  method?: string;
  body?: string;
}
