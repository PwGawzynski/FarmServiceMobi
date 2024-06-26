import { ActivityIndicator, ActivityIndicatorProps } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { SizableText, useTheme } from 'tamagui';

export type PendingInfoProps = {
  isVisible: boolean;
  infoText?: string;
  column?: boolean;
  size?: ActivityIndicatorProps['size'];
  addClassName?: string;
};

export function PendingInfo({
  infoText,
  isVisible,
  column,
  size,
  addClassName,
}: PendingInfoProps) {
  const opacity = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));
  const { color } = useTheme();

  if (isVisible) opacity.value = withTiming(1, { duration: 200 });
  else return null;

  return (
    <Animated.View
      style={[animatedStyle]}
      className={`flex-1 min-w-[100%] ${
        column ? 'flex-col' : 'flex-row'
      } items-center justify-center ${addClassName}`}
    >
      <ActivityIndicator size={size} color={color?.val} />
      <SizableText
        className={`ml-2 text-dark dark:text-green ${column && 'mt-4'}`}
        size={(size === 'large' && '$5') || '$4'}
      >
        {infoText}
      </SizableText>
    </Animated.View>
  );
}
