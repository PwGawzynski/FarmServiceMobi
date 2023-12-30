import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ScreenBase } from '../common/ScreenBase';
import { AppButton } from '../../../atoms/AppButton';
import { AuthDriverProps } from '../../../../types/self/navigation/props/AuthDriverProps';
import { TranslationNames } from '../../../../locales/TranslationNames';

export function ChooseRegisterType({
  navigation,
}: AuthDriverProps<'chooseRegisterType'>) {
  const { t } = useTranslation();

  return (
    <ScreenBase>
      <Text className="text-center text-dark dark:text-green text-2xl font-semibold">
        {t(TranslationNames.screens.authDriver.chooseRegisterType.header)}
      </Text>

      <View className="flex-1 justify-center">
        <Text className="text-center text-dark dark:text-green text-base font-medium mb-12">
          {t(
            TranslationNames.screens.authDriver.chooseRegisterType.instruction,
          )}
        </Text>
        <AppButton
          onPress={() => navigation.navigate('loginByEmail')}
          title={t(
            TranslationNames.screens.authDriver.chooseRegisterType.email,
          )}
        />
        <AppButton
          className="mt-2"
          title={t(
            TranslationNames.screens.authDriver.chooseRegisterType.google,
          )}
        />
      </View>
    </ScreenBase>
  );
}
