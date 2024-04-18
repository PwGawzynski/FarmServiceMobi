import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useActor } from '@xstate/react';
import { ActivityIndicator, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { QueryClient } from '@tanstack/react-query';
import { UserRole } from '../../../../../FarmServiceApiTypes/User/Enums';
import { AuthDriverProps } from '../../../../../types/self/navigation/Owner/props/AuthDriverProps';
import {
  InitializationStatus,
  selectInitStatus,
  selectUser,
} from '../../../../../src/redux/feature/userSlice';
import { selectQueryFetchLog } from '../../../../../src/redux/feature/cachingDriverSlice';
import { getClients } from '../../../../../api/clients/Client';
import { fetchClientDriver } from '../../../../../helepers/FetchingHelpers';
import { ScreenBase } from '../common/ScreenBase';
import { LandingLogo } from '../../../../atoms/LandingLogo';
import { TranslationNames } from '../../../../../locales/TranslationNames';
import { matchesAny } from '../../../../../helepers/StateMachines/MatchesAny';
import { LandingMachine } from '../../../../../helepers/StateMachines/LandingMachine';
import { EXPO_PUBLIC_QUERY_STALE_TIME } from '../../../../../settings/query/querySettings';

function provideActionsBaseOnStates(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  state: any,
  userIntStatus: InitializationStatus | undefined,
  role: UserRole | undefined,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  company: any,
  navigation: AuthDriverProps<'landing'>['navigation'],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  send: any,
) {
  switch (state.value) {
    case 'checkUserContextReady':
      if (userIntStatus === InitializationStatus.FULFILLED)
        send({ type: 'ready', userRole: role });

      if (userIntStatus === InitializationStatus.REJECTED)
        send({ type: 'unreachable' });

      break;
    case 'unreachable':
      if (!role) navigation.navigate('chooseLoginType');
      break;

    case 'userIsOwner':
      if (company)
        navigation.navigate('ownerRootDriver', {
          screen: 'activityDriver',
          params: {
            screen: 'activityDesktopRoot',
            params: {
              screen: 'lastActivities',
            },
          },
        });
      if (!company) navigation.navigate('createCompany');

      break;
    case 'userIsWorker':
      navigation.navigate('workerRootDriver', {
        screen: 'workerAssignationScreen',
      });
      break;
    default:
      break;
  }
}

export default function Landing({ navigation }: AuthDriverProps<'landing'>) {
  const { t } = useTranslation();
  const userIntStatus = useSelector(selectInitStatus);
  const { role, company } = useSelector(selectUser) ?? {};
  const [state, send] = useActor(LandingMachine, { input: { fetchCount: 1 } });
  const queryLog = useSelector(selectQueryFetchLog('clients-fetch-error'));
  const dispatch = useDispatch();
  const queryClient = useRef(
    new QueryClient({
      defaultOptions: {
        queries: {
          queryFn: getClients,
          refetchOnWindowFocus: false,
          refetchOnMount: false,
          staleTime: EXPO_PUBLIC_QUERY_STALE_TIME,
          gcTime: EXPO_PUBLIC_QUERY_STALE_TIME,
          retry: 1,
        },
      },
    }),
  );
  useEffect(() => {
    const intervalId = fetchClientDriver(
      queryClient,
      queryLog,
      dispatch,
      role !== UserRole.Owner,
    );
    if (intervalId) return () => clearInterval(intervalId);
    return undefined;
  }, [queryLog]);

  useEffect(() => {
    provideActionsBaseOnStates(
      state,
      userIntStatus,
      role,
      company,
      navigation,
      send,
    );
  }, [state.value, userIntStatus]);

  return (
    <ScreenBase>
      <View className="flex-1 items-center justify-end">
        <LandingLogo play={state.context.animationPlayed} />
      </View>
      <View className="flex-1 items-center justify-end">
        {matchesAny(
          state,
          { userIsWorker: 'sseOpening' },
          { userIsWorker: 'sseOpened' },
        ) && (
          <View>
            <ActivityIndicator />
            <Text className="text-dark dark:text-green">
              {t(TranslationNames.screens.authDriver.landing.connecting)}
            </Text>
          </View>
        )}
      </View>
    </ScreenBase>
  );
}
