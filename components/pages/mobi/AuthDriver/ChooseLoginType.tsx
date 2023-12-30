import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { ScreenBase } from '../common/ScreenBase';
import { AppButton } from '../../../atoms/AppButton';
import { AppLinkButton } from '../../../atoms/AppLinkButton';
import { AuthDriverProps } from '../../../../types/self/navigation/props/AuthDriverProps';
import { TranslationNames } from '../../../../locales/TranslationNames';

export function ChooseLoginType({
  navigation,
}: AuthDriverProps<'chooseLoginType'>) {
  const { t } = useTranslation();
  return (
    <ScreenBase>
      <Text className="text-center text-dark dark:text-green text-2xl font-semibold">
        {t(TranslationNames.screens.authDriver.chooseLoginType.header)}
      </Text>

      <View className="flex-1 justify-center">
        <Text className="text-center text-dark dark:text-green text-base font-medium mb-12">
          {t(TranslationNames.screens.authDriver.chooseLoginType.instruction)}
        </Text>
        <AppButton
          onPress={() => navigation.navigate('loginByEmail')}
          title={t(TranslationNames.screens.authDriver.chooseLoginType.email)}
        />
        <AppButton
          className="mt-2"
          title={t(TranslationNames.screens.authDriver.chooseLoginType.google)}
        />
      </View>

      <View className="flex-row justify-center mb-12">
        <Text className="text-center text-dark dark:text-green text-base font-medium ">
          {t(TranslationNames.screens.authDriver.chooseLoginType.registerText)}
        </Text>
        <AppLinkButton
          onPress={() => navigation.navigate('chooseRegisterType')}
          textClassName="text-center font-medium text-base ml-1 color-light-green dark:text-white"
          title={t(
            TranslationNames.screens.authDriver.chooseLoginType.registerButton,
          )}
        />
      </View>
    </ScreenBase>
  );
}
