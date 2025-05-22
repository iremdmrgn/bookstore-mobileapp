import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { loginUser } from '../../firebase/auth'; // firebase auth fonksiyonları dosyan

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await loginUser(email, password);
      Alert.alert('Başarılı', 'Giriş başarılı!');
      router.replace({ pathname: '/' }); // Ana sayfaya yönlendir
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
      <Text
        style={styles.link}
        onPress={() => router.push({ pathname: '/register' })}
      >
        Hesabın yok mu? Kayıt ol
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', padding: 20,
  },
  title: {
    fontSize: 28, fontWeight: 'bold', marginBottom: 20, textAlign: 'center',
  },
  input: {
    borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 5,
  },
  link: {
    color: 'blue', marginTop: 15, textAlign: 'center',
  },
});
