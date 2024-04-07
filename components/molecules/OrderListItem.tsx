import { useNavigation } from '@react-navigation/native';
import {
  Card,
  SizableText,
  View,
  XStack,
  YStack,
  Circle,
  useTheme,
} from 'tamagui';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { useEffect } from 'react';
import InfoIco from '../../assets/info.svg';
import { OrderResponseBase } from '../../FarmServiceApiTypes/Order/Ressponses';

export type Props = {
  order: OrderResponseBase;
  onPress?: () => void;
  onPressNavigateTo?: string;
  navigationParams?: Record<string, unknown>;
};

export default function OrderListItem({
  order,
  onPress,
  onPressNavigateTo,
  navigationParams,
}: Props) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const navigation = useNavigation<any>();
  const handlePress = () => {
    if (onPress) onPress();
    if (onPressNavigateTo)
      navigation.navigate(onPressNavigateTo, navigationParams);
  };
  const { name, performanceDate } = order;
  const {
    color4: { val },
  } = useTheme();
  return (
    <Card onPress={handlePress}>
      <XStack p="$2" ai="center" justifyContent="flex-start">
        <YStack ml="$2">
          <SizableText
            fontWeight="bold"
            fontSize={name.length > 20 ? '$4' : '$7'}
            color="$color"
            textTransform="uppercase"
            textAlign="left"
            adjustsFontSizeToFit
            numberOfLines={1}
          >
            {name}
          </SizableText>
          <XStack ml="$1" mt="$1" jc="space-between">
            <SizableText mr="$2" color="$color4" textAlign="center">
              DATE: {new Date(performanceDate).toLocaleDateString()}
            </SizableText>
          </XStack>
        </YStack>
        <YStack ai="flex-end" f={1}>
          <InfoIco color={val} />
        </YStack>
      </XStack>
    </Card>
  );
}

export interface ListItemSkeletonProps {
  maxHeight?: number;
}

export function FieldListItemSkeleton({ maxHeight }: ListItemSkeletonProps) {
  const DURATION = 800;
  const opacity = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));
  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(1, { duration: DURATION }),
        withTiming(0, { duration: DURATION }),
      ),
      -1,
      true,
    );
  }, []);
  return (
    <View className={`flex-1 justify-center mt-2 mb-2 p-2 max-h-${maxHeight}`}>
      <Animated.View style={[animatedStyle]} className="flex-1 flex-row">
        <View className="flex-1 flex-col items-start">
          <View backgroundColor="$color8" className="flex-1 rounded-md w-1/3" />
          <View
            backgroundColor="$color8"
            className="flex-1 w-2/3 rounded-md mt-2"
          />
        </View>
        <View className="justify-center">
          <Circle height={25} width={25} backgroundColor="$color8" />
        </View>
      </Animated.View>
    </View>
  );
}
