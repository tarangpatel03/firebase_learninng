import { setToastBottomInset, toastConfig } from '@/lib/toast';
import { navigationRef, RootNavigation } from '@/navigation';
import { NavigationContainer } from '@react-navigation/native';
import { useEffect } from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const ToastInsetSync = () => {
    const insets = useSafeAreaInsets();

    useEffect(() => {
      setToastBottomInset(insets.bottom);
    }, [insets.bottom]);

    return null;
  };

  return (
    <SafeAreaProvider>
      <ToastInsetSync />
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NavigationContainer ref={navigationRef}>
        <RootNavigation />
        <Toast config={toastConfig} />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
