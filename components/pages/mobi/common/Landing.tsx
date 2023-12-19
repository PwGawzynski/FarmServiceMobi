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
import { useSelector } from 'react-redux';
import { createMachine } from 'xstate';
import { useActor } from '@xstate/react';
import { useQuery } from '@tanstack/react-query';
import { ScreenCard } from '../../../atoms/ScreenCard';
import { selectTheme } from '../../../../src/redux/feature/userSlice';
import { AuthDriverProps } from '../../../../types/self/navigation/props/AuthDriverProps';

const F_COMPLEMENT = 'arm';
const S_COMPLEMENT = 'ervice';
const ANIMATION_DURATION = 3000;
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
  const color = useTheme().background;
  const theme = useSelector(selectTheme);
  const [state, send] = useActor(LandingMachine, { input: { fetchCount: 1 } });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, isFetching, isSuccess, isError, refetch } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      if (Math.random()) throw new Error('ndiw');
      return '';
    },
    retry: 2,
    retryDelay: attempts => attempts * 1000,
  });

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(state.value, isSuccess, isError, isFetching);

    switch (state.value) {
      case 'fetching':
        if (isSuccess) send({ type: 'Landing.fetched' });
        if (isError) send({ type: 'Landing.fetchingError' });
        break;
      case 'fetchingError':
        break;
      case 'animating':
        opacity.value = withTiming(1, { duration: ANIMATION_DURATION });
        break;
      case 'waitRetry':
        break;
      case 'animated':
        // navigation.navigate('landing');
        break;
      default:
        break;
    }
  }, [isSuccess, isError, isFetching, state.value]);

  useEffect(() => {}, []);

  return (
    <ScreenCard filed={theme === 1}>
      {['animating', 'sanimated'].includes(state.value.toString()) && (
        <YStack f={1} justifyContent="center">
          <XStack alignItems="center">
            <H1
              fontWeight="$6"
              lineHeight="$12"
              fontStyle="italic"
              fontSize="$12"
              color={color}
            >
              F
            </H1>
            <Animated.View style={{ opacity, overflow: 'hidden' }}>
              <H2 color={color} fontSize="$9">
                {F_COMPLEMENT}
              </H2>
            </Animated.View>
            <H1
              fontWeight="$6"
              lineHeight="$12"
              fontStyle="italic"
              fontSize="$12"
              color={color}
            >
              S
            </H1>
            <Animated.View style={{ opacity, overflow: 'hidden' }}>
              <H2 color={color} fontSize="$9">
                {S_COMPLEMENT}
              </H2>
            </Animated.View>
          </XStack>
          <Text color={color} w="full" textAlign="right">
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
        {state.matches('fetching') && <Spinner />}
        {state.matches('waitRetry') && (
          <Button
            bg={color}
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
