import { StackScreenProps } from '@react-navigation/stack';
import { CompositeScreenProps } from '@react-navigation/native';
import { OwnerRootDriverParamList } from '../../paramLists/OwnerRootDriverParamList';
import { AuthDriverParamList } from '../../paramLists/AuthDriverParamList';
import { WorkersDesktopDriverParamList } from '../../paramLists/workers/WorkersDesktopDriverParamList';
import { WorkersDriverScreenProps } from './WorkersDriverProps';
import { WorkersDriverParamList } from '../../paramLists/workers/WorkersDriverParamList';

export type WorkersDesktopDriverProps<
  T extends keyof WorkersDesktopDriverParamList,
> = StackScreenProps<WorkersDesktopDriverParamList, T>;

export type WorkersDesktopDriverScreenProps<
  T extends keyof WorkersDesktopDriverParamList,
  L extends keyof WorkersDriverParamList,
  K extends keyof OwnerRootDriverParamList,
  M extends keyof AuthDriverParamList,
> = CompositeScreenProps<
  WorkersDesktopDriverProps<T>,
  WorkersDriverScreenProps<L, K, M>
>;

export type WorkersDesktopDriverNavigationProps<
  T extends keyof WorkersDesktopDriverParamList,
  L extends keyof WorkersDriverParamList,
  K extends keyof OwnerRootDriverParamList,
  M extends keyof AuthDriverParamList,
> = CompositeScreenProps<
  WorkersDesktopDriverProps<T>,
  WorkersDriverScreenProps<L, K, M>
>['navigation'];

export type WorkersDesktopDriverRouteProps<
  T extends keyof WorkersDesktopDriverParamList,
  L extends keyof WorkersDriverParamList,
  K extends keyof OwnerRootDriverParamList,
  M extends keyof AuthDriverParamList,
> = CompositeScreenProps<
  WorkersDesktopDriverProps<T>,
  WorkersDriverScreenProps<L, K, M>
>['route'];
