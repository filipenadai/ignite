import React, {
  createContext,
  ReactNode,
  useContext
} from 'react';

interface IAuthProviderProps {
  children: ReactNode;
}

interface IAuthContextData {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

const AuthContext = createContext({} as IAuthContextData);

function AuthProvider({ children }: IAuthProviderProps) {
  return (
    <AuthContext.Provider value={{ id: "Filipe", name: 'Nadai', email: 'filipe@nadai.dev'}}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export { useAuth, AuthProvider };
