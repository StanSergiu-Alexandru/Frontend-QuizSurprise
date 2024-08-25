import React, {createContext, useState, useContext, ReactNode} from 'react';
import {QuestionType} from '../../../../../Types/Types.ts';

interface AppContextType {
  userId: number;
  setUserId: React.Dispatch<React.SetStateAction<number>>;
  firstName: string;
  setFirstName: React.Dispatch<React.SetStateAction<string>>;
  subjectType: string | null;
  setSubjectType: React.Dispatch<React.SetStateAction<string | null>>;
  hasUserWon: boolean;
  setHasUserWon: React.Dispatch<React.SetStateAction<boolean>>;
  question: QuestionType | undefined;
  setQuestion: React.Dispatch<React.SetStateAction<QuestionType | undefined>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({children}) => {
  const [firstName, setFirstName] = useState<string>('');
  const [subjectType, setSubjectType] = useState<string | null>('');
  const [hasUserWon, setHasUserWon] = useState<boolean>(false);
  const [question, setQuestion] = useState<QuestionType | undefined>(undefined);
  const [userId, setUserId] = useState<number>(0);

  return (
    <AppContext.Provider
      value={{
        firstName,
        setFirstName,
        subjectType,
        setSubjectType,
        hasUserWon,
        setHasUserWon,
        question,
        setQuestion,
        userId,
        setUserId,
      }}>
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
