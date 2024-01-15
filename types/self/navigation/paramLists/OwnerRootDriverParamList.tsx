import { NavigatorScreenParams } from '@react-navigation/native';
import { ActivityDriverParamList } from './ActivityDriverParamList';
import { OrdersDriverParamList } from './OrdersDriverParamList';
import { ClientsDriverParamList } from './ClientsDriverParamList';

export type OwnerRootDriverParamList = {
  activityDriver: NavigatorScreenParams<ActivityDriverParamList>;
  ordersDriver: NavigatorScreenParams<OrdersDriverParamList>;
  clientsDriver: NavigatorScreenParams<ClientsDriverParamList>;
};
