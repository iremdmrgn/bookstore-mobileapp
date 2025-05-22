// app/_layout.tsx
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { CartProvider } from '../context/CartContext';
import { FavoriteProvider } from '../context/FavoriteContext';
import { ProfileProvider } from '../context/ProfileContext';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const [fontsLoaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    'Lobster-Regular': require('../assets/fonts/Lobster-Regular.ttf'),
  });

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  if (!fontsLoaded || loading) {
    return null; // Opsiyonel: Splash ekranı eklenebilir
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <FavoriteProvider>
        <CartProvider>
          <ProfileProvider>
            <Stack screenOptions={{ headerShown: false }}>
              {user ? (
                <Stack.Screen name="(tabs)" />
              ) : (
                <>
                  <Stack.Screen name="(auth)/login" />
                  <Stack.Screen name="(auth)/register" />
                </>
              )}
              <Stack.Screen name="+not-found" />
            </Stack>
            <StatusBar style="dark" translucent backgroundColor="transparent" />
          </ProfileProvider>
        </CartProvider>
      </FavoriteProvider>
    </ThemeProvider>
  );
}
