import * as Linking from 'expo-linking';
import { Button, useTheme } from 'tamagui';
import { t } from 'i18next';
import Phone from '../../assets/phone.svg';
import { TranslationNames } from '../../locales/TranslationNames';

export type CallButtonProps = {
  phoneNumber: string;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function CallButton({ phoneNumber }: CallButtonProps) {
  const onCallAction = () => Linking.openURL(`tel:${phoneNumber}`);
  const { color4 } = useTheme();
  return (
    <Button
      f={1}
      pressStyle={
        {
          color: color4.val,
        } as never
      }
      onPress={onCallAction}
    >
      <Button.Icon>
        <Phone />
      </Button.Icon>
      <Button.Text
        size="$4"
        fontWeight="bold"
        adjustsFontSizeToFit
        numberOfLines={1}
      >
        {t(TranslationNames.components.button.call)}
      </Button.Text>
    </Button>
  );
}
