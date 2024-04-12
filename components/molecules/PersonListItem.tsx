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
import { UserAvatar } from './UserAvatar';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Props<T extends Record<string, any>> = {
  item: T;
  name: string;
  surname: string;
  onPress?: () => void;
  bottomRightText?: string;
  onPressNavigateTo?: string;
  navigationParams?: Record<string, unknown>;
  isSelected?: boolean;
  onSelected?: (item: T) => void;
  onDeselected?: (item: T) => void;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function PersonListItem<T extends Record<string, any>>({
  name,
  surname,
  onPress,
  bottomRightText,
  onPressNavigateTo,
  navigationParams,
  isSelected,
  onSelected,
  onDeselected,
  item,
}: Props<T>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const navigation = useNavigation<any>();
  const handlePress = () => {
    if (!onSelected && !onDeselected) {
      if (!onPress) navigation.navigate(onPressNavigateTo, navigationParams);
      else if (onPress) onPress();
    }
    if (onSelected && !isSelected) {
      onSelected(item);
    } else if (onDeselected && isSelected) {
      onDeselected(item);
    }
  };

  const {
    color4: { val },
  } = useTheme();

  return (
    <Card onPress={handlePress}>
      <XStack p="$2" ai="center" justifyContent="space-between">
        {onSelected && onDeselected && (
          <YStack>
            <Circle height={25} width={25} bordered borderColor="$color11">
              {isSelected && (
                <Circle height={15} width={15} backgroundColor={val} />
              )}
            </Circle>
          </YStack>
        )}
        {!onSelected && !onDeselected && (
          <UserAvatar
            nameFirstLetter={name[0]}
            surnameFirstLetter={surname[0]}
          />
        )}
        <YStack ml="$2">
          <SizableText
            fontWeight="bold"
            fontSize={name.length + surname.length > 20 ? '$4' : '$7'}
            color="$color"
            textTransform="uppercase"
            textAlign="right"
            adjustsFontSizeToFit
            numberOfLines={1}
          >
            {name} {surname}
          </SizableText>
          <SizableText color="$color4" textAlign="right">
            {bottomRightText}
          </SizableText>
        </YStack>
      </XStack>
    </Card>
  );
}

export interface ListItemSkeletonProps {
  maxHeight?: number;
}

export function ListItemSkeleton({ maxHeight }: ListItemSkeletonProps) {
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
        <Circle height={40} width={40} backgroundColor="$color8" />
        <View className="flex-1 flex-col items-end">
          <View backgroundColor="$color8" className="flex-1 rounded-md w-2/3" />
          <View
            backgroundColor="$color8"
            className="flex-1 w-1/3 rounded-md mt-2"
          />
        </View>
      </Animated.View>
    </View>
  );
}
