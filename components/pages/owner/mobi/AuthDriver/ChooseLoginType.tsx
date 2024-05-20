import { useTranslation } from 'react-i18next';
import { Text, View } from 'tamagui';
import { ScreenBase } from '../common/ScreenBase';
import { TranslationNames } from '../../../../../locales/TranslationNames';
import { CenteredMediumHeader } from '../../../../atoms/CenteredMediumHeader';
import { AuthDriverProps } from '../../../../../types/self/navigation/Owner/props/AuthDriverProps';
import { AppButton } from '../../../../atoms/AppButton';
import { TextWithLink } from '../../../../atoms/TextWithLink';
import { GoogleAuth } from '../../../../atoms/GoogleAuth';

export function ChooseLoginType({
  navigation,
  route,
}: AuthDriverProps<'chooseLoginType'>) {
  const { t } = useTranslation();

  return (
    <ScreenBase>
      <CenteredMediumHeader>
        {t(TranslationNames.screens.authDriver.chooseLoginType.header)}
      </CenteredMediumHeader>
      <View className="flex-1 justify-center ">
        <Text className="text-center text-dark dark:text-green text-base font-medium mb-12">
          {t(TranslationNames.screens.authDriver.chooseLoginType.instruction)}
        </Text>
        <AppButton
          className="max-h-12"
          onPress={() => navigation.navigate('loginByEmail')}
          title={t(TranslationNames.screens.authDriver.chooseLoginType.email)}
        />
        <GoogleAuth navigation={navigation} route={route} />
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
