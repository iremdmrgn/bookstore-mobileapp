import React, { createContext, ReactNode, useContext, useState } from 'react';

type Profile = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

type ProfileContextType = {
  profile: Profile;
  updateProfile: (updated: Partial<Profile>) => void;
};

const defaultProfile: Profile = {
  firstName: 'Jane',
  lastName: 'Doe',
  email: 'jane.doe@example.com',
  phone: '',
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<Profile>(defaultProfile);

  const updateProfile = (updated: Partial<Profile>) => {
    setProfile((prev) => ({ ...prev, ...updated }));
  };

  return (
    <ProfileContext.Provider value={{ profile, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};
