import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';

type DecodedToken = {
  id: string;
  name: string;
  userId: string;

};

type AuthContextType = {
  user: DecodedToken | null;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<DecodedToken | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        try {
          const decoded: DecodedToken = jwtDecode(token);
          setUser(decoded);
        } catch (err) {
          console.error('Invalid token', err);
          await AsyncStorage.removeItem('token');
        }
      }
    };

    loadUser();
  }, []);

  const login = async (credentials: { email: string; password: string }) => {
    try {
      const response = await axios.post(
        'https://l-press-backend.onrender.com/auth/login',
        credentials
      );
    
      const  token  = response.data.access_token;
      const decoded: DecodedToken = jwtDecode(token);

      await AsyncStorage.setItem('token', token);
      setUser(decoded);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
