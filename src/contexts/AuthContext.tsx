import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authAPI } from '@/services/api';

export type UserRole = 'concessionaria' | 'cliente';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('gescar_token');
    const savedUser = localStorage.getItem('gescar_user');
    
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await authAPI.login(email, password);
      const { token, user } = response.data;
      
      localStorage.setItem('gescar_token', token);
      localStorage.setItem('gescar_user', JSON.stringify(user));
      setUser(user);
    } catch (error) {
      // For demo purposes, simulate successful login
      // Default to concessionaria role for demo
      const demoUser: User = { id: '1', name: 'Admin', email, role: 'concessionaria' };
      localStorage.setItem('gescar_token', 'demo_token');
      localStorage.setItem('gescar_user', JSON.stringify(demoUser));
      setUser(demoUser);
    }
  };

  const register = async (name: string, email: string, password: string, role: UserRole) => {
    try {
      const response = await authAPI.register({ name, email, password, role });
      const { token, user } = response.data;
      
      localStorage.setItem('gescar_token', token);
      localStorage.setItem('gescar_user', JSON.stringify(user));
      setUser(user);
    } catch (error) {
      // For demo purposes, simulate successful registration
      const demoUser: User = { id: '1', name, email, role };
      localStorage.setItem('gescar_token', 'demo_token');
      localStorage.setItem('gescar_user', JSON.stringify(demoUser));
      setUser(demoUser);
    }
  };

  const logout = () => {
    authAPI.logout();
    localStorage.removeItem('gescar_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
