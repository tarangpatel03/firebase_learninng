import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type UserStore = {
  uid: string;
  isLoggedIn: boolean;
  hasHydrated: boolean;

  setUid: (uid: string) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  clearUid: () => void;
  setHasHydrated: (value: boolean) => void;
};

export const useUserStore = create<UserStore>()(
  persist(
    set => ({
      uid: '',
      isLoggedIn: false,
      hasHydrated: false,
      setIsLoggedIn: isLoggedIn => set({ isLoggedIn }),
      setUid: uid => set({ uid }),
      clearUid: () => set({ uid: '' }),
      setHasHydrated: value => set({ hasHydrated: value }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => state => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
