import {
  Button,
  H1,
  H2,
  Spinner,
  Text,
  useTheme,
  XStack,
  YStack,
} from 'tamagui';
import Animated, { useSharedValue, withTiming } from 'react-native-reanimated';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createMachine } from 'xstate';
import { useActor } from '@xstate/react';
import { useQuery } from '@tanstack/react-query';
import { HttpStatusCode } from 'axios';
import { ScreenCard } from '../../../atoms/ScreenCard';
import { selectTheme, setUser } from '../../../../src/redux/feature/userSlice';
import { AuthDriverProps } from '../../../../types/self/navigation/props/AuthDriverProps';
import { me } from '../../../../api/services/User';
import { setThemeToStorage } from '../../../../helepers/ThemeHelpers';

/**
 * CONSTANTS
 */
const F_COMPLEMENT = 'arm';
const S_COMPLEMENT = 'ervice';
const ANIMATION_DURATION = 3000;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const TOAST_DURATION = 5000;
// TODO: change to 3
const RETRY_MAX_ATTEMPTS = 2;
const RETRY_INTERVAL = 1000;

/**
 * Driver to manage all screen states
 */
const LandingMachine = createMachine({
  id: 'Landing',
  initial: 'fetching',
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
      after: {
        '3000': {
          target: '#Landing.animated',
        },
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
  },
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Landing({ navigation }: AuthDriverProps<'landing'>) {
  const opacity = useSharedValue(0);
  const bgColor = useTheme().background;
  // const { color } = useTheme();
  const theme = useSelector(selectTheme);
  const dispatch = useDispatch();
  const [state, send] = useActor(LandingMachine, { input: { fetchCount: 1 } });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, isFetching, isSuccess, isError, error, refetch } = useQuery({
    queryKey: ['user'],
    queryFn: me,
    retry: RETRY_MAX_ATTEMPTS,
    retryDelay: attempts => attempts * RETRY_INTERVAL,
  });

  useEffect(() => {
    console.log(state.value, isSuccess, isError, isFetching, data);
    if (data) {
      dispatch(setUser(data));
      (async () => {
        if (data.account.theme) {
          console.log('test', data.account.theme);
          // TODO toast when cannot set theme
          setThemeToStorage(data.account.theme);
        }
      })();
    }

    switch (state.value) {
      case 'fetching':
        if (isSuccess) send({ type: 'Landing.fetched' });
        if (isError) send({ type: 'Landing.fetchingError' });
        break;
      case 'animating':
        opacity.value = withTiming(1, { duration: ANIMATION_DURATION });
        break;
      case 'waitRetry':
        if (error?.cause === HttpStatusCode.Unauthorized)
          navigation.navigate('login');
        // TODO: add toast
        else if (error) {
          console.log(error);
        }
        /* Toast.warn(error.message, 'top'); */ break;
      case 'animated':
        // navigation.navigate('landing');
        break;
      default:
        break;
    }
  }, [isSuccess, isError, isFetching, state.value, data]);

  return (
    <ScreenCard filed={theme === 1}>
      {['animating', 'animated'].includes(state.value.toString()) && (
        <YStack f={1} justifyContent="center">
          <XStack alignItems="center">
            <H1
              fontWeight="$6"
              lineHeight="$12"
              fontStyle="italic"
              fontSize="$12"
              color={bgColor}
            >
              F
            </H1>
            <Animated.View style={{ opacity, overflow: 'hidden' }}>
              <H2 color={bgColor} fontSize="$9">
                {F_COMPLEMENT}
              </H2>
            </Animated.View>
            <H1
              fontWeight="$6"
              lineHeight="$12"
              fontStyle="italic"
              fontSize="$12"
              color={bgColor}
            >
              S
            </H1>
            <Animated.View style={{ opacity, overflow: 'hidden' }}>
              <H2 color={bgColor} fontSize="$9">
                {S_COMPLEMENT}
              </H2>
            </Animated.View>
          </XStack>
          <Text color={bgColor} w="full" textAlign="right">
            ® By PwG
          </Text>
        </YStack>
      )}
      <YStack
        position="absolute"
        b={50}
        flexDirection="column"
        justifyContent="center"
        f={0.2}
      >
        {state.matches('fetching') && (
          <YStack>
            <Spinner />
            <Text mt="$4" color={bgColor}>
              Connecting...
            </Text>
          </YStack>
        )}
        {state.matches('waitRetry') && (
          <Button
            bg={bgColor}
            color="$color"
            onPress={() => {
              refetch();
              send({ type: 'Landing.fetching' });
            }}
          >
            Retry Login
          </Button>
        )}
      </YStack>
    </ScreenCard>
  );
}
