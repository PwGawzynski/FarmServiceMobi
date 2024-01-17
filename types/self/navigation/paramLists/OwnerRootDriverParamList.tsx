import { NavigatorScreenParams } from '@react-navigation/native';
import { ActivityDriverParamList } from './activities/ActivityDriverParamList';
import { OrdersDriverParamList } from './orders/OrdersDriverParamList';
import { ClientsDriverParamList } from './clients/ClientsDriverParamList';

export type OwnerRootDriverParamList = {
  activityDriver: NavigatorScreenParams<ActivityDriverParamList>;
  ordersDriver: NavigatorScreenParams<OrdersDriverParamList>;
  clientsDriver: NavigatorScreenParams<ClientsDriverParamList>;
};
