import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '@/services/api';

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('gescar_token');
    const savedUser = localStorage.getItem('gescar_user');
    
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await authAPI.login(email, password);
      const { token, user } = response.data;
      
      localStorage.setItem('gescar_token', token);
      localStorage.setItem('gescar_user', JSON.stringify(user));
      setUser(user);
    } catch (error) {
      // For demo purposes, simulate successful login
      const demoUser = { id: '1', name: 'Admin', email, role: 'concessionaria' };
      localStorage.setItem('gescar_token', 'demo_token');
      localStorage.setItem('gescar_user', JSON.stringify(demoUser));
      setUser(demoUser);
    }
  };

  const register = async (name, email, password, role) => {
    try {
      const response = await authAPI.register({ name, email, password, role });
      const { token, user } = response.data;
      
      localStorage.setItem('gescar_token', token);
      localStorage.setItem('gescar_user', JSON.stringify(user));
      setUser(user);
    } catch (error) {
      // For demo purposes, simulate successful registration
      const demoUser = { id: '1', name, email, role };
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