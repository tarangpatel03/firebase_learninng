import { useCallback, useState } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { showErrorToast, showSuccessToast } from '@/lib/toast';
import { appTexts } from '@/constants';
import firestore from '@react-native-firebase/firestore';
import { firebaseCollections } from '@/configs';
import { useUserStore } from '@/store/useUserStore';

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
      error instanceof Error ? error.message : appTexts.SOMETHING_WENT_WRONG;

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

        await firestore()
          .collection(firebaseCollections.USERS)
          .doc(response.user.uid)
          .set({
            uid: response.user.uid,
            email: response.user.email,
            createdAt: Date.now(),
          });

        await response.user.sendEmailVerification();
        await signOut();
        showSuccessToast(appTexts.ACCOUNT_CREATED);
        return true;
      } catch (error) {
        console.log(error);
        handleError(error);
      } finally {
        setState(prev => ({ ...prev, isLoading: false }));
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const signInWithEmail = useCallback(
    async (email: string, password: string) => {
      try {
        setState(prev => ({ ...prev, isLoading: true }));

        const response = await auth().signInWithEmailAndPassword(
          email.trim(),
          password,
        );
        if (response.user.emailVerified) {
          setState({
            user: response.user,
            isLoading: false,
          });
          useUserStore.getState().setIsLoggedIn(true);
        } else {
          await auth().signOut();
          showErrorToast(appTexts.EMAIL_NOT_VERIFIED);
          return null;
        }

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
      setState(prev => ({ ...prev, isLoading: true }));

      await auth().signOut();
      useUserStore.getState().setIsLoggedIn(false);
      useUserStore.getState().clearUid();

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

  const forgotPassword = useCallback(async (email: string) => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));

      await auth().sendPasswordResetEmail(email.trim());
      showSuccessToast(appTexts.PASSWORD_RESET_EMAIL_SENT);
      return true;
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
    forgotPassword,
  };
};
