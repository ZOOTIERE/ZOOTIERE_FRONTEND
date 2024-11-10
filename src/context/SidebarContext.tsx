// SidebarContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SidebarContextType {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Inicializa el estado desde `localStorage`
  const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
    const storedState = localStorage.getItem('sidebar-collapsed');
    return storedState ? JSON.parse(storedState) : false;
  });

  const toggleSidebar = () => {
    setIsCollapsed(prevState => {
      const newState = !prevState;
      localStorage.setItem('sidebar-collapsed', JSON.stringify(newState));
      return newState;
    });
  };

  return (
    <SidebarContext.Provider value={{ isCollapsed, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = (): SidebarContextType => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};
