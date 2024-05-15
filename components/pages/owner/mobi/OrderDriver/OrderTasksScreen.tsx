import { useQuery } from '@tanstack/react-query';
import { SizableText } from 'tamagui';
import { t } from 'i18next';
import { useRef } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { ScreenBase } from '../common/ScreenBase';
import { OrdersDriverScreenProps } from '../../../../../types/self/navigation/Owner/props/orders/OrdersDriverProps';
import { ClientResponseBase } from '../../../../../FarmServiceApiTypes/Clients/Responses';
import { ButtonTamagui } from '../../../../atoms/ButtonTamagui';
import { TranslationNames } from '../../../../../locales/TranslationNames';
import { getTaskByOrder } from '../../../../../api/Task/Task';
import List from '../../../../organisms/List';
import { TaskResponseBase } from '../../../../../FarmServiceApiTypes/Task/Responses';
import { TaskType } from '../../../../../FarmServiceApiTypes/Task/Enums';
import { TaskInfo } from '../../../../atoms/TaskInfo';

const TRANSLATIONS = {
  taskStatus: {
    closed: t(
      TranslationNames.screens.orderDriver.orderTasksScreen.taskStatus.done,
    ),
    opened: t(
      TranslationNames.screens.orderDriver.orderTasksScreen.taskStatus.closed,
    ),
    new: t(
      TranslationNames.screens.orderDriver.orderTasksScreen.taskStatus.new,
    ),
  },
};

export function OrderTasksScreen({
  route: { params },
  navigation,
}: OrdersDriverScreenProps<
  'orderTasksScreen',
  'ordersDriver',
  'ownerRootDriver'
>) {
  const { order, client } = params;
  const modalRef = useRef<BottomSheetModal>(null);

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
        snapPoints: ['50%', '80%'],
      }}
      name={t(TranslationNames.screens.orderDriver.orderTasksScreen.screenName)}
    >
      <SizableText className="uppercase font-bold text-xl mt-4 ">
        {t(
          TranslationNames.screens.orderDriver.orderTasksScreen.taskListHeader,
        )}
      </SizableText>
      <List<TaskResponseBase>
        // we have to set margin top to 0 and margin bottom to 0, because we use forwardRef in a List component,
        // sand its gets those styles
        cName="mt-0 mb-0"
        modalRef={modalRef}
        data={tasks as unknown as TaskResponseBase[]}
        listStyleSettings={item => ({
          header: item.field.nameLabel,
          bottomRightText: `${TaskType[item.type]} - ${
            // eslint-disable-next-line no-nested-ternary
            item.isDone
              ? TRANSLATIONS.taskStatus.closed
              : item.openedAt
                ? TRANSLATIONS.taskStatus.opened
                : TRANSLATIONS.taskStatus.new
          }`,
          alignment: 'left',
          infoIco: true,
          disabled: item.isDone,
        })}
        handleOnItemPress={handleTaskPress}
        isFetching={isPending}
        isError={isError}
        isLoading={isLoading}
        beFlex
      />
      <ButtonTamagui
        text={t(
          TranslationNames.screens.orderDriver.orderTasksScreen.tasksButton,
        )}
        buttonProps={{
          mt: '$4',
          onPress: handleCreateTask,
        }}
      />
    </ScreenBase>
  );
}
