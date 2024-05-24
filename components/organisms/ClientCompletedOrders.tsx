import { SizableText, YStack } from 'tamagui';
import { useQuery } from '@tanstack/react-query';
import { getAllOrders } from '../../api/Order/Order';
import { OrderResponseBase } from '../../FarmServiceApiTypes/Order/Ressponses';
import { filterOrder } from '../../helepers/filterFunctions';
import List from './List';
import { OrderStatus } from '../../FarmServiceApiTypes/Order/Enums';

export interface ClientCompletedOrdersProps {
  clientId: string;
}

const findClientsOrder = async (clientId: string) =>
  (await getAllOrders())?.filter(
    order =>
      order.clientId === clientId &&
      (order.status === OrderStatus.InAccounting ||
        order.status === OrderStatus.Done),
  );

export function ClientCompletedOrders({
  clientId,
}: ClientCompletedOrdersProps) {
  const { data, isFetching, isLoading, isError } = useQuery({
    queryKey: ['orders', clientId],
    queryFn: context => findClientsOrder(context.queryKey[1] as string),
  });
  return (
    <YStack f={1} mt="$4">
      <SizableText
        color="$color4"
        fontSize="$5"
        className="uppercase font-bold"
      >
        Completed orders
      </SizableText>
      <List<OrderResponseBase>
        isFetching={isFetching}
        isError={isError}
        isLoading={isLoading}
        data={data}
        beFlex
        onPressNavigateTo="orderControlPanel"
        navigationParamName="order"
        listEmptyText="No orders found"
        listStyleSettings={item => ({
          header: item.name,
          bottomRightText: ` DATE: ${new Date(
            item.performanceDate,
          ).toLocaleDateString()}`,
          alignment: 'left',
          infoIco: true,
        })}
        filterFunction={filterOrder}
        searchEnginePlaceholder="Search orders"
      />
    </YStack>
  );
}
