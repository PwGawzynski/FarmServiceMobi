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
import { FieldResponseBase } from '../../FarmServiceApiTypes/Field/Ressponses';
import InfoIco from '../../assets/info.svg';

export type Props = {
  field: FieldResponseBase;
  onPress?: () => void;
  onPressNavigateTo?: string;
  navigationParams?: Record<string, unknown>;
  onSelected?: (field: FieldResponseBase) => void;
  onDeselected?: (field: FieldResponseBase) => void;
  isSelected?: boolean;
};

export default function FieldListItem({
  field,
  onPress,
  onPressNavigateTo,
  navigationParams,
  onSelected,
  onDeselected,
  isSelected,
}: Props) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const navigation = useNavigation<any>();

  const handlePress = () => {
    if (!onSelected && !onDeselected) {
      if (!onPress && !onSelected)
        navigation.navigate(onPressNavigateTo, navigationParams);
      else if (!onSelected && onPress) onPress();
    }
    if (onSelected && !isSelected) {
      onSelected(field);
    } else if (onDeselected && isSelected) {
      onDeselected(field);
    }
  };

  const {
    polishSystemId,
    address: { city },
    area,
    nameLabel,
  } = field;
  const {
    color4: { val },
  } = useTheme();
  return (
    <Card onPress={handlePress}>
      <XStack p="$2" ai="center" justifyContent="flex-start">
        <YStack>
          <Circle height={25} width={25} bordered borderColor="$color11">
            {isSelected && (
              <Circle height={15} width={15} backgroundColor={val} />
            )}
          </Circle>
        </YStack>
        <YStack ml="$2">
          <SizableText
            fontWeight="bold"
            fontSize={nameLabel.length > 20 ? '$4' : '$7'}
            color="$color"
            textTransform="uppercase"
            textAlign="left"
            adjustsFontSizeToFit
            numberOfLines={1}
          >
            {nameLabel}
          </SizableText>
          <XStack ml="$1" mt="$1" jc="space-between">
            <SizableText mr="$2" color="$color4" textAlign="center">
              {city.toUpperCase()}
            </SizableText>
            <SizableText mr="$2" color="$color4" textAlign="right">
              ID:
              {polishSystemId.substring(
                polishSystemId.length - 3,
                polishSystemId.length,
              )}
            </SizableText>
            <SizableText
              mr="$2"
              color="$color4"
              textAlign="right"
              className="max-w-4/5"
            >
              {Number.isNaN(Number(area)) ? '' : Number(area).toFixed(2)} Ha
            </SizableText>
            <SizableText color="$color4" textAlign="center">
              (~{Math.random().toFixed(2)} Km)
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
