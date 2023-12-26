import { TamaguiProvider } from 'tamagui';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './i18next';
import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';
import { View } from 'react-native';
import AuthDriver from './components/navigators/AuthDriver';
import store from './src/redux/app/Store';
// eslint-disable-next-line import/extensions
import tamaguiConfig from './tamagui.config';
import { Api } from './api/Api';
import { UseTheme } from './hooks/UseTheme';

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
    Api.init();
  }, []);
  const theme = UseTheme();
  if (!loaded) return <View />;

  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <TamaguiProvider defaultTheme={theme} config={tamaguiConfig}>
          <NavigationContainer>
            <I18nextProvider i18n={i18next}>
              <AuthDriver />
            </I18nextProvider>
          </NavigationContainer>
        </TamaguiProvider>
      </Provider>
    </QueryClientProvider>
  );
}
