import { useQuery } from '@tanstack/react-query';
import { t } from 'i18next';
import { Card, ScrollView, SizableText } from 'tamagui';
import { OrdersDriverScreenProps } from '../../../../../types/self/navigation/Owner/props/orders/OrdersDriverProps';
import { ScreenBase } from '../common/ScreenBase';
import { getClients } from '../../../../../api/clients/Client';
import { EntityAsACard } from '../../../../molecules/EntityAsACard';
import { TranslationNames } from '../../../../../locales/TranslationNames';
import InfoIcon from '../../../../../assets/info.svg';
import { OrderResponseBase } from '../../../../../FarmServiceApiTypes/Order/Ressponses';
import { ClientResponseBase } from '../../../../../FarmServiceApiTypes/Clients/Responses';
import { findClientById } from './OrderTasksScreen';

const clientCardNames = {
  name: t(
    TranslationNames.screens.orderDriver.orderTasksScreen.clientCard.fields
      .name,
  ),
  surname: t(
    TranslationNames.screens.orderDriver.orderTasksScreen.clientCard.fields
      .surname,
  ),
};

const detailsCardNames = {
  name: t(
    TranslationNames.screens.orderDriver.orderTasksScreen.detailsCard.fields
      .name,
  ),
  performanceDate: t(
    TranslationNames.screens.orderDriver.orderTasksScreen.detailsCard.fields
      .performanceDate,
  ),
  creationDate: t(
    TranslationNames.screens.orderDriver.orderTasksScreen.detailsCard.fields
      .creationDate,
  ),
  openedAt: t(
    TranslationNames.screens.orderDriver.orderTasksScreen.detailsCard.fields
      .openedAt,
  ),
  totalArea: t(
    TranslationNames.screens.orderDriver.orderTasksScreen.detailsCard.fields
      .totalTaskArea,
  ),
};

export function OrderControlPanel({
  route: { params },
  navigation,
}: OrdersDriverScreenProps<
  'orderControlPanel',
  'ordersDriver',
  'ownerRootDriver'
>) {
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

  const orderDataObject = (order_: OrderResponseBase) => ({
    name: order_.name,
    performanceDate: new Date(order_.performanceDate).toLocaleDateString(),
    creationDate:
      order_.createdAt && new Date(order_.createdAt)?.toLocaleDateString(),
    openedAt:
      order_.openedAt && new Date(order_.openedAt)?.toLocaleDateString(),
    totalArea: Number.isNaN(order_.totalArea)
      ? '0.00'
      : Number(order_.totalArea).toFixed(2),
  });

  const clientDataObject = (client_: ClientResponseBase) => ({
    name: client_.user.personalData.name,
    surname: client_.user.personalData.surname,
  });

  return (
    <ScreenBase name="order control panel">
      <EntityAsACard
        cardName={t(
          TranslationNames.screens.orderDriver.orderTasksScreen.detailsCard
            .cardName,
        )}
        data={orderDataObject(order)}
        names={detailsCardNames}
        onTopRightBtnPress={() => navigation.navigate('editOrder', { order })}
        topRightButtonName={t(
          TranslationNames.screens.orderDriver.orderTasksScreen.detailsCard
            .topRightButtonName,
        )}
      />
      {order.additionalInfo && (
        <Card className="max-h-32" p="$2" bordered mt="$4">
          <SizableText textTransform="uppercase" size="$7" fontWeight="bold">
            {t(
              TranslationNames.screens.orderDriver.orderTasksScreen
                .additionalInfo,
            )}
          </SizableText>
          <ScrollView className="p-3">
            <SizableText color="$color4">{order.additionalInfo}</SizableText>
          </ScrollView>
        </Card>
      )}
      {client && (
        <EntityAsACard
          cardName={t(
            TranslationNames.screens.orderDriver.orderTasksScreen.clientCard
              .cardName,
          )}
          topRightButtonName={t(
            TranslationNames.screens.orderDriver.orderTasksScreen.clientCard
              .topRightButtonName,
          )}
          onTopRightBtnPress={handleClientMore}
          topRightButtonIcon={<InfoIcon />}
          data={clientDataObject(client)}
          names={clientCardNames}
        />
      )}
    </ScreenBase>
  );
}
