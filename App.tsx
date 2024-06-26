import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useEffect } from 'react';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './i18next';
import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';
import { RootSiblingParent } from 'react-native-root-siblings';
import { useFonts } from 'expo-font';
import { useColorScheme } from 'nativewind';
import { useReactQueryDevTools } from '@dev-plugins/react-query';
import { useReactNavigationDevTools } from '@dev-plugins/react-navigation';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AuthDriver from './components/navigators/AuthDriver';
import store from './src/redux/app/Store';
import { setUpUser } from './src/redux/feature/userSlice';
import {
  MIN_QUERY_RETRY_COUNT,
  QUERY_RETRY_DELAY_MULTIPLICATION,
} from './settings/query/querySettings';

export default function App() {
  const theme = useColorScheme();
  useEffect(() => {
    // Api init is moved to redux store, if store will be moved, api init should be here
    if (theme) {
      store.dispatch(setUpUser(theme.colorScheme));
    }
  }, []);

  const queryClient = new QueryClient({
    defaultOptions: {
      mutations: {
        retry: MIN_QUERY_RETRY_COUNT,
        retryDelay: retryCount => retryCount * QUERY_RETRY_DELAY_MULTIPLICATION,
      },
    },
  });
  // TODO fix fonts
  useFonts({
    Helvetica: require('./helvetica/Helvetica/Helvetica.ttf'),
  });
  const navigationRef = useNavigationContainerRef();
  useReactNavigationDevTools(navigationRef);
  useReactQueryDevTools(queryClient);
  GoogleSignin.configure({
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID,
  });
  if (!theme) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <NavigationContainer ref={navigationRef}>
            <I18nextProvider i18n={i18next}>
              <RootSiblingParent>
                <AuthDriver />
              </RootSiblingParent>
            </I18nextProvider>
          </NavigationContainer>
        </Provider>
        {/* <DevToolsBubble /> */}
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
