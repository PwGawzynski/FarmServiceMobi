import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { memo, useEffect } from 'react';

export type FormErrorInfoProps = {
  error?: string;
  disappearingDuration?: number;
};
const APPEARING_DURATION = 300;
const DISAPPEARING_DURATION_DEFAULT = 300;

function FormErrorInfoFn({ error, disappearingDuration }: FormErrorInfoProps) {
  const opacity = useSharedValue(0);
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
      className="w-full h-full text-error-red text-center"
      style={[animatedStyle]}
    >
      {error}
    </Animated.Text>
  );
}

export const FormErrorInfo = memo(
  FormErrorInfoFn,
  (p, n) => p.error === n.error,
);
