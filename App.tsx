import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './i18next';
import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';
import { RootSiblingParent } from 'react-native-root-siblings';
import AuthDriver from './components/navigators/AuthDriver';
import store from './src/redux/app/Store';
import { setUpUser } from './src/redux/feature/userSlice';
import {
  MIN_QUERY_RETRY_COUNT,
  QUERY_RETRY_DELAY_MULTIPLICATION,
} from './settings/query/querySettings';

export default function App() {
  useEffect(() => {
    // Api init is moved to redux store, if store will be moved, api init should be here
    store.dispatch(setUpUser());
  }, []);

  const queryClient = new QueryClient({
    defaultOptions: {
      mutations: {
        retry: MIN_QUERY_RETRY_COUNT,
        retryDelay: retryCount => retryCount * QUERY_RETRY_DELAY_MULTIPLICATION,
      },
    },
  });
  console.log(MIN_QUERY_RETRY_COUNT, QUERY_RETRY_DELAY_MULTIPLICATION);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <NavigationContainer>
            <I18nextProvider i18n={i18next}>
              <RootSiblingParent>
                <AuthDriver />
              </RootSiblingParent>
            </I18nextProvider>
          </NavigationContainer>
        </Provider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
