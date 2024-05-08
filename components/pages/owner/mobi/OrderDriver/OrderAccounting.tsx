import { useActor } from '@xstate/react';
import { useRef } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { t } from 'i18next';
import { OrdersDriverScreenProps } from '../../../../../types/self/navigation/Owner/props/orders/OrdersDriverProps';
import { ScreenBase } from '../common/ScreenBase';
import { OrderAccountingMachine } from '../../../../../helepers/StateMachines/OrderAccountingMachine';
import { ListRef } from '../../../../organisms/List';
import { TaskResponseBase } from '../../../../../FarmServiceApiTypes/Task/Responses';
import { TaskSelector } from '../../../../organisms/TasksSelector';
import { TranslationNames } from '../../../../../locales/TranslationNames';

const TRANSLATIONS = {
  screenTitle: t(
    TranslationNames.screens.orderDriver.orderAccounting.screenTitle,
  ),
};

export function OrderAccounting({
  route: { params },
  navigation,
}: OrdersDriverScreenProps<
  'orderAccounting',
  'ordersDriver',
  'ownerRootDriver'
>) {
  const { order, client } = params;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, send] = useActor(OrderAccountingMachine);
  const taskListRef = useRef<ListRef<TaskResponseBase>>(null);
  const modalRef = useRef<BottomSheetModal>(null);

  return (
    <ScreenBase
      bottomSheetsProps={{
        snapPoints: ['50%', '90%'],
        modalRef,
      }}
      name={TRANSLATIONS.screenTitle}
    >
      <TaskSelector
        send={send}
        orderId={order.id}
        listRef={taskListRef}
        modalRef={modalRef}
        onSetAction={() =>
          navigation.navigate('orderAccountingSelectPrices', {
            tasks: taskListRef.current?.items,
            order,
            client,
          })
        }
      />
    </ScreenBase>
  );
}
