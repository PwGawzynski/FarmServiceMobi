import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { assign, createMachine } from 'xstate';
import { useActor } from '@xstate/react';
import { ActivityIndicator, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import {
  InitializationStatus,
  selectInitStatus,
  selectIsLogged,
  selectUserRole,
} from '../../../../src/redux/feature/userSlice';
import { AuthDriverProps } from '../../../../types/self/navigation/props/AuthDriverProps';
import { ScreenBase } from '../common/ScreenBase';
import {
  LANDING_ANIMATION_DURATION,
  LandingLogo,
} from '../../../atoms/LandingLogo';
import { TranslationNames } from '../../../../locales/TranslationNames';
import { UserRole } from '../../../../FarmServiceApiTypes/User/Enums';

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
  const isLogged = useSelector(selectIsLogged);
  const role = useSelector(selectUserRole);
  const [state, send] = useActor(LandingMachine, { input: { fetchCount: 1 } });

  console.log(userIntStatus, isLogged, state.value);
  useEffect(() => {
    switch (state.value) {
      case 'checkUserContextReady':
        if (userIntStatus === InitializationStatus.FULFILLED)
          send({ type: 'ready' });
        if (userIntStatus === InitializationStatus.REJECTED)
          send({ type: 'unreachable' });
        break;
      case 'unreachable':
        if (!isLogged) navigation.navigate('chooseLoginType');
        break;
      case 'contextReady':
        if (isLogged && role === UserRole.Owner)
          navigation.navigate('ownerRootDriver', {
            screen: 'activityDriver',
            params: {
              screen: 'activityDesktopRoot',
              params: {
                screen: 'lastActivities',
              },
            },
          });
        break;
      default:
        break;
    }
  }, [state.value, userIntStatus, isLogged]);
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
