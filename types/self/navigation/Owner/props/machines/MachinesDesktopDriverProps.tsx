import { StackScreenProps } from '@react-navigation/stack';
import { CompositeScreenProps } from '@react-navigation/native';
import { OwnerRootDriverParamList } from '../../paramLists/OwnerRootDriverParamList';
import { AuthDriverParamList } from '../../paramLists/AuthDriverParamList';
import { MachinesDesktopDriverParamList } from '../../paramLists/machines/MachinesDesktopDriverParamList';
import { MachinesDriverParamList } from '../../paramLists/machines/MachinesDriverParamList';
import { MachinesDriverScreenProps } from './MachinesDriverProps';

export type MachinesDesktopDriverProps<
  T extends keyof MachinesDesktopDriverParamList,
> = StackScreenProps<MachinesDesktopDriverParamList, T>;

export type MachinesDesktopDriverScreenProps<
  T extends keyof MachinesDesktopDriverParamList,
  L extends keyof MachinesDriverParamList,
  K extends keyof OwnerRootDriverParamList,
  M extends keyof AuthDriverParamList,
> = CompositeScreenProps<
  MachinesDesktopDriverProps<T>,
  MachinesDriverScreenProps<L, K, M>
>;

export type MachinesDesktopDriverNavigationProps<
  T extends keyof MachinesDesktopDriverParamList,
  L extends keyof MachinesDriverParamList,
  K extends keyof OwnerRootDriverParamList,
  M extends keyof AuthDriverParamList,
> = CompositeScreenProps<
  MachinesDesktopDriverProps<T>,
  MachinesDriverScreenProps<L, K, M>
>['navigation'];

export type MachinesDesktopDriverRouteProps<
  T extends keyof MachinesDesktopDriverParamList,
  L extends keyof MachinesDriverParamList,
  K extends keyof OwnerRootDriverParamList,
  M extends keyof AuthDriverParamList,
> = CompositeScreenProps<
  MachinesDesktopDriverProps<T>,
  MachinesDriverScreenProps<L, K, M>
>['route'];
