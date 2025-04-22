import { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { OwnerRootDriverParamList } from '../../paramLists/OwnerRootDriverParamList';
import { OwnerRootDriverScreenProps } from '../OwnerRootDriverProps';
import { AuthDriverParamList } from '../../paramLists/AuthDriverParamList';
import { MachinesDriverParamList } from '../../paramLists/machines/MachinesDriverParamList';

export type MachinesDriverPros<T extends keyof MachinesDriverParamList> =
  StackScreenProps<MachinesDriverParamList, T>;

export type MachinesDriverScreenProps<
  T extends keyof MachinesDriverParamList,
  K extends keyof OwnerRootDriverParamList,
  M extends keyof AuthDriverParamList,
> = CompositeScreenProps<
  MachinesDriverPros<T>,
  OwnerRootDriverScreenProps<K, M>
>;

export type MachinesDriverNavigationProps<
  T extends keyof MachinesDriverParamList,
  K extends keyof OwnerRootDriverParamList,
  M extends keyof AuthDriverParamList,
> = CompositeScreenProps<
  MachinesDriverPros<T>,
  OwnerRootDriverScreenProps<K, M>
>['navigation'];

export type MachinesDriverRouteProps<
  T extends keyof MachinesDriverParamList,
  K extends keyof OwnerRootDriverParamList,
  M extends keyof AuthDriverParamList,
> = CompositeScreenProps<
  MachinesDriverPros<T>,
  OwnerRootDriverScreenProps<K, M>
>['route'];
