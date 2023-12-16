import { H3, Stack, TamaguiProvider } from 'tamagui';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
// eslint-disable-next-line import/extensions
import config from './tamagui.config';

export default function App() {
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
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
    <TamaguiProvider defaultTheme="dark" config={config}>
      <Stack f={1} pl="$4" pr="$4">
        <SafeAreaView style={{ flex: 1 }}>
          <H3 style={{ textTransform: 'uppercase' }}>Notifications</H3>
        </SafeAreaView>
      </Stack>
    </TamaguiProvider>
  );
}
