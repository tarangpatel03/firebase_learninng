import { appRoutes } from '@/configs';
import { AuthNavigation } from './AuthStack';
import { RootStackParamList } from '@/types/navigation.types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '@/screen/home/HomeTasks';
import { createNavigationContainerRef } from '@react-navigation/native';
import { useUserStore } from '@/store/useUserStore';
import { GlobalLoader } from '@/components';

const RootStack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigation = () => {
  const isLoggedIN = useUserStore(state => state.isLoggedIn);
  const hasHydrated = useUserStore(state => state.hasHydrated);

  if (!hasHydrated) {
    return <GlobalLoader />;
  }

  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {isLoggedIN ? (
        <RootStack.Screen name={appRoutes.HOME} component={HomeScreen} />
      ) : (
        <RootStack.Screen
          name={appRoutes.AUTH_STACK}
          component={AuthNavigation}
        />
      )}
    </RootStack.Navigator>
  );
};

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export function navigate<RouteName extends keyof RootStackParamList>(
  ...args: Parameters<typeof navigationRef.navigate<RouteName>>
) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(...args);
  }
}
