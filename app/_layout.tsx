// app/_layout.tsx
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import React, { useEffect, useState } from 'react';
import { CartProvider } from '../context/CartContext';
import { FavoriteProvider } from '../context/FavoriteContext';
import { ProfileProvider } from '../context/ProfileContext';

import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    'Lobster-Regular': require('../assets/fonts/Lobster-Regular.ttf'),
  });

  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (usr) => {
      setUser(usr);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (!loaded || loading) {
    return null; // istersen buraya splash screen koyabilirsin
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
