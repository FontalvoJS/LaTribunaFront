"use client";

import { createContext } from "react";
import { SessionContextProps } from "@/app/assets/types/types";
import { useState, useEffect, useMemo, ReactNode, useContext } from "react";

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
  const handleRole = (id: string): void => setRole(id);
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
      {
        value: "ignore",
        text: "Selecciona tu equipo favorito",
        image: "",
      },
      {
        value: "atletico_nacional",
        text: "Atlético Nacional",
        image: "nacional.png",
      },
      {
        value: "america_de_cali",
        text: "América de Cali",
        image: "america.png",
      },
      {
        value: "deportivo_cali",
        text: "Deportivo Cali",
        image: "cali.png",
      },
      {
        value: "millonarios_fc",
        text: "Millonarios FC",
        image: "millonarios.png",
      },
      {
        value: "independiente_santa_fe",
        text: "Independiente Santa Fe",
        image: "santafe.png",
      },
      {
        value: "junior_de_barranquilla",
        text: "Junior de Barranquilla",
        image: "junior.png",
      },
      {
        value: "deportes_tolima",
        text: "Deportes Tolima",
        image: "tolima.png",
      },
      {
        value: "once_caldas",
        text: "Once Caldas",
        image: "oncecaldas.png",
      },
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
      {
        value: "envigado_fc",
        text: "Envigado FC",
        image: "envigado.png",
      },
      {
        value: "alianza_petrolera",
        text: "Alianza Petrolera",
        image: "alianza.png",
      },
      {
        value: "boyaca_chico",
        text: "Boyacá Chicó",
        image: "boyaca.png",
      },
      {
        value: "deportivo_pereira",
        text: "Deportivo Pereira",
        image: "pereira.png",
      },
      {
        value: "cucuta_deportivo",
        text: "Cúcuta Deportivo",
        image: "cucuta.png",
      },
      {
        value: "real_cartagena",
        text: "Real Cartagena",
        image: "realcartagena.png",
      },
      {
        value: "union_magdalena",
        text: "Unión Magdalena",
        image: "union.png",
      },
      {
        value: "cortulua",
        text: "Cortuluá",
        image: "cortulua.png",
      },
      {
        value: "patriotas_boyaca",
        text: "Patriotas Boyacá",
        image: "patriotas.png",
      },
      {
        value: "deportivo_pasto",
        text: "Deportivo Pasto",
        image: "pasto.png",
      },
      {
        value: "aguilas_doradas",
        text: "Águilas Doradas",
        image: "aguilas.png",
      },
      {
        value: "jaguares_de_cordoba",
        text: "Jaguares de Córdoba",
        image: "jaguares.png",
      },
      {
        value: "la_equidad",
        text: "La Equidad",
        image: "laequidad.png",
      },
    ],
    []
  );

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
      handleLogout: (logout: boolean) => setLogout(logout),
      handleClub: (club: string) => setClub(club),
      handleIsAdmin: (isAdmin: boolean) => setIsAdmin(isAdmin),
      handleName: (name: string) => setName(name),
      handleId: (id: string) => setId(id),
      handleIsLoggedIn: (isLoggedIn: boolean) => setIsLoggedIn(isLoggedIn),
      handleRole: (role: string) => setRole(role),
      handleEmail: (email: string) => setEmail(email),
      handleUpdateInfo: (updateInfo: boolean) => setUpdateInfo(updateInfo),
      handleParche: (parche: string) => setParche(parche),
      handleImgSelectedClub: (image: string) => setImgSelectedClub(image),
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

  useEffect(() => {
    const JsonToObject = !!localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")!)
      : null;
    if (logout) {
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
      return;
    }
    if (updateInfo) {
      handleName(JsonToObject.name);
      handleId(JsonToObject.id);
      handleRole(JsonToObject.role);
      handleEmail(JsonToObject.email);
      if (JsonToObject.club) {
        const clubSelected = teams.find(
          (team) => team.value === JsonToObject.club
        );
        if (clubSelected) {
          handleImgSelectedClub(clubSelected.image);
        }
      }
      handleClub(JsonToObject.club);
      handleParche(JsonToObject.parche);
      handleIsAdmin(JsonToObject.isAdmin);
      handleIsLoggedIn(true);
      handleUpdateInfo(false);
    }
    if (!!localStorage.getItem("user") && logout === false && !updateInfo) {
      const JsonToObject = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user")!)
        : null;
      handleName(JsonToObject.name);
      handleId(JsonToObject.id);
      handleRole(JsonToObject.role);
      handleEmail(JsonToObject.email);
      if (JsonToObject.club) {
        const clubSelected = teams.find(
          (team) => team.value === JsonToObject.club
        );
        if (clubSelected) {
          handleImgSelectedClub(clubSelected.image);
        }
      }
      handleClub(JsonToObject.club);
      handleParche(JsonToObject.parche);
      handleIsAdmin(JsonToObject.isAdmin);
      handleIsLoggedIn(true);
      handleUpdateInfo(false);
    }
  }, [isLoggedIn, teams, logout, updateInfo]);

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
