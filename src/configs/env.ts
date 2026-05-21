import { Platform } from 'react-native';

export const firebaseCollections = {
  USERS: 'users',
  TASKS: 'tasks',
} as const;

export const isAndroid = Platform.OS === 'android';
export const isIOS = Platform.OS === 'ios';
