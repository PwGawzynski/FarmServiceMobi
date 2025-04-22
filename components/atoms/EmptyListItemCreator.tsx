import { SizableText, YStack } from 'tamagui';
import { t } from 'i18next';
import { ButtonTamagui } from './ButtonTamagui';
import { TranslationNames } from '../../locales/TranslationNames';

export type Props = {
  onCreate: () => void;
  infoText?: string;
};

const TRANSLATIONS = {
  button: t(TranslationNames.components.emptyListItemCreator.button),
};

export function EmptyListItemCreator({ onCreate, infoText }: Props) {
  return (
    <YStack f={1}>
      <YStack f={1} ai="center" jc="center">
        <SizableText className="text-center p-2">{infoText}</SizableText>
        <ButtonTamagui
          text={TRANSLATIONS.button}
          buttonProps={{
            mt: '$4',
            width: '100%',
            onPress: onCreate,
          }}
        />
      </YStack>
    </YStack>
  );
}
