import { StackScreenProps } from '@react-navigation/stack';
import { CompositeScreenProps } from '@react-navigation/native';
import { OrdersDesktopDriverParamList } from '../../paramLists/orders/OrdersDesktopDriverParamList';
import { OrdersDriverParamList } from '../../paramLists/orders/OrdersDriverParamList';
import { OwnerRootDriverParamList } from '../../paramLists/OwnerRootDriverParamList';
import { AuthDriverParamList } from '../../paramLists/AuthDriverParamList';
import { OrdersDriverScreenProps } from './OrdersDriverProps';

export type OrdersDesktopDriverProps<
  T extends keyof OrdersDesktopDriverParamList,
> = StackScreenProps<OrdersDesktopDriverParamList, T>;

export type OrdersDesktopDriverScreenProps<
  T extends keyof OrdersDesktopDriverParamList,
  L extends keyof OrdersDriverParamList,
  K extends keyof OwnerRootDriverParamList,
  M extends keyof AuthDriverParamList,
> = CompositeScreenProps<
  OrdersDesktopDriverProps<T>,
  OrdersDriverScreenProps<L, K, M>
>;

export type OrdersDesktopDriverNavigationProps<
  T extends keyof OrdersDesktopDriverParamList,
  L extends keyof OrdersDriverParamList,
  K extends keyof OwnerRootDriverParamList,
  M extends keyof AuthDriverParamList,
> = CompositeScreenProps<
  OrdersDesktopDriverProps<T>,
  OrdersDriverScreenProps<L, K, M>
>['navigation'];

export type OrdersDesktopDriverRouteProps<
  T extends keyof OrdersDesktopDriverParamList,
  L extends keyof OrdersDriverParamList,
  K extends keyof OwnerRootDriverParamList,
  M extends keyof AuthDriverParamList,
> = CompositeScreenProps<
  OrdersDesktopDriverProps<T>,
  OrdersDriverScreenProps<L, K, M>
>['route'];
