import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { assign, createMachine } from 'xstate';
import { useActor } from '@xstate/react';
import { ActivityIndicator, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import {
  InitializationStatus,
  selectInitStatus,
  selectUser,
} from '../../../../src/redux/feature/userSlice';
import { AuthDriverProps } from '../../../../types/self/navigation/props/AuthDriverProps';
import { ScreenBase } from '../common/ScreenBase';
import {
  LANDING_ANIMATION_DURATION,
  LandingLogo,
} from '../../../atoms/LandingLogo';
import { TranslationNames } from '../../../../locales/TranslationNames';
import { UserRole } from '../../../../FarmServiceApiTypes/User/Enums';
import { getClients } from '../../../../api/clients/Client';

const LandingMachine = createMachine({
  id: 'Landing',
  initial: 'animating',
  context: {
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
          target: 'contextReady',
        },
        unreachable: {
          target: 'unreachable',
        },
      },
    },
    contextReady: {},
    unreachable: {},
  },
  types: {} as {
    events: { type: 'ready' } | { type: 'unreachable' };
    context: {
      animationPlayed: boolean;
    };
  },
});

export default function Landing({ navigation }: AuthDriverProps<'landing'>) {
  const { t } = useTranslation();
  const userIntStatus = useSelector(selectInitStatus);
  const { role, company } = useSelector(selectUser) ?? {};
  const [state, send] = useActor(LandingMachine, { input: { fetchCount: 1 } });
  // PREFETCH clients
  useQuery({
    queryKey: ['clients'],
    queryFn: getClients,
    notifyOnChangeProps: [],
  });

  console.log('render');
  useEffect(() => {
    switch (state.value) {
      case 'checkUserContextReady':
        if (userIntStatus === InitializationStatus.FULFILLED)
          send({ type: 'ready' });
        if (userIntStatus === InitializationStatus.REJECTED)
          send({ type: 'unreachable' });
        break;
      case 'unreachable':
        if (!role) navigation.navigate('chooseLoginType');
        break;
      case 'contextReady':
        console.log(company, 'test');
        if (role === UserRole.Owner && company)
          navigation.navigate('ownerRootDriver', {
            screen: 'activityDriver',
            params: {
              screen: 'activityDesktopRoot',
              params: {
                screen: 'lastActivities',
              },
            },
          });
        if (role === UserRole.Owner && !company)
          navigation.navigate('createCompany');
        break;
      default:
        break;
    }
  }, [state.value, userIntStatus]);
  return (
    <ScreenBase>
      <View className="flex-1 items-center justify-end">
        <LandingLogo play={state.context.animationPlayed} />
      </View>
      <View className="flex-1 items-center justify-end">
        {state.value === 'fetching' && (
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
