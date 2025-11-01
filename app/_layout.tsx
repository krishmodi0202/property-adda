import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter, useSegments, usePathname } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { AuthProvider, useAuth } from '../src/context/AuthContext';
import { User } from '../src/types/auth';
import { useColorScheme } from '../hooks/use-color-scheme';

// This hook will protect the route based on authentication state
function useProtectedRoute(user: User | null) {
  const segments = useSegments();
  const router = useRouter();
  const pathname = usePathname();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Wait for auth state to be determined
    if (user === undefined) return;

    const inAuthGroup = segments[0] === 'login';
    
    // Don't navigate until we're ready
    if (!isReady) {
      setIsReady(true);
      return;
    }

    // Only redirect if we're not already on the target page
    if (!user && !inAuthGroup) {
      if (pathname !== '/login') {
        router.replace('/login');
      }
    } else if (user && inAuthGroup) {
      if (pathname !== '/(tabs)') {
        router.replace('/(tabs)');
      }
    }
  }, [user, segments, isReady, pathname]);
}

// This component wraps the app with the AuthProvider
function RootLayoutNav() {
  const { user, loading } = useAuth();
  const colorScheme = useColorScheme();

  useProtectedRoute(user);

  if (loading) {
    return null; // or a loading indicator
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen 
          name="(tabs)" 
          options={{ 
            headerShown: false,
            animation: 'fade',
          }} 
        />
        <Stack.Screen 
          name="login" 
          options={{ 
            title: 'Login / Sign Up',
            headerShown: false,
            presentation: 'modal',
            animation: 'slide_from_bottom',
          }} 
        />
        <Stack.Screen 
          name="modal" 
          options={{ 
            presentation: 'modal', 
            title: 'Modal' 
          }} 
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

export const unstable_settings = {
  // Ensure the initial route is the tabs
  initialRouteName: '(tabs)',
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}
