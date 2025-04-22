import { Card, SizableText, XStack, YStack } from 'tamagui';
import { useSelector } from 'react-redux';
import { t } from 'i18next';
import { ScreenBase } from '../common/ScreenBase';
import BriefcaseIco from '../../../../../assets/briefcase-business.svg';
import TractorIco from '../../../../../assets/tractor.svg';
import { selectTheme } from '../../../../../src/redux/feature/userSlice';
import { Theme } from '../../../../../FarmServiceApiTypes/Account/Constants';
import { Colors } from '../../../../../settings/styles/colors';
import { AuthDriverProps } from '../../../../../types/self/navigation/Owner/props/AuthDriverProps';
import { UserRole } from '../../../../../FarmServiceApiTypes/User/Enums';
import { TranslationNames } from '../../../../../locales/TranslationNames';

const TRANSLATION = {
  title: t(TranslationNames.screens.authDriver.chooseRole.title),
  owner: t(TranslationNames.screens.authDriver.chooseRole.owner),
  worker: t(TranslationNames.screens.authDriver.chooseRole.worker),
};

export function ChooseRole({
  navigation,
  route: { params },
}: AuthDriverProps<'chooseRole'>) {
  const theme = useSelector(selectTheme);
  const handleOwnerPress = () => {
    navigation.navigate('register', {
      role: UserRole.Owner,
      byGoogle: params?.byGoogle,
      byMail: params?.byMail,
    });
  };
  const handleOnWorkerPress = () => {
    navigation.navigate('register', {
      role: UserRole.Worker,
      byGoogle: params?.byGoogle,
      byMail: params?.byMail,
    });
  };

  return (
    <ScreenBase titleBoxStyles="justify-center" name={TRANSLATION.title}>
      <YStack f={1}>
        <XStack ai="center" mt="$4">
          <Card
            f={1}
            bordered
            h="$12"
            mr="$2"
            ai="center"
            jc="center"
            onPress={handleOwnerPress}
            pressStyle={{
              opacity: 0.5,
            }}
          >
            <BriefcaseIco
              width="40%"
              height="40%"
              color={theme === Theme.dark ? Colors.GREEN : Colors.WHITE}
            />
            <SizableText
              fontSize="$5"
              className="text-green dark:text-white uppercase text-center font-bold"
            >
              {TRANSLATION.owner}
            </SizableText>
          </Card>
          <Card
            f={1}
            bordered
            h="$12"
            ml="$2"
            ai="center"
            jc="center"
            onPress={handleOnWorkerPress}
            pressStyle={{
              opacity: 0.5,
            }}
          >
            <TractorIco
              width="40%"
              height="40%"
              color={theme === Theme.dark ? Colors.GREEN : Colors.WHITE}
            />
            <SizableText
              fontSize="$5"
              className="text-green dark:text-white uppercase text-center font-bold"
            >
              {TRANSLATION.worker}
            </SizableText>
          </Card>
        </XStack>
      </YStack>
    </ScreenBase>
  );
}
