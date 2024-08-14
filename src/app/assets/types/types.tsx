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
export type FormValues = {
  title: string;
  image?: FileList;
  content?: string;
  description: string;
  tags: string;
  author: string;
  category: string;
  editing: boolean;
};
export interface PreviewPost {
  title: string;
  image: string;
  category: string;
  created_at: string;
  date: string;
  slug: string;
}
export interface PollOptionsProps {
  value: string;
  percentage: number;
  userVote: boolean | string;
}
export interface Post {
  title: string;
  content: string;
  description: string;
  tags: string;
  author: string;
  category: string;
  created_at: string;
  updated_at: string;
  slug: string;
  image: string;
}
export interface Votes {
  option: string | null;
  article: string;
}
export interface Teams {
  text: string;
  image: string;
  value: string;
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
  teams: Teams[];
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
  showVerifyEmail: boolean;
  showContactme: boolean;
  activeForm: string;
  setActiveForm: (activeForm: string) => void;
  handleShowModalForm: () => void;
  handleCloseModalForm: () => void;
  handlerForm: (activeForm: string) => void;
  handleUser: (user: User) => void;
  handlerContactme: () => void;
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
export interface CommentsTypes {
  message: string;
  article: string;
}
export interface EmailVerifyProps {
  email: string;
  code: string;
}
export interface UserDataSignup {
  name: string;
  email: string;
  email_confirmation: string;
  password: string;
  password_confirmation: string;
  verifyReg?: boolean;
}
export interface ContactMeProps {
  name: string;
  email: string;
  message: string;
  subject: string;
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
// Tipo para los datos del nuevo objeto
export interface NewMatch {
  date: string;
  matches: {
    id: string;
    home: string;
    homeID: string;
    away: string;
    awayID: string;
    goalsHome: number;
    goalsAway: number;
    homeLogo: string;
    awayLogo: string;
    referee: string;
    time: string;
    isIdaVueltaMatch: boolean;
    idaVueltaMatch: string;
    agregateWinnerId: string | null;
    venue: string;
    matchStatus: string;
    isPlayedOrPlaying: boolean;
    isPlaying: boolean;
    timeShort: string;
    yellowCardsHome: any[];
    redCardsHome: any[];
    yellowCardsAway: any[];
    redCardsAway: any[];
    goalscorersHome: any[];
    goalscorersAway: any[];
    hasPenalties: boolean;
    goalsHomePenalty: number | null;
    goalsAwayPenalty: number | null;
    videoURL: string | null;
    hasVideo: boolean;
    channelImage: string | null;
    hasChannelImage: boolean;
    optaMatchId: number;
    hasOptaMatchId: boolean;
    optaStageId: string;
  }[];
  dateShort: string;
  isPorDefinir: boolean;
}

// Tipo adaptado para el componente
export interface Match {
  id: string;
  date: string;
  home: {
    name: string;
    logo: string;
  };
  away: {
    name: string;
    logo: string;
  };
  venue_name: string;
  isPlayedOrPlaying: boolean;
  matchStatus: string;
  referee?: string;
  goalsHome?: number;
  goalsAway?: number;
  hasPenalties?: boolean;
  channelImage?: string | null;
  hasVideo?: boolean;
  isPlaying?: boolean;
  yellowCardsHome?: any[];
  redCardsHome?: any[];
  yellowCardsAway?: any[];
  redCardsAway?: any[];
  goalscorersHome?: any[];
  goalscorersAway?: any[];
  venue?: string;
}
