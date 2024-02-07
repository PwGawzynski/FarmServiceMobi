import * as MailComposer from 'expo-mail-composer';
import { MailComposerOptions } from 'expo-mail-composer';
import { Button, useTheme } from 'tamagui';
import { t } from 'i18next';
import { Alert } from 'react-native';
import MailIco from '../../assets/mail.svg';
import { TranslationNames } from '../../locales/TranslationNames';

export type MailButtonProps = {
  emailOptions: MailComposerOptions;
};

export function MailButton({ emailOptions }: MailButtonProps) {
  const { color4 } = useTheme();
  const performAlert = () =>
    Alert.alert(
      t(TranslationNames.components.sendMail.cannotSendAlertTitle),
      t(TranslationNames.components.sendMail.cannotSendAlertMessage),
    );
  const onSendEmailAction = () => {
    (async () => {
      try {
        await MailComposer.composeAsync(emailOptions);
      } catch (e) {
        performAlert();
      }
    })();
  };
  return (
    <Button
      pressStyle={
        {
          color: color4.val,
        } as never
      }
      f={1}
      onPress={onSendEmailAction}
    >
      <Button.Icon>
        <MailIco />
      </Button.Icon>
      <Button.Text
        size="$4"
        fontWeight="bold"
        adjustsFontSizeToFit
        numberOfLines={1}
      >
        {t(TranslationNames.components.sendMail.title)}
      </Button.Text>
    </Button>
  );
}
