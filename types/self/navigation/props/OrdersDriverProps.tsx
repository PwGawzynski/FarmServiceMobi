import { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { OrdersDriverParamList } from '../paramLists/OrdersDriverParamList';
import { OwnerRootDriverParamList } from '../paramLists/OwnerRootDriverParamList';
import { OwnerRootDriverScreenProps } from './OwnerRootDriverProps';
import { AuthDriverParamList } from '../paramLists/AuthDriverParamList';

export type OrdersDriverPros<T extends keyof OrdersDriverParamList> =
  StackScreenProps<OrdersDriverParamList, T>;

export type OrdersDriverScreenProps<
  T extends keyof OrdersDriverParamList,
  K extends keyof OwnerRootDriverParamList,
  M extends keyof AuthDriverParamList,
> = CompositeScreenProps<OrdersDriverPros<T>, OwnerRootDriverScreenProps<K, M>>;

export type OrdersDriverNavigationProps<
  T extends keyof OrdersDriverParamList,
  K extends keyof OwnerRootDriverParamList,
  M extends keyof AuthDriverParamList,
> = CompositeScreenProps<
  OrdersDriverPros<T>,
  OwnerRootDriverScreenProps<K, M>
>['navigation'];

export type OrdersDriverRouteProps<
  T extends keyof OrdersDriverParamList,
  K extends keyof OwnerRootDriverParamList,
  M extends keyof AuthDriverParamList,
> = CompositeScreenProps<
  OrdersDriverPros<T>,
  OwnerRootDriverScreenProps<K, M>
>['route'];
