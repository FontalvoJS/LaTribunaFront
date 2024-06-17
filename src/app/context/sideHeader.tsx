'use client'; // Asegúrate de agregar esto al principio

import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';

interface LaTribunaContextProps {
  showSideHeader: boolean;
  handleShowSideHeader: () => void;
  handleCloseSideHeader: () => void;
}

const LaTribunaContextSideHeader = createContext<LaTribunaContextProps | undefined>(undefined);

export const LaTribunaProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [showSideHeader, setShowSideHeader] = useState(false);

  const handleShowSideHeader = () => setShowSideHeader(true);
  const handleCloseSideHeader = () => setShowSideHeader(false);

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

export const useLaTribunaAuthFormContext = () => {
  const context = useContext(LaTribunaContextSideHeader);
  if (!context) {
    throw new Error('useLaTribunaAuthFormContext must be used within a LaTribunaProvider');
  }
  return context;
};
