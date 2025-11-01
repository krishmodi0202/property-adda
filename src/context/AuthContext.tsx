import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { User } from '../types/auth';
import { getMe, loginUser, logoutUser, registerUser } from '../utils/api';

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  register: (name: string, email: string, password: string) => Promise<any>;
  login: (email: string, password: string) => Promise<any>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          const userData = await getMe();
          setUser(userData);
        }
      } catch (err) {
        const error = err as Error;
        console.error('Error checking auth status', error);
        await AsyncStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    checkLoggedIn();
  }, []);

  // Register new user
  const register = async (name: string, email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await registerUser({ name, email, password });
      if (response && response.token && response.user) {
        await AsyncStorage.setItem('token', response.token);
        setUser({ 
          email: response.user.email, 
          name: response.user.name, 
          _id: response.user._id 
        });
      }
    } catch (err) {
      const error = err as Error;
      setError(error.message || 'Registration failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Login user
  const login = async (email: string, password: string) => {
    try {
      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      setLoading(true);
      setError(null);
      const response = await loginUser({ email, password });
      
      if (response && response.token && response.user) {
        await AsyncStorage.setItem('token', response.token);
        setUser({ 
          email: response.user.email, 
          name: response.user.name, 
          _id: response.user._id 
        });
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Login failed';
      console.error('Login error:', errorMessage, err.response?.data);
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logout = async () => {
    try {
      await logoutUser();
      await AsyncStorage.removeItem('token');
      setUser(null);
    } catch (err) {
      const error = err as Error;
      console.error('Error during logout:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        error,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
