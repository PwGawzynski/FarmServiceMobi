import { useNavigation } from '@react-navigation/native';
import { Card, SizableText, XStack, YStack, Circle, useTheme } from 'tamagui';
import { FieldResponseBase } from '../../FarmServiceApiTypes/Field/Ressponses';
import InfoIco from '../../assets/info.svg';

export type Props = {
  /**
   * Fields to be displayed
   */
  field: FieldResponseBase;
  /**
   * Callback triggered when the field is pressed
   */
  onPress?: () => void;
  /**
   * Callback triggered when the field is pressed, navigates to given screen if onPress not provided
   */
  onPressNavigateTo?: string;
  /**
   * Navigation params for onPressNavigateTo
   */
  navigationParams?: Record<string, unknown>;
  /**
   * Callback when the field is selected, if this and onDeselect provided the field will be selectable
   * @param field - the selected field
   */
  onSelected?: (field: FieldResponseBase) => void;
  /**
   * Callback when the field is deselected, if this and onDeselect provided the field will be selectable
   * @param field - the selected field
   */
  onDeselected?: (field: FieldResponseBase) => void;
  /**
   * Determines if the field is selected
   */
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
      if (!onPress) navigation.navigate(onPressNavigateTo, navigationParams);
      else if (onPress) onPress();
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
      <XStack f={1} p="$2" ai="center" justifyContent="flex-start">
        {onSelected && onDeselected && (
          <YStack>
            <Circle height={25} width={25} bordered borderColor="$color11">
              {isSelected && (
                <Circle height={15} width={15} backgroundColor={val} />
              )}
            </Circle>
          </YStack>
        )}
        <YStack width="75%" maxWidth="75%" ml="$2">
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
              {city.substring(0, 10).toUpperCase() +
                (city.length > 10 ? '...' : '')}
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
        <YStack ai="flex-end" f={1} mr="$2">
          <InfoIco color={val} />
        </YStack>
      </XStack>
    </Card>
  );
}
