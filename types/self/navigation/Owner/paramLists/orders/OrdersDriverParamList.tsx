import { NavigatorScreenParams } from '@react-navigation/native';
import { OrdersDesktopDriverParamList } from './OrdersDesktopDriverParamList';
import { OrderResponseBase } from '../../../../../../FarmServiceApiTypes/Order/Ressponses';
import { ClientResponseBase } from '../../../../../../FarmServiceApiTypes/Clients/Responses';

export type OrdersDriverParamList = {
  ordersDesktopRoot: NavigatorScreenParams<OrdersDesktopDriverParamList>;
  orderDetails: { order: OrderResponseBase };
  editOrder: { order: OrderResponseBase };
  createTask: { order: OrderResponseBase; client: ClientResponseBase };
};
