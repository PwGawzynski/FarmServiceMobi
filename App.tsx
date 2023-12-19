import { TamaguiProvider } from 'tamagui';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastProvider } from '@tamagui/toast';
import AuthDriver from './components/navigators/AuthDriver';
import store from './src/redux/app/Store';
// eslint-disable-next-line import/extensions
import tamaguiConfig from './tamagui.config';

export default function App() {
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterItalic: require('@tamagui/font-inter/otf/Inter-MediumItalic.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
    InterBoldItalic: require('@tamagui/font-inter/otf/Inter-BoldItalic.otf'),
    InterSemiBold: require('@tamagui/font-inter/otf/Inter-SemiBold.otf'),
    InterSemiBoldItalic: require('@tamagui/font-inter/otf/Inter-SemiBoldItalic.otf'),
    InterExtraBold: require('@tamagui/font-inter/otf/Inter-ExtraBold.otf'),
    InterExtraBoldItalic: require('@tamagui/font-inter/otf/Inter-ExtraBoldItalic.otf'),
  });

  useEffect(() => {
    if (loaded) {
      // can hide splash screen here
    }
  }, [loaded]);
  const theme = 1;
  if (!loaded) return null;

  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <TamaguiProvider
          defaultTheme={theme === 1 ? 'dark' : 'light'}
          config={tamaguiConfig}
        >
          <NavigationContainer>
            <ToastProvider native burntOptions={{ from: 'top' }}>
              <AuthDriver />
            </ToastProvider>
          </NavigationContainer>
        </TamaguiProvider>
      </Provider>
    </QueryClientProvider>
  );
}
