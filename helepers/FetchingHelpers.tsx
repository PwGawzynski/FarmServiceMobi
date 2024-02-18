import Toast from 'react-native-toast-message';
import { QueryClient } from '@tanstack/react-query';
import { MutableRefObject } from 'react';
import { t } from 'i18next';
import {
  MIN_QUERY_RETRY_COUNT,
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
) {
  if (!queryLog)
    queryClient.current
      .fetchQuery({
        queryKey: ['clients'],
        retry: MIN_QUERY_RETRY_COUNT,
        retryDelay: retryCount => retryCount * QUERY_RETRY_DELAY_MULTIPLICATION,
      })
      .then(console.log)
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
