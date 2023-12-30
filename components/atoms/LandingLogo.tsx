import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { View } from 'react-native';

const ANIMATION_DURATION = 3000;

export type Props = {
  play: boolean;
};

export function LandingLogo({ play }: Props) {
  const opacity = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  if (play) opacity.value = withTiming(1, { duration: ANIMATION_DURATION });
  return (
    <View className="justify-center ">
      <Animated.Text
        style={[animatedStyle]}
        className="text-3xl text-dark dark:text-green font-bold"
      >
        FarmService
      </Animated.Text>
    </View>
  );
}
