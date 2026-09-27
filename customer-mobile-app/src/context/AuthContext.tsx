import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiClient } from '../api/client';

type User = {
  id: string;
  name: string;
  phone: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (user: User, token: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('@user');
      const token = await AsyncStorage.getItem('@token');
      if (storedUser && token) {
        setUser(JSON.parse(storedUser));
        // Optional: you could attach the token to the apiClient headers here
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (userData: User, token: string) => {
    setUser(userData);
    await AsyncStorage.setItem('@user', JSON.stringify(userData));
    await AsyncStorage.setItem('@token', token);
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem('@user');
    await AsyncStorage.removeItem('@token');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
