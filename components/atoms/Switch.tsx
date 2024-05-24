import { Label, XStack, Switch as SwitchT, useTheme } from 'tamagui';
import type { ViewStyle } from 'react-native';
import { StyleProp } from '@tamagui/web/src/types';

type LooseCombinedObjects<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  A extends Record<any, any>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  B extends Record<any, any>,
> = A | B | (A & B);

export interface SwitchProps {
  label: string;
  defaultChecked?: boolean;
  switchStyle?: StyleProp<LooseCombinedObjects<React.CSSProperties, ViewStyle>>;
  onCheckedChange?: (checked: boolean) => void;
  checked?: boolean;
  onPress?: () => void;
}

export function Switch({
  label,
  switchStyle,
  defaultChecked,
  onCheckedChange,
  checked,
  onPress,
}: SwitchProps) {
  const { color2 } = useTheme();
  return (
    <XStack alignItems="center" jc="space-between" pt="$2" pb="$2">
      <Label
        onPress={onPress}
        color={color2?.val}
        fontSize="$5"
        className="uppercase font-bold"
      >
        {label}
      </Label>
      <SwitchT
        onCheckedChange={onCheckedChange}
        checked={checked}
        size="$4"
        defaultChecked={!defaultChecked}
        style={switchStyle}
      >
        <SwitchT.Thumb
          onPress={onPress}
          className="bg-white dark:bg-dark"
          animation="fast"
        />
      </SwitchT>
    </XStack>
  );
}
