import { useTranslation } from 'react-i18next';
import { Text, View } from 'tamagui';
import { ScreenBase } from '../common/ScreenBase';
import { TranslationNames } from '../../../../../locales/TranslationNames';
import { CenteredMediumHeader } from '../../../../atoms/CenteredMediumHeader';
import { AuthDriverProps } from '../../../../../types/self/navigation/Owner/props/AuthDriverProps';
import { TextWithLink } from '../../../../atoms/TextWithLink';
import { GoogleAuth } from '../../../../atoms/GoogleAuth';
import { ButtonTamagui } from '../../../../atoms/ButtonTamagui';

export function ChooseLoginType({
  navigation,
  route,
}: AuthDriverProps<'chooseLoginType'>) {
  const { t } = useTranslation();
  const handleChooseRegisterType = () =>
    navigation.navigate('chooseRegisterType');

  return (
    <ScreenBase>
      <CenteredMediumHeader>
        {t(TranslationNames.screens.authDriver.chooseLoginType.header)}
      </CenteredMediumHeader>
      <View className="flex-1 justify-center ">
        <Text className="text-center text-dark dark:text-green text-base font-medium mb-12">
          {t(TranslationNames.screens.authDriver.chooseLoginType.instruction)}
        </Text>
        <ButtonTamagui
          buttonProps={{
            onPress: () => navigation.navigate('loginByEmail'),
          }}
          text={t(TranslationNames.screens.authDriver.chooseLoginType.email)}
        />
        <GoogleAuth navigation={navigation} route={route} />
      </View>
      <TextWithLink
        abs="mb-12"
        text={t(
          TranslationNames.screens.authDriver.chooseLoginType.registerText,
        )}
        onLinkPress={handleChooseRegisterType}
        linkText={t(
          TranslationNames.screens.authDriver.chooseLoginType.registerButton,
        )}
      />
    </ScreenBase>
  );
}
