import { useQuery } from '@tanstack/react-query';
import { Card, ScrollView, SizableText } from 'tamagui';
import { t } from 'i18next';
import { useRef } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { ScreenBase } from '../common/ScreenBase';
import { OrdersDriverScreenProps } from '../../../../../types/self/navigation/Owner/props/orders/OrdersDriverProps';
import { EntityAsACard } from '../../../../molecules/EntityAsACard';
import { getClients } from '../../../../../api/clients/Client';
import { ClientResponseBase } from '../../../../../FarmServiceApiTypes/Clients/Responses';
import InfoIcon from '../../../../../assets/info.svg';
import { ButtonTamagui } from '../../../../atoms/ButtonTamagui';
import { TranslationNames } from '../../../../../locales/TranslationNames';
import { OrderResponseBase } from '../../../../../FarmServiceApiTypes/Order/Ressponses';
import { getTaskByOrder } from '../../../../../api/Task/Task';
import List from '../../../../organisms/List';
import { TaskResponseBase } from '../../../../../FarmServiceApiTypes/Task/Responses';
import { TaskType } from '../../../../../FarmServiceApiTypes/Task/Enums';
import { TaskInfo } from '../../../../atoms/TaskInfo';

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
  name: client.user.personalData.name,
  surname: client.user.personalData.surname,
});

export function OrderDetails({
  route: { params },
  navigation,
}: OrdersDriverScreenProps<'orderDetails', 'ordersDriver', 'ownerRootDriver'>) {
  const { order } = params;
  const modalRef = useRef<BottomSheetModal>(null);
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

  const handleCreateTask = () => {
    if (client)
      navigation.navigate('createTask', {
        order,
        client: client as ClientResponseBase,
      });
  };
  const handleTaskPress = (task: TaskResponseBase) => {
    modalRef.current?.present(
      <TaskInfo
        modalRef={modalRef}
        order={order}
        onDeleteProcessed={modalRef.current.dismiss}
        task={task}
      />,
    );
  };
  const {
    data: tasks,
    isPending,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['orderTasks', order.id],
    queryFn: context => getTaskByOrder(context.queryKey[1]),
  });
  return (
    <ScreenBase
      bottomSheetsProps={{
        modalRef,
        snapPoints: ['40%', '80%'],
      }}
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
          cardName={t(
            TranslationNames.screens.orderDriver.orderDetails.clientCard
              .cardName,
          )}
          topRightButtonName={t(
            TranslationNames.screens.orderDriver.orderDetails.clientCard
              .topRightButtonName,
          )}
          onTopRightBtnPress={handleClientMore}
          topRightButtonIcon={<InfoIcon />}
          data={clientDataObject(client)}
          names={clientCardNames}
        />
      )}
      <SizableText className="uppercase font-bold text-xl mt-4 ">
        {t(TranslationNames.screens.orderDriver.orderDetails.taskListHeader)}
      </SizableText>
      <List<TaskResponseBase>
        // we have to set margin top to 0 and margin bottom to 0, because we use forwardRef in a List component,
        // sand its gets those styles
        cName="mt-0 mb-0"
        modalRef={modalRef}
        data={tasks as unknown as TaskResponseBase[]}
        listStyleSettings={item => ({
          header: item.field.nameLabel,
          bottomRightText: TaskType[item.type],
          alignment: 'left',
          infoIco: true,
        })}
        handleOnItemPress={handleTaskPress}
        isFetching={isPending}
        isError={isError}
        isLoading={isLoading}
        beFlex
      />
      <ButtonTamagui
        text={t(TranslationNames.screens.orderDriver.orderDetails.tasksButton)}
        buttonProps={{
          mt: '$4',
          onPress: handleCreateTask,
        }}
      />
    </ScreenBase>
  );
}
