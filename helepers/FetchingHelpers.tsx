import Toast from 'react-native-toast-message';
import { QueryClient } from '@tanstack/react-query';
import { MutableRefObject } from 'react';
import { t } from 'i18next';
import {
  EXPO_PUBLIC_QUERY_STALE_TIME,
  QUERY_RETRY_DELAY_MULTIPLICATION,
} from '../settings/query/querySettings';
import {
  LogI,
  setQueryFetchLogs,
} from '../src/redux/feature/cachingDriverSlice';
import { TranslationNames } from '../locales/TranslationNames';

export function fetchClientDriver(
  queryClient: MutableRefObject<QueryClient>,
  queryLog: LogI | undefined,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: any,
  preventFetch?: boolean,
) {
  if (!queryLog && !preventFetch)
    queryClient.current
      .fetchQuery({
        queryKey: ['clients'],
        staleTime: EXPO_PUBLIC_QUERY_STALE_TIME,
        gcTime: EXPO_PUBLIC_QUERY_STALE_TIME,
        retryDelay: retryCount => retryCount * QUERY_RETRY_DELAY_MULTIPLICATION,
      })
      .then(data => {
        queryClient.current.setQueryData(['clients'], data);
      })
      .catch(() => {
        dispatch(
          setQueryFetchLogs({
            key: 'clients-fetch-error',
            value: {
              lastOccurredAt: new Date().toString(),
            },
          }),
        );
        Toast.show({
          type: 'error',
          text1: t(TranslationNames.components.toast.clientsFetchErrorHeader),
          text2: t(TranslationNames.components.toast.clientsFetchErrorContext),
        });
      });
  return undefined;
}
