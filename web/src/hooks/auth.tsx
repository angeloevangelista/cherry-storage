import React, {
  createContext, useCallback, useState, useContext,
} from 'react';

import api from '../services/api';

export interface User {
  id: string;
  avatar: string;
  avatar_url: string;
  name: string;
  surname: string;
  email: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  refreshUser(use: User): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [authData, setAuthData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@CherryStorage:token');
    const user = localStorage.getItem('@CherryStorage:user');

    if (token && user) {
      api.defaults.headers.Authorization = `Bearer ${token}`;

      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    localStorage.setItem('@CherryStorage:token', token);
    localStorage.setItem('@CherryStorage:user', JSON.stringify(user));

    api.defaults.headers.Authorization = `Bearer ${token}`;

    setAuthData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@CherryStorage:token');
    localStorage.removeItem('@CherryStorage:user');

    setAuthData({} as AuthState);
  }, []);

  const refreshUser = useCallback(
    (user: User) => {
      const token = localStorage.getItem('@CherryStorage:token');

      if (!token) {
        signOut();
        return;
      }

      localStorage.setItem('@CherryStorage:user', JSON.stringify(user));

      setAuthData({ token, user });
    },
    [signOut],
  );
  return (
    <AuthContext.Provider
      value={{
        user: authData.user,
        signIn,
        signOut,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.');
  }

  return context;
}

export { useAuth, AuthProvider };
