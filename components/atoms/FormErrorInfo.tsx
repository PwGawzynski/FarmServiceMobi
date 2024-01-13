import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useEffect } from 'react';

export type Props = {
  error: string;
  disappearingDuration?: number;
};
const APPEARING_DURATION = 300;
const DISAPPEARING_DURATION_DEFAULT = 300;

export function FormErrorInfo({ error, disappearingDuration }: Props) {
  const opacity = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));
  if (error) opacity.value = withTiming(1, { duration: APPEARING_DURATION });
  useEffect(() => {
    const timeout = setTimeout(() => {
      opacity.value = withTiming(0, {
        duration: disappearingDuration ?? DISAPPEARING_DURATION_DEFAULT,
      });
    }, 3000);
    return () => clearTimeout(timeout);
  }, []);
  return (
    <Animated.Text
      className="ml-2 text-error-red flex-1"
      style={[animatedStyle]}
    >
      {error}
    </Animated.Text>
  );
}
