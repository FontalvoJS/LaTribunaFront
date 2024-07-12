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
export interface ProfileModifyProps {
  email?: string;
  name?: string;
  club?: string;
}
export interface SessionContextProps {
  name: string;
  role: string;
  id: string;
  email: string;
  isLoggedIn: boolean;
  updateInfo: boolean;
  club?: string;
  isAdmin?: boolean;
  parche?: string;
  imgSelectedClub?: string;
  logout: boolean;
  handleIsLoggedIn: (param: boolean) => void;
  handleName: (param: string) => void;
  handleId: (param: string) => void;
  handleRole: (param: string) => void;
  handleEmail: (param: string) => void;
  handleUpdateInfo: (param: boolean) => void;
  handleClub: (param: string) => void;
  handleIsAdmin: (param: boolean) => void;
  handleParche: (param: string) => void;
  handleImgSelectedClub: (param: string) => void;
  handleLogout: (param: boolean) => void;
}
export interface AuthContextProps {
  user: User | null;
  showModalForm: boolean;
  showLoginForm: boolean;
  showSignupForm: boolean;
  showResetPasswordForm: boolean;
  handleShowModalForm: () => void;
  handleCloseModalForm: () => void;
  handlerForm: (activeForm: string) => void;
  handleUser: (user: User) => void;
}
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  club?: string;
  parche?: string;
  created_at: string;
  updated_at: string;
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
