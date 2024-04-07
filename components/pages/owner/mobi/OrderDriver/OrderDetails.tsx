import { useQuery } from '@tanstack/react-query';
import { Card, ScrollView, SizableText, YStack } from 'tamagui';
import { t } from 'i18next';
import { ScreenBase } from '../common/ScreenBase';
import { OrdersDriverScreenProps } from '../../../../../types/self/navigation/Owner/props/orders/OrdersDriverProps';
import { EntityAsACard } from '../../../../molecules/EntityAsACard';
import { getClients } from '../../../../../api/clients/Client';
import { ClientResponseBase } from '../../../../../FarmServiceApiTypes/Clients/Responses';
import InfoIcon from '../../../../../assets/info.svg';
import { ButtonTamagui } from '../../../../atoms/ButtonTamagui';
import { TranslationNames } from '../../../../../locales/TranslationNames';
import { OrderResponseBase } from '../../../../../FarmServiceApiTypes/Order/Ressponses';

function findClientById(clients: ClientResponseBase[] | undefined, id: string) {
  if (clients) return clients.find(client => client.id === id);
  return undefined;
}

const detailsCardNames = {
  name: t(
    TranslationNames.screens.orderDriver.orderDetails.detailsCard.fields.name,
  ),
  performanceDate: t(
    TranslationNames.screens.orderDriver.orderDetails.detailsCard.fields
      .performanceDate,
  ),
  creationDate: t(
    TranslationNames.screens.orderDriver.orderDetails.detailsCard.fields
      .creationDate,
  ),
  openedAt: t(
    TranslationNames.screens.orderDriver.orderDetails.detailsCard.fields
      .openedAt,
  ),
  pricePerUnit: t(
    TranslationNames.screens.orderDriver.orderDetails.detailsCard.fields
      .pricePerUnit,
  ),
};

const clientCardNames = {
  name: t(
    TranslationNames.screens.orderDriver.orderDetails.clientCard.fields.name,
  ),
  surname: t(
    TranslationNames.screens.orderDriver.orderDetails.clientCard.fields.surname,
  ),
};

const orderDataObject = (order: OrderResponseBase) => ({
  name: order.name,
  performanceDate: new Date(order.performanceDate).toLocaleDateString(),
  creationDate:
    order.createdAt && new Date(order.createdAt)?.toLocaleDateString(),
  openedAt: order.openedAt && new Date(order.openedAt)?.toLocaleDateString(),
  pricePerUnit: order.pricePerUnit,
});

const clientDataObject = (client: ClientResponseBase) => ({
  name: client.user.personal_data.name,
  surname: client.user.personal_data.surname,
});

export function OrderDetails({
  route: { params },
  navigation,
}: OrdersDriverScreenProps<'orderDetails', 'ordersDriver', 'ownerRootDriver'>) {
  const { order } = params;
  const { data } = useQuery({
    queryKey: ['clients'],
    queryFn: getClients,
  });
  const client = findClientById(data, params.order.clientId);

  const handleClientMore = () =>
    navigation.navigate('clientsDriver', {
      screen: 'clientDetails',
      params: { client: client as ClientResponseBase },
    });

  return (
    <ScreenBase
      name={t(TranslationNames.screens.orderDriver.orderDetails.screenName)}
    >
      <EntityAsACard
        cardName={t(
          TranslationNames.screens.orderDriver.orderDetails.detailsCard
            .cardName,
        )}
        data={orderDataObject(order)}
        names={detailsCardNames}
        onTopRightBtnPress={() => navigation.navigate('editOrder', { order })}
        topRightButtonName={t(
          TranslationNames.screens.orderDriver.orderDetails.detailsCard
            .topRightButtonName,
        )}
      />
      {order.additionalInfo && (
        <Card className="max-h-52" p="$2" bordered mt="$4">
          <SizableText textTransform="uppercase" size="$7" fontWeight="bold">
            {t(
              TranslationNames.screens.orderDriver.orderDetails.additionalInfo,
            )}
          </SizableText>
          <ScrollView className="p-3">
            <SizableText color="$color4">{order.additionalInfo}</SizableText>
          </ScrollView>
        </Card>
      )}
      {client && (
        <EntityAsACard
          cardName="Client"
          topRightButtonName="More"
          onTopRightBtnPress={handleClientMore}
          topRightButtonIcon={<InfoIcon />}
          data={clientDataObject(client)}
          names={clientCardNames}
        />
      )}
      <YStack f={1} />
      <ButtonTamagui
        text={t(TranslationNames.screens.orderDriver.orderDetails.tasksButton)}
      />
    </ScreenBase>
  );
}
