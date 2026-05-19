// src/shared/hooks/useAuth.ts

import { useCallback, useState } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { showErrorToast } from '@/lib/toast';

type AuthUser = FirebaseAuthTypes.User | null;

type AuthState = {
  user: AuthUser;
  isLoading: boolean;
};

export const useAuth = () => {
  const [state, setState] = useState<AuthState>({
    user: auth().currentUser,
    isLoading: false,
  });

  const handleError = (error: unknown) => {
    const message =
      error instanceof Error ? error.message : 'Something went wrong';

    showErrorToast(message);
  };

  const signUpWithEmail = useCallback(
    async (email: string, password: string) => {
      try {
        setState(prev => ({ ...prev, isLoading: true }));

        const response = await auth().createUserWithEmailAndPassword(
          email.trim(),
          password,
        );

        setState({
          user: response.user,
          isLoading: false,
        });

        return response.user;
      } catch (error) {
        handleError(error);
      } finally {
        setState(prev => ({ ...prev, isLoading: false }));
      }
    },
    [],
  );

  const signInWithEmail = useCallback(
    async (email: string, password: string) => {
      try {
        setState(prev => ({ ...prev, isLoading: true, error: null }));

        const response = await auth().signInWithEmailAndPassword(
          email.trim(),
          password,
        );

        setState({
          user: response.user,
          isLoading: false,
        });

        return response.user;
      } catch (error) {
        handleError(error);
      } finally {
        setState(prev => ({ ...prev, isLoading: false }));
      }
    },
    [],
  );

  const signOut = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));

      await auth().signOut();

      setState({
        user: null,
        isLoading: false,
      });
    } catch (error) {
      handleError(error);
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  return {
    user: state.user,
    isLoading: state.isLoading,

    signUpWithEmail,
    signInWithEmail,
    signOut,
  };
};
