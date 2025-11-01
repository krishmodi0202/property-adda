import React, { createContext, useContext, useEffect, useState } from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import { useRouter } from 'expo-router';

// Initialize WebBrowser for OAuth
WebBrowser.maybeCompleteAuthSession();

interface AuthContextType {
  isSignedIn: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  user: any;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Check if user is already signed in
  useEffect(() => {
    // TODO: Implement your auth state check here
    // For now, we'll simulate a check
    const checkAuth = async () => {
      setIsLoading(true);
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSignedIn(false);
      setIsLoading(false);
    };
    
    checkAuth();
  }, []);

  const signIn = async () => {
    try {
      // In a real app, you would use Clerk's signIn method here
      // For now, we'll simulate a successful login
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSignedIn(true);
      setUser({ id: '1', name: 'Demo User', email: 'demo@example.com' });
      router.push('/(tabs)');
    } catch (error) {
      console.error('Error signing in:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      // In a real app, you would use Clerk's signOut method here
      await new Promise(resolve => setTimeout(resolve, 500));
      setIsSignedIn(false);
      setUser(null);
      router.push('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ isSignedIn, signIn, signOut, user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
