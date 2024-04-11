import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { SizableText } from 'tamagui';
import { useEffect } from 'react';

export interface BlinkingHeaderProps {
  isPlayed?: boolean;
  cName?: string;
  text?: string;
  bePresent?: boolean;
}

const ANIMATION_DURATION = 1000;
const UNMOUNT_DURATION = 200;

export function BlinkingHeader({
  isPlayed,
  cName,
  text,
  bePresent,
}: BlinkingHeaderProps) {
  const blinkAnim = useSharedValue(0);
  const blinkingStyle = useAnimatedStyle(() => {
    return {
      opacity: blinkAnim.value,
    };
  }, []);

  if (isPlayed)
    blinkAnim.value = withRepeat(
      withTiming(1, { duration: ANIMATION_DURATION }),
      -1,
      true,
    );

  useEffect(() => {
    return () => {
      blinkAnim.value = withTiming(0, { duration: UNMOUNT_DURATION });
    };
  }, []);

  if (!bePresent && !isPlayed) return null;

  return (
    <Animated.View style={[blinkingStyle]}>
      <SizableText
        color="$color10"
        className={`uppercase font-bold text-lg text-center ${cName}`}
      >
        {text}
      </SizableText>
    </Animated.View>
  );
}
