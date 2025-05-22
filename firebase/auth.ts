// firebase/auth.ts
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from 'firebase/auth';
import { auth } from '../firebaseConfig';

// registerUser fonksiyonuna fullname parametresi eklendi
export const registerUser = async (email: string, password: string, fullName: string) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);

  if (auth.currentUser) {
    // Kullanıcının displayName bilgisini güncelle
    await updateProfile(auth.currentUser, {
      displayName: fullName,
    });
  }

  return userCredential;
};

export const loginUser = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const logoutUser = () => {
  return signOut(auth);
};
