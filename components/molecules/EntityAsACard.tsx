import { Card, SizableText, XStack } from 'tamagui';
import { ButtonTamagui } from '../atoms/ButtonTamagui';
import PenIco from '../../assets/pen.svg';
import { KeyValuePair } from '../atoms/KeyValuePair';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type EntityAsACardProps<T extends Record<string, any>> = {
  data: T;
  omittedKeys?: (keyof T)[];
  names: Record<keyof T, string>;
  onTopRightBtnPress?: () => void;
  cardName?: string;
  topRightButtonName?: string;
  topRightButtonIcon?: JSX.Element;
  cardClassName?: string;
};

export function EntityAsACard<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends Record<string, any>,
>({
  data,
  names,
  onTopRightBtnPress,
  cardName,
  topRightButtonName,
  omittedKeys,
  topRightButtonIcon,
  cardClassName,
}: EntityAsACardProps<T>) {
  return (
    <Card
      bordered
      p="$2"
      mt="$4"
      className={cardClassName}
      bg="$backgroundTransparent"
      borderColor="$color4"
    >
      <XStack jc={cardName ? 'space-between' : 'flex-end'} ai="center">
        {cardName && (
          <SizableText textTransform="uppercase" size="$7" fontWeight="bold">
            {cardName}
          </SizableText>
        )}
        {onTopRightBtnPress && (
          <ButtonTamagui
            icon={topRightButtonIcon || <PenIco height="70%" />}
            text={topRightButtonName || ''}
            buttonProps={{
              size: '$2',
              onPress: onTopRightBtnPress,
            }}
          />
        )}
      </XStack>
      {Object.keys(data)
        .filter(key => !(omittedKeys || []).includes(key as keyof T))
        .map(key => (
          <KeyValuePair name={names[key]} value={data[key]} key={key} />
        ))}
    </Card>
  );
}
