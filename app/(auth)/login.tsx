// app/(auth)/login.tsx
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';

import { loginUser } from '../../firebase/auth';

// app/(auth)/login.tsx
export const unstable_settings = {
  initialRouteName: 'login',
};

export const screenOptions = {
  headerShown: false, // üstteki <back> yazısını da kaldırır
};

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Hata', 'Email ve şifre zorunludur.');
      return;
    }
    try {
      await loginUser(email.trim(), password);
      Alert.alert('Başarılı', 'Giriş başarılı!');
      router.replace('/'); // Ana sayfaya yönlendir
    } catch (error: any) {
      Alert.alert('Hata', error.message || 'Giriş başarısız.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Giriş Yap</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Şifre"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Giriş Yap" onPress={handleLogin} />
      <Text style={styles.link} onPress={() => router.push('/register')}>
        Hesabın yok mu? Kayıt ol
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 5 },
  link: { color: 'blue', marginTop: 15, textAlign: 'center' },
});
