import React, {createContext, useState, useContext, ReactNode} from 'react';

interface AppContextType {
  firstName: string;
  setFirstName: React.Dispatch<React.SetStateAction<string>>;
  subjectType: string | null;
  setSubjectType: React.Dispatch<React.SetStateAction<string | null>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({children}) => {
  const [firstName, setFirstName] = useState<string>('');
  const [subjectType, setSubjectType] = useState<string | null>('');

  return (
    <AppContext.Provider
      value={{firstName, setFirstName, subjectType, setSubjectType}}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
