import { createContext, useContext, useState, ReactNode } from 'react';

interface ActiveMenuContextProps {
  activeMenu: string;
  setActiveMenu: (menu: string) => void;
}

const ActiveMenuContext = createContext<ActiveMenuContextProps | undefined>(
  undefined
);

interface ActiveMenuProviderProps {
  children: ReactNode;
}

export const ActiveMenuProvider: React.FC<ActiveMenuProviderProps> = ({
  children
}) => {
  const [activeMenu, setActiveMenu] = useState('');

  return (
    <ActiveMenuContext.Provider value={{ activeMenu, setActiveMenu }}>
      {children}
    </ActiveMenuContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useActiveMenu = () => {
  const context = useContext(ActiveMenuContext);
  if (!context) {
    throw new Error('useActiveMenu must be used within an ActiveMenuProvider');
  }
  return context;
};
