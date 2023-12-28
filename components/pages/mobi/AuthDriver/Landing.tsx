import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { assign, createMachine } from 'xstate';
import { useActor } from '@xstate/react';
import { useQuery } from '@tanstack/react-query';
import { HttpStatusCode } from 'axios';
import { ActivityIndicator, Text, View } from 'react-native';
import Toast from 'react-native-root-toast';
import { setUser } from '../../../../src/redux/feature/userSlice';
import { AuthDriverProps } from '../../../../types/self/navigation/props/AuthDriverProps';
import { me } from '../../../../api/services/User';
import { ScreenBase } from '../common/ScreenBase';
import { Colors } from '../../../../settings/styles/colors';
import { Theme } from '../../../../FarmServiceApiTypes/Account/Constants';
import { UseStoredTheme } from '../../../../hooks/UseStoredTheme';
import { LandingLogo } from '../../../atoms/LandingLogo';
import {
  RETRY_INTERVAL,
  RETRY_MAX_ATTEMPTS,
} from '../../../../settings/query/querySettings';
import { TOAST_DURATION } from '../../../../settings/Toast/toastSettings';

/**
 * Driver to manage all screen states
 */
const LandingMachine = createMachine({
  id: 'Landing',
  initial: 'fetching',
  context: {
    animationPlayed: false,
  },
  states: {
    fetching: {
      on: {
        'Landing.fetched': {
          target: 'animating',
        },
        'Landing.fetchingError': {
          target: 'waitRetry',
        },
      },
    },
    waitRetry: {
      on: {
        'Landing.fetching': {
          target: 'fetching',
        },
      },
    },
    animating: {
      always: {
        actions: assign({
          animationPlayed: true,
        }),
        target: '#Landing.animated',
      },
    },
    animated: {},
  },
  types: {} as {
    events:
      | { type: 'Landing.fetching' }
      | { type: 'Landing.fetchCountLimitAchieved' }
      | { type: 'Landing.fetched' }
      | { type: 'Landing.fetchingError' }
      | { type: 'Landing.Retry' };
    context: {
      animationPlayed: boolean;
    };
  },
});

export default function Landing({ navigation }: AuthDriverProps<'landing'>) {
  const { theme, setTheme } = UseStoredTheme();
  const dispatch = useDispatch();
  const [state, send] = useActor(LandingMachine, { input: { fetchCount: 1 } });

  const { data, isFetching, isSuccess, isError, error } = useQuery({
    queryKey: ['user'],
    queryFn: me,
    retry: RETRY_MAX_ATTEMPTS,
    retryDelay: attempts => attempts * RETRY_INTERVAL,
  });
  useEffect(() => {
    if (data) {
      dispatch(setUser(data));
      (async () => {
        if (data?.account?.theme !== undefined) {
          setTheme(data.account.theme);
        }
      })();
    }
    switch (state.value) {
      case 'fetching':
        if (isSuccess) send({ type: 'Landing.fetched' });
        if (isError) send({ type: 'Landing.fetchingError' });
        break;
      case 'waitRetry':
        if (error?.cause === HttpStatusCode.Unauthorized)
          navigation.navigate('login');
        else if (error)
          Toast.show(error.message, {
            backgroundColor:
              theme === Theme.light ? Colors.WHITE : Colors.GREEN,
            textColor: Colors.DARK,
            duration: TOAST_DURATION,
          });
        break;
      default:
        break;
    }
  }, [isSuccess, isError, isFetching, state.value, data]);
  return (
    <ScreenBase>
      <View className="flex-1 items-center justify-end">
        <LandingLogo play={state.context.animationPlayed} />
      </View>
      <View className="flex-1 items-center justify-end">
        {state.value === 'fetching' && (
          <View>
            <ActivityIndicator />
            <Text className="text-dark dark:text-green">Connecting...</Text>
          </View>
        )}
      </View>
    </ScreenBase>
  );
}
