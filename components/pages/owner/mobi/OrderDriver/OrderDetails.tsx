import { useQuery } from '@tanstack/react-query';
import { YStack } from 'tamagui';
import { ScreenBase } from '../common/ScreenBase';
import { OrdersDriverScreenProps } from '../../../../../types/self/navigation/Owner/props/orders/OrdersDriverProps';
import { EntityAsACard } from '../../../../molecules/EntityAsACard';
import { getClients } from '../../../../../api/clients/Client';
import { ClientResponseBase } from '../../../../../FarmServiceApiTypes/Clients/Responses';
import InfoIcon from '../../../../../assets/info.svg';
import { ButtonTamagui } from '../../../../atoms/ButtonTamagui';

function findClientById(clients: ClientResponseBase[] | undefined, id: string) {
  if (clients) return clients.find(client => client.id === id);
  return undefined;
}

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
  return (
    <ScreenBase name="order Details">
      <EntityAsACard
        cardName="Details"
        data={{
          name: order.name,
          performanceDate: new Date(order.performanceDate).toLocaleDateString(),
          creationDate:
            order.createdAt && new Date(order.createdAt)?.toLocaleDateString(),
          openedAt:
            order.openedAt && new Date(order.openedAt)?.toLocaleDateString(),
          pricePerUnit: order.pricePerUnit,
        }}
        names={{
          name: 'Name',
          performanceDate: 'Performance Date',
          creationDate: 'Creation Date',
          openedAt: 'Opened At',
          pricePerUnit: 'Price Per Unit',
        }}
      />
      {client && (
        <EntityAsACard
          cardName="Client"
          topRightButtonName="More"
          onTopRightBtnPress={() =>
            navigation.navigate('clientsDriver', {
              screen: 'clientDetails',
              params: { client },
            })
          }
          topRightButtonIcon={<InfoIcon />}
          data={{
            name: client.user.personal_data.name,
            surname: client.user.personal_data.surname,
          }}
          names={{
            name: 'Name',
            surname: 'Surname',
          }}
        />
      )}
      <YStack f={1} />
      <ButtonTamagui text="Tasks" />
    </ScreenBase>
  );
}
