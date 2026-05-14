import { appRoutes, authRoutes } from '@/configs';

export type AuthStackParamList = {
  [authRoutes.SIGN_UP]: undefined;
  [authRoutes.LOG_IN]: undefined;
};

export type RootStackParamList = {
  [appRoutes.AUTH_STACK]: undefined;
};
