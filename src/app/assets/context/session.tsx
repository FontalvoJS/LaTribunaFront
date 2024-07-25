"use client";

import {
  createContext,
  useState,
  useEffect,
  useMemo,
  ReactNode,
  useContext,
} from "react";
import { SessionContextProps } from "@/app/assets/types/types";

const sessionContext = createContext<SessionContextProps | undefined>(
  undefined
);

interface SessionProviderProps {
  children: ReactNode;
}

export const SessionProvider: React.FC<SessionProviderProps> = ({
  children,
}) => {
  const [name, setName] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [club, setClub] = useState<string>("");
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [updateInfo, setUpdateInfo] = useState<boolean>(false);
  const [parche, setParche] = useState<string>("");
  const [imgSelectedClub, setImgSelectedClub] = useState<string>("");
  const [logout, setLogout] = useState<boolean>(false);

  const handleName = (name: string): void => setName(name);
  const handleId = (id: string): void => setId(id);
  const handleRole = (role: string): void => setRole(role);
  const handleEmail = (email: string): void => setEmail(email);
  const handleIsLoggedIn = (isLoggedIn: boolean): void =>
    setIsLoggedIn(isLoggedIn);
  const handleUpdateInfo = (updateInfo: boolean): void =>
    setUpdateInfo(updateInfo);
  const handleClub = (club: string): void => setClub(club);
  const handleIsAdmin = (isAdmin: boolean): void => setIsAdmin(isAdmin);
  const handleParche = (parche: string): void => setParche(parche);
  const handleImgSelectedClub = (imgSelectedClub: string): void =>
    setImgSelectedClub(imgSelectedClub);
  const handleLogout = (logout: boolean): void => setLogout(logout);

  const teams = useMemo(
    () => [
      { value: "ignore", text: "Selecciona tu equipo favorito", image: "" },
      {
        value: "atletico_nacional",
        text: "Atlético Nacional",
        image: "nacional.png",
      },
      { value: "america_de_cali", text: "America", image: "america.png" },
      { value: "deportivo_cali", text: "cali", image: "cali.png" },
      { value: "millonarios", text: "Millonarios", image: "millonarios.png" },
      {
        value: "independiente_santa_fe",
        text: "Independiente Santa Fe",
        image: "santafe.png",
      },
      { value: "junior_de_barranquilla", text: "Junior", image: "junior.png" },
      {
        value: "deportes_tolima",
        text: "Deportes Tolima",
        image: "tolima.png",
      },
      { value: "once_caldas", text: "Once Caldas", image: "oncecaldas.png" },
      {
        value: "independiente_medellin",
        text: "Independiente Medellín",
        image: "medellin.png",
      },
      {
        value: "atletico_bucaramanga",
        text: "Atlético Bucaramanga",
        image: "bucaramanga.png",
      },
      { value: "envigado_fc", text: "Envigado", image: "envigado.png" },
      { value: "alianza_petrolera", text: "Alianza", image: "alianza.png" },
      { value: "boyaca_chico", text: "Boyacá Chicó", image: "boyaca.png" },
      { value: "deportivo_pereira", text: "Pereira", image: "pereira.png" },
      { value: "cucuta_deportivo", text: "Cúcuta", image: "cucuta.png" },
      {
        value: "real_cartagena",
        text: "Real Cartagena",
        image: "realcartagena.png",
      },
      { value: "union_magdalena", text: "Unión Magdalena", image: "union.png" },
      { value: "cortulua", text: "Cortuluá", image: "cortulua.png" },
      {
        value: "patriotas_boyaca",
        text: "Patriotas Boyacá",
        image: "patriotas.png",
      },
      { value: "deportivo_pasto", text: "Pasto", image: "pasto.png" },
      { value: "aguilas_doradas", text: "Aguilas", image: "aguilas.png" },
      {
        value: "jaguares_de_cordoba",
        text: "Jaguares de Córdoba",
        image: "jaguares.png",
      },
      { value: "la_equidad", text: "La Equidad", image: "laequidad.png" },
      { value: "fortaleza", text: "Fortaleza", image: "fortaleza.png" },
    ],
    []
  );

  useEffect(() => {
    const getUserFromLocalStorage = () => {
      const user = localStorage.getItem("user");
      return user ? JSON.parse(user) : null;
    };

    const updateUserDetails = (user: any) => {
      handleName(user.name);
      handleId(user.id);
      handleRole(user.role);
      handleEmail(user.email);
      if (user.club) {
        const clubSelected = teams.find((team) => team.value === user.club);
        if (clubSelected) {
          handleImgSelectedClub(clubSelected.image);
        }
      }
      handleClub(user.club);
      handleParche(user.parche);
      handleIsAdmin(user.isAdmin);
      handleIsLoggedIn(true);
      handleUpdateInfo(false);
    };

    const resetUserDetails = () => {
      handleName("");
      handleId("");
      handleRole("");
      handleEmail("");
      handleClub("");
      handleParche("");
      handleImgSelectedClub("");
      handleIsAdmin(false);
      handleIsLoggedIn(false);
      handleUpdateInfo(false);
      handleLogout(false);
    };

    const user = getUserFromLocalStorage();

    if (logout) {
      resetUserDetails();
    } else if (updateInfo && user) {
      updateUserDetails(user);
    } else if (user) {
      updateUserDetails(user);
    }
  }, [isLoggedIn, teams, logout, updateInfo]);

  const value = useMemo(
    () => ({
      name,
      id,
      isLoggedIn,
      role,
      email,
      updateInfo,
      club,
      isAdmin,
      parche,
      imgSelectedClub,
      teams,
      logout,
      handleLogout,
      handleClub,
      handleIsAdmin,
      handleName,
      handleId,
      handleIsLoggedIn,
      handleRole,
      handleEmail,
      handleUpdateInfo,
      handleParche,
      handleImgSelectedClub,
    }),
    [
      name,
      id,
      isLoggedIn,
      role,
      email,
      updateInfo,
      club,
      isAdmin,
      parche,
      imgSelectedClub,
      teams,
      logout,
    ]
  );

  return (
    <sessionContext.Provider value={value}>{children}</sessionContext.Provider>
  );
};

export const useSession = (): SessionContextProps => {
  const context = useContext(sessionContext);
  if (context === undefined) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};
