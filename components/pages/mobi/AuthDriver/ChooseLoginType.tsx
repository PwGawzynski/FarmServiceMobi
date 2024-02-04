import { useTranslation } from 'react-i18next';
import { Text, View } from 'tamagui';
import { ScreenBase } from '../common/ScreenBase';
import { AppButton } from '../../../atoms/AppButton';
import { AuthDriverProps } from '../../../../types/self/navigation/props/AuthDriverProps';
import { TranslationNames } from '../../../../locales/TranslationNames';
import { CenteredMediumHeader } from '../../../atoms/CenteredMediumHeader';
import { TextWithLink } from '../../../atoms/TextWithLink';

export function ChooseLoginType({
  navigation,
}: AuthDriverProps<'chooseLoginType'>) {
  const { t } = useTranslation();
  return (
    <ScreenBase>
      <CenteredMediumHeader>
        {t(TranslationNames.screens.authDriver.chooseLoginType.header)}
      </CenteredMediumHeader>
      <View className="flex-1 justify-center">
        <Text className="text-center text-dark dark:text-green text-base font-medium mb-12">
          {t(TranslationNames.screens.authDriver.chooseLoginType.instruction)}
        </Text>
        <AppButton
          className="max-h-12"
          onPress={() => navigation.navigate('loginByEmail')}
          title={t(TranslationNames.screens.authDriver.chooseLoginType.email)}
        />
        <AppButton
          className="mt-2 max-h-12"
          title={t(TranslationNames.screens.authDriver.chooseLoginType.google)}
        />
      </View>
      <TextWithLink
        abs="mb-12"
        text={t(
          TranslationNames.screens.authDriver.chooseLoginType.registerText,
        )}
        onLinkPress={() => navigation.navigate('chooseRegisterType')}
        linkText={t(
          TranslationNames.screens.authDriver.chooseLoginType.registerButton,
        )}
      />
    </ScreenBase>
  );
}
