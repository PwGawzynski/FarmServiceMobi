import { ActivityIndicator, Text } from 'react-native';
import { useEffect } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Colors } from '../../settings/styles/colors';

export type PendingInfoProps = {
  infoText?: string;
  isVisible: boolean;
};

export function PendingInfo({ infoText, isVisible }: PendingInfoProps) {
  const opacity = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  useEffect(() => {
    if (isVisible) opacity.value = withTiming(1, { duration: 200 });
    return () => {
      opacity.value = withTiming(0, { duration: 100 });
    };
  }, [isVisible]);

  if (!isVisible) return null;
  return (
    <Animated.View
      style={[animatedStyle]}
      className="flex-1 flex-row items-center justify-center"
    >
      <ActivityIndicator color={Colors.GREEN} />
      <Text className="ml-2 text-dark dark:text-green">{infoText}</Text>
    </Animated.View>
  );
}
