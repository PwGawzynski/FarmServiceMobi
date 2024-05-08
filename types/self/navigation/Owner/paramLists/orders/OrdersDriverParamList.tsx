import { NavigatorScreenParams } from '@react-navigation/native';
import { OrdersDesktopDriverParamList } from './OrdersDesktopDriverParamList';
import { OrderResponseBase } from '../../../../../../FarmServiceApiTypes/Order/Ressponses';
import { ClientResponseBase } from '../../../../../../FarmServiceApiTypes/Clients/Responses';
import { TaskResponseBase } from '../../../../../../FarmServiceApiTypes/Task/Responses';

import { OrderAccountingSummary } from '../../../../common/types';

export type OrdersDriverParamList = {
  ordersDesktopRoot: NavigatorScreenParams<OrdersDesktopDriverParamList>;
  orderDetails: { order: OrderResponseBase };
  orderAccounting: { order: OrderResponseBase; client: ClientResponseBase };
  orderAccountingInvoice: {
    order: OrderResponseBase;
    tasks: TaskResponseBase[];
    client: ClientResponseBase;
    accounting: OrderAccountingSummary;
  };
  orderAccountingSelectPrices: {
    tasks: TaskResponseBase[] | undefined;
    order: OrderResponseBase;
    client: ClientResponseBase;
  };
  editOrder: { order: OrderResponseBase };
  createTask: { order: OrderResponseBase; client: ClientResponseBase };
};
