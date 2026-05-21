import { authRoutes } from '@/configs';
import { ForgotPasswordScreen, LoginScreen, SignUpScreen } from '@/screen/auth';
import { AuthStackParamList } from '@/types/navigation.types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

export const AuthNavigation = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name={authRoutes.LOG_IN} component={LoginScreen} />
      <AuthStack.Screen name={authRoutes.SIGN_UP} component={SignUpScreen} />
      <AuthStack.Screen
        name={authRoutes.FORGOT_PASSWORD}
        component={ForgotPasswordScreen}
      />
    </AuthStack.Navigator>
  );
};
