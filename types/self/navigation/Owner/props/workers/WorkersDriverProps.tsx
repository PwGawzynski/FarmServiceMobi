import { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { OwnerRootDriverParamList } from '../../paramLists/OwnerRootDriverParamList';
import { OwnerRootDriverScreenProps } from '../OwnerRootDriverProps';
import { AuthDriverParamList } from '../../paramLists/AuthDriverParamList';
import { WorkersDriverParamList } from '../../paramLists/workers/WorkersDriverParamList';

export type WorkersDriverPros<T extends keyof WorkersDriverParamList> =
  StackScreenProps<WorkersDriverParamList, T>;

export type WorkersDriverScreenProps<
  T extends keyof WorkersDriverParamList,
  K extends keyof OwnerRootDriverParamList,
  M extends keyof AuthDriverParamList,
> = CompositeScreenProps<
  WorkersDriverPros<T>,
  OwnerRootDriverScreenProps<K, M>
>;

export type WorkersDriverNavigationProps<
  T extends keyof WorkersDriverParamList,
  K extends keyof OwnerRootDriverParamList,
  M extends keyof AuthDriverParamList,
> = CompositeScreenProps<
  WorkersDriverPros<T>,
  OwnerRootDriverScreenProps<K, M>
>['navigation'];

export type WorkersDriverRouteProps<
  T extends keyof WorkersDriverParamList,
  K extends keyof OwnerRootDriverParamList,
  M extends keyof AuthDriverParamList,
> = CompositeScreenProps<
  WorkersDriverPros<T>,
  OwnerRootDriverScreenProps<K, M>
>['route'];
