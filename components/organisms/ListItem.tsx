import { Card, Circle, SizableText, useTheme, XStack, YStack } from 'tamagui';
import { useNavigation } from '@react-navigation/native';
import { UserAvatar } from '../molecules/UserAvatar';

import InfoIco from '../../assets/info.svg';

export type ListItemStyleSettings = {
  avatarChars?: [string, string];
  header?: string;
  bottomRightText?: string;
  /**
   * Determines the alignment of the elements
   * @default center
   */
  alignment?: 'left' | 'right' | 'center';
  infoIco?: boolean;
  customIco?: JSX.Element;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Props<T extends Record<string, any>> = {
  item: T;
  modalRef?: string;
  onPressNavigateTo?: string;
  navigationParams?: Record<string, unknown>;
  isSelected?: boolean;

  onPress?: () => void;
  onSelected?: (item: T) => void;
  onDeselected?: (item: T) => void;
} & ListItemStyleSettings;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ListItem<T extends Record<string, any>>({
  item,
  onPress,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  modalRef,
  onPressNavigateTo,
  navigationParams,
  isSelected,
  onSelected,
  onDeselected,
  avatarChars,
  header,
  bottomRightText,
  infoIco,
  customIco,
  alignment = 'center',
}: Props<T>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const navigation = useNavigation<any>();
  const handlePress = () => {
    if (!onSelected && !onDeselected) {
      if (onPressNavigateTo && navigationParams)
        navigation.navigate(onPressNavigateTo, navigationParams);
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

  const aling = alignment === 'left' ? 'left' : 'right';

  return (
    <Card onPress={handlePress} minHeight={60} jc="center">
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
        {avatarChars && (
          <UserAvatar
            nameFirstLetter={avatarChars[0]}
            surnameFirstLetter={avatarChars[1]}
          />
        )}
        <YStack ml="$2" jc="space-between" f={1}>
          {header && (
            <SizableText
              fontWeight="bold"
              fontSize={header.length > 20 ? '$4' : '$7'}
              color="$color"
              textTransform="uppercase"
              textAlign={aling}
              adjustsFontSizeToFit
              numberOfLines={1}
            >
              {header}
            </SizableText>
          )}
          <SizableText
            adjustsFontSizeToFit
            numberOfLines={1}
            overflow="hidden"
            color="$color4"
            mt="$1"
            textAlign={aling}
          >
            {bottomRightText}
          </SizableText>
        </YStack>
        {infoIco && <YStack>{customIco || <InfoIco color={val} />}</YStack>}
      </XStack>
    </Card>
  );
}
