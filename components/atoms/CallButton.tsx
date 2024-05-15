import * as Linking from 'expo-linking';
import { Button, useTheme } from 'tamagui';
import { t } from 'i18next';
import { useEffect } from 'react';
import { Alert } from 'react-native';
import Phone from '../../assets/phone.svg';
import { TranslationNames } from '../../locales/TranslationNames';

export type CallButtonProps = {
  phoneNumber: string;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function CallButton({ phoneNumber }: CallButtonProps) {
  const performAlert = () =>
    Alert.alert(
      t(TranslationNames.components.call.cannotCallAlertTitle),
      t(TranslationNames.components.call.cannotCallAlertMessage),
    );
  const onCallAction = async () => {
    try {
      await Linking.openURL(`tel:${phoneNumber}`);
    } catch (e) {
      performAlert();
    }
  };
  const { color4 } = useTheme();
  useEffect(() => {
    (async () => {
      if (!(await Linking.canOpenURL(`tel:${phoneNumber}`))) {
        performAlert();
      }
    })();
  }, []);
  return (
    <Button
      f={1}
      pressStyle={
        {
          color: color4.val,
        } as never
      }
      color="$color9"
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
        {t(TranslationNames.components.call.title)}
      </Button.Text>
    </Button>
  );
}
