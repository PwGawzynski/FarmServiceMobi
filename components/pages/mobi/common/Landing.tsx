import { H1, H2, Text, useTheme, XStack, YStack } from 'tamagui';
import Animated, { useSharedValue, withTiming } from 'react-native-reanimated';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ScreenCard } from '../../../atoms/ScreenCard';
import { selectTheme } from '../../../../src/redux/feature/userSlice';

export default function Landing() {
  const F_COMPLEMENT = 'arm';
  const S_COMPLEMENT = 'ervice';
  const ANIMATION_DURATION = 3000;
  const opacity = useSharedValue(0);
  const color = useTheme().background;

  const theme = useSelector(selectTheme);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: ANIMATION_DURATION });
  }, []);

  return (
    <ScreenCard flexDirection="row" filed={theme === 1}>
      <YStack>
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
        <Text color="$color" w="full" textAlign="right">
          ® By PwG
        </Text>
      </YStack>
    </ScreenCard>
  );
}
