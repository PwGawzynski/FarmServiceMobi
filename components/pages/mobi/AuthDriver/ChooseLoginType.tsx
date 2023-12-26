import { Button, H4, XStack, YStack } from 'tamagui';
import { SafeAreaView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ScreenCard } from '../../../atoms/ScreenCard';
import { Logo } from '../../../atoms/Logo';
import { Text } from '../../../atoms/Text';

export function ChooseLoginType() {
  const { t } = useTranslation();
  return (
    <ScreenCard filed>
      <SafeAreaView
        style={{ flex: 1, width: '100%', justifyContent: 'space-between' }}
      >
        <Logo />
        <YStack justifyContent="center">
          <H4 mb="$4" color="$background" textTransform="uppercase">
            {t('screens.AuthDriver.chooseLoginType.instructionHeader')}
          </H4>
          <Text textAlign="center" mb="$4">
            Start new era in your services, create an account and manage work
            easier and faster
          </Text>
          <Button fontWeight="$9">
            <Button.Text
              textTransform="uppercase"
              adjustsFontSizeToFit
              numberOfLines={1}
              size="$6"
            >
              Continue with email / NIP
            </Button.Text>
          </Button>

          <Button mt="$4">
            <Button.Text
              textTransform="uppercase"
              adjustsFontSizeToFit
              numberOfLines={1}
              size="$6"
            >
              Continue with Google
            </Button.Text>
          </Button>
          <Button mt="$4">
            <Button.Text
              textTransform="uppercase"
              adjustsFontSizeToFit
              numberOfLines={1}
              size="$6"
            >
              Continue with Apple
            </Button.Text>
          </Button>
        </YStack>
        <XStack alignItems="center" justifyContent="center" height="$10">
          <Text>Don&apos;t you have an account ? </Text>
          <Text textTransform="uppercase" textDecorationLine="underline">
            Create One
          </Text>
        </XStack>
      </SafeAreaView>
    </ScreenCard>
  );
}
