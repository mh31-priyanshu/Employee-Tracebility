import React, { createContext, useState, useContext } from 'react';

const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const [selectedPage, setSelectedPage] = useState('');
  const [openSideBar, setOpenSideBar] = useState(false); // New state for sidebar
  
  const value = {
    selectedPage,
    setSelectedPage,
    openSideBar,
    setOpenSideBar, // Function to toggle sidebar
  };

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobal() {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error('useGlobal must be used within a GlobalProvider');
  }
  return context;
}

export default GlobalContext;
