import { useTheme, View } from 'tamagui';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { useEffect } from 'react';
import { Dimensions } from 'react-native';
import ToRightArrow from '../../assets/toRightArrow.svg';

const OFFSET = Dimensions.get('window').width / 2;
const DURATION = 2000;

export function SwipeRightAnimated() {
  const { color } = useTheme();
  const offset = useSharedValue(-OFFSET);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
  }));

  useEffect(() => {
    offset.value = withRepeat(
      withTiming(OFFSET * 2, {
        duration: DURATION,
        easing: Easing.ease,
      }),
      -1,
      false,
    );
  }, []);
  return (
    <View className="w-2/3 h-1/2 items-start justify-center">
      <View className="h-[50px] w-full items-start justify-center border-green border-2 border-solid rounded-full overflow-hidden">
        <Animated.View style={[animatedStyles]}>
          <ToRightArrow width={40} height={40} color={color?.val} />
        </Animated.View>
      </View>
    </View>
  );
}
