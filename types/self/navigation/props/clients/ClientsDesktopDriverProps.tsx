import { StackScreenProps } from '@react-navigation/stack';
import { CompositeScreenProps } from '@react-navigation/native';
import { OwnerRootDriverParamList } from '../../paramLists/OwnerRootDriverParamList';
import { AuthDriverParamList } from '../../paramLists/AuthDriverParamList';
import { ClientsDesktopDriverParamList } from '../../paramLists/clients/ClientsDesktopDriverParamList';
import { ClientsDriverScreenProps } from './ClientsDriverProps';
import { ClientsDriverParamList } from '../../paramLists/clients/ClientsDriverParamList';

export type ClientsDesktopDriverProps<
  T extends keyof ClientsDesktopDriverParamList,
> = StackScreenProps<ClientsDesktopDriverParamList, T>;

export type ActivitiesDesktopDriverScreenProps<
  T extends keyof ClientsDesktopDriverParamList,
  L extends keyof ClientsDriverParamList,
  K extends keyof OwnerRootDriverParamList,
  M extends keyof AuthDriverParamList,
> = CompositeScreenProps<
  ClientsDesktopDriverProps<T>,
  ClientsDriverScreenProps<L, K, M>
>;

export type ActivitiesDesktopDriverNavigationProps<
  T extends keyof ClientsDesktopDriverParamList,
  L extends keyof ClientsDriverParamList,
  K extends keyof OwnerRootDriverParamList,
  M extends keyof AuthDriverParamList,
> = CompositeScreenProps<
  ClientsDesktopDriverProps<T>,
  ClientsDriverScreenProps<L, K, M>
>['navigation'];

export type ActivitiesDesktopDriverRouteProps<
  T extends keyof ClientsDesktopDriverParamList,
  L extends keyof ClientsDriverParamList,
  K extends keyof OwnerRootDriverParamList,
  M extends keyof AuthDriverParamList,
> = CompositeScreenProps<
  ClientsDesktopDriverProps<T>,
  ClientsDriverScreenProps<L, K, M>
>['route'];
