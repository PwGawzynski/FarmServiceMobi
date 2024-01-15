import { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { OwnerRootDriverParamList } from '../paramLists/OwnerRootDriverParamList';
import { OwnerRootDriverScreenProps } from './OwnerRootDriverProps';
import { AuthDriverParamList } from '../paramLists/AuthDriverParamList';
import { ClientsDriverParamList } from '../paramLists/ClientsDriverParamList';

export type ClientsDriverPros<T extends keyof ClientsDriverParamList> =
  StackScreenProps<ClientsDriverParamList, T>;

export type ClientsDriverScreenProps<
  T extends keyof ClientsDriverParamList,
  K extends keyof OwnerRootDriverParamList,
  M extends keyof AuthDriverParamList,
> = CompositeScreenProps<
  ClientsDriverPros<T>,
  OwnerRootDriverScreenProps<K, M>
>;

export type ClientsDriverNavigationProps<
  T extends keyof ClientsDriverParamList,
  K extends keyof OwnerRootDriverParamList,
  M extends keyof AuthDriverParamList,
> = CompositeScreenProps<
  ClientsDriverPros<T>,
  OwnerRootDriverScreenProps<K, M>
>['navigation'];

export type ClientsDriverRouteProps<
  T extends keyof ClientsDriverParamList,
  K extends keyof OwnerRootDriverParamList,
  M extends keyof AuthDriverParamList,
> = CompositeScreenProps<
  ClientsDriverPros<T>,
  OwnerRootDriverScreenProps<K, M>
>['route'];
