import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ScreenBase } from '../common/ScreenBase';
import { TranslationNames } from '../../../../../locales/TranslationNames';
import { AuthDriverProps } from '../../../../../types/self/navigation/Owner/props/AuthDriverProps';
import { GoogleAuth } from '../../../../atoms/GoogleAuth';
import { ButtonTamagui } from '../../../../atoms/ButtonTamagui';

export function ChooseRegisterType({
  navigation,
  route,
}: AuthDriverProps<'chooseRegisterType'>) {
  const { t } = useTranslation();
  const handleByEmail = () => navigation.navigate('emailAndPwdRegister');

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
        <ButtonTamagui
          buttonProps={{
            onPress: handleByEmail,
          }}
          text={t(TranslationNames.screens.authDriver.chooseRegisterType.email)}
        />
        <GoogleAuth navigation={navigation} route={route} />
      </View>
    </ScreenBase>
  );
}
