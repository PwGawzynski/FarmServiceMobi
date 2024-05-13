import { YStack } from 'tamagui';
import { useQuery } from '@tanstack/react-query';
import { OrdersDriverScreenProps } from '../../../../../types/self/navigation/Owner/props/orders/OrdersDriverProps';
import { ScreenBase } from '../common/ScreenBase';
import { ButtonTamagui } from '../../../../atoms/ButtonTamagui';
import { getClients } from '../../../../../api/clients/Client';
import { findClientById } from '../../../../../helepers/taskSession/helpers';
import InfoIcon from '../../../../../assets/info.svg';
import TaskIco from '../../../../../assets/book-open-check.svg';
import AccountIco from '../../../../../assets/receipt.svg';

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
  const handleAccountOrder = () => {
    if (client)
      navigation.navigate('orderAccounting', {
        order,
        client,
      });
  };
  const handleTaskList = () => {
    if (client)
      navigation.navigate('orderTasksScreen', {
        order,
        client,
      });
  };
  const handleDetails = () => {
    if (client)
      navigation.navigate('orderInfo', {
        order,
        client,
      });
  };
  return (
    <ScreenBase name="Order Control panel">
      <YStack f={1} />
      <ButtonTamagui
        icon={<InfoIcon />}
        text="Info"
        buttonProps={{
          mb: '$4',
          onPress: handleDetails,
        }}
      />
      <ButtonTamagui
        icon={<TaskIco />}
        text="Tasks"
        buttonProps={{
          mb: '$4',
          onPress: handleTaskList,
        }}
      />
      <ButtonTamagui
        icon={<AccountIco />}
        text="Account order"
        buttonProps={{
          mb: '$4',
          onPress: handleAccountOrder,
        }}
      />
    </ScreenBase>
  );
}
