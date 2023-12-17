import { TamaguiProvider } from 'tamagui';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
// eslint-disable-next-line import/extensions
import config from './tamagui.config';
import AuthDriver from './components/navigators/AuthDriver';
import store from './src/redux/app/Store';

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

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <TamaguiProvider defaultTheme="dark" config={config}>
        <NavigationContainer>
          <AuthDriver />
        </NavigationContainer>
      </TamaguiProvider>
    </Provider>
  );
}
