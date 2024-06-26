import { XStack, YStack } from 'tamagui';
import { t } from 'i18next';
import { ScreenBase } from '../common/ScreenBase';
import { CallAndMailPanel } from '../../../../molecules/CallAndMailPanel';
import { TranslationNames } from '../../../../../locales/TranslationNames';
import { ClientsDriverScreenProps } from '../../../../../types/self/navigation/Owner/props/clients/ClientsDriverProps';
import { ButtonTamagui } from '../../../../atoms/ButtonTamagui';
import UserIco from '../../../../../assets/user.svg';
import MapIco from '../../../../../assets/map.svg';
import PlusIco from '../../../../../assets/plus.svg';
import { ClientCompletedOrders } from '../../../../organisms/ClientCompletedOrders';

export function ClientControlPanel({
  route,
  navigation,
}: ClientsDriverScreenProps<
  'clientControlPanel',
  'clientsDriver',
  'ownerRootDriver'
>) {
  const { personalData } = route.params.client.user;
  const { email } = route.params.client;
  const clientId = route.params.client.id;
  return (
    <ScreenBase
      name={t(TranslationNames.screens.clientDriver.clientControlPanel.title)}
    >
      <YStack f={1}>
        <YStack mt="$4" jc="space-between">
          <ButtonTamagui
            buttonProps={{
              onPress: () =>
                navigation.navigate('clientDetails', {
                  client: route.params.client,
                }),
            }}
            icon={<UserIco />}
            text={t(
              TranslationNames.screens.clientDriver.clientControlPanel
                .clientDataButton,
            )}
          />
          <ButtonTamagui
            buttonProps={{
              mt: '$4',
              onPress: () =>
                navigation.navigate('clientFields', {
                  client: route.params.client,
                }),
            }}
            icon={<MapIco />}
            text={t(
              TranslationNames.screens.clientDriver.clientControlPanel
                .clientFieldsButton,
            )}
          />
          <ButtonTamagui
            buttonProps={{
              mt: '$4',
              onPress: () =>
                navigation.navigate('ordersDriver', {
                  screen: 'ordersDesktopRoot',
                  params: {
                    screen: 'addOrder',
                    params: {
                      client: route.params.client,
                    },
                  },
                }),
            }}
            icon={<PlusIco />}
            text={t(
              TranslationNames.screens.clientDriver.clientControlPanel
                .clientOrdersButton,
            )}
          />
        </YStack>
        <ClientCompletedOrders clientId={clientId} />
      </YStack>
      <XStack mt="$4">
        <CallAndMailPanel
          callButtonProps={{ phoneNumber: personalData.phoneNumber }}
          mailButtonProps={{
            emailOptions: {
              body: t(TranslationNames.components.CallAndMailPanel.sign),
              recipients: [email],
            },
          }}
        />
      </XStack>
    </ScreenBase>
  );
}
