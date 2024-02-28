import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { assign, setup } from 'xstate';
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
import {
  LANDING_ANIMATION_DURATION,
  LandingLogo,
} from '../../../../atoms/LandingLogo';
import { TranslationNames } from '../../../../../locales/TranslationNames';
import { matchesAny } from '../../../../../helepers/StateMachines/MatchesAny';

const LandingMachine = setup({
  types: {} as {
    events:
      | { type: 'ready'; userRole: UserRole | undefined }
      | { type: 'unreachable' };
    context: {
      animationPlayed: boolean;
      userRole: UserRole | undefined;
    };
  },
  guards: {
    isOwner: machine => machine.context.userRole === UserRole.Owner,
    isWorker: machine => machine.context.userRole === UserRole.Worker,
  },
}).createMachine({
  id: 'Landing',
  initial: 'animating',
  context: {
    userRole: undefined,
    animationPlayed: false,
  },
  states: {
    animating: {
      always: {
        actions: assign({
          animationPlayed: true,
        }),
        target: '#Landing.animated',
      },
    },
    animated: {
      after: {
        [LANDING_ANIMATION_DURATION]: {
          target: 'checkUserContextReady',
        },
      },
    },
    checkUserContextReady: {
      on: {
        ready: {
          actions: assign({
            userRole: incoming => {
              return incoming.event.userRole;
            },
          }),
          target: 'contextReady',
        },
        unreachable: {
          target: 'unreachable',
        },
      },
    },
    contextReady: {
      always: [
        {
          guard: 'isOwner',
          target: 'userIsOwner',
        },
        {
          guard: 'isWorker',
          target: 'userIsWorker',
        },
      ],
    },
    userIsOwner: {},
    userIsWorker: {},
    unreachable: {},
  },
});

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
          queryKey: ['clients'],
          queryFn: getClients,
          refetchOnWindowFocus: false,
          refetchOnMount: false,
          retry: 1,
        },
      },
    }),
  );
  useEffect(() => {
    const intervalId = fetchClientDriver(queryClient, queryLog, dispatch);
    if (intervalId) return () => clearInterval(intervalId);
    return undefined;
  }, [queryLog]);

  useEffect(() => {
    if (state.value === 'checkUserContextReady') {
      if (userIntStatus === InitializationStatus.FULFILLED) {
        console.log(role);
        send({ type: 'ready', userRole: role });
      }
      if (userIntStatus === InitializationStatus.REJECTED)
        send({ type: 'unreachable' });
    } else if (state.value === 'unreachable') {
      if (!role) navigation.navigate('chooseLoginType');
    } else if (state.value === 'userIsOwner') {
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
    } else if (state.value === 'userIsWorker') {
      navigation.navigate('workerRootDriver', {
        screen: 'workerAssignationScreen',
      });
    }
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
