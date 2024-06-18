"use client"; // Asegúrate de agregar esto al principio

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
} from "react";

interface LaTribunaContextProps {
  showSideHeader: boolean;
  handleShowSideHeader: () => void;
  handleCloseSideHeader: () => void;
}

const LaTribunaContextSideHeader = createContext<
  LaTribunaContextProps | undefined
>(undefined);

export const SideHeaderProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [showSideHeader, setShowSideHeader] = useState<boolean>(true);

  const handleShowSideHeader = (): void => setShowSideHeader(true);
  const handleCloseSideHeader = (): void => setShowSideHeader(false);

  const value = useMemo(
    () => ({
      showSideHeader,
      handleShowSideHeader,
      handleCloseSideHeader,
    }),
    [showSideHeader]
  );

  return (
    <LaTribunaContextSideHeader.Provider value={value}>
      {children}
    </LaTribunaContextSideHeader.Provider>
  );
};

export const useSideHeaderContext = () => {
  const context = useContext(LaTribunaContextSideHeader);
  if (!context) {
    throw new Error(
      "useSideHeaderContext must be used within a SideHeaderProvider"
    );
  }
  return context;
};
