import { appRoutes } from '@/configs';
import { AuthNavigation } from './AuthStack';
import { RootStackParamList } from '@/types/navigation.types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const RootStack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigation = () => {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen
        name={appRoutes.AUTH_STACK}
        component={AuthNavigation}
      />
    </RootStack.Navigator>
  );
};
