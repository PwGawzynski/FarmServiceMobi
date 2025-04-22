import { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { WorkerRootDriverParamList } from '../paramList/WorkerRootDriverParamList';
import { AuthDriverParamList } from '../../Owner/paramLists/AuthDriverParamList';
import { AuthDriverProps } from '../../Owner/props/AuthDriverProps';

export type WorkerRootDriverPros<T extends keyof WorkerRootDriverParamList> =
  StackScreenProps<WorkerRootDriverParamList, T>;

export type WorkerRootDriverScreenProps<
  T extends keyof WorkerRootDriverParamList,
  M extends keyof AuthDriverParamList,
> = CompositeScreenProps<WorkerRootDriverPros<T>, AuthDriverProps<M>>;

export type WorkerRootDriverNavigationProps<
  T extends keyof WorkerRootDriverParamList,
  M extends keyof AuthDriverParamList,
> = CompositeScreenProps<
  WorkerRootDriverPros<T>,
  AuthDriverProps<M>
>['navigation'];

export type WorkerRootDriverRouteProps<
  T extends keyof WorkerRootDriverParamList,
  M extends keyof AuthDriverParamList,
> = CompositeScreenProps<WorkerRootDriverPros<T>, AuthDriverProps<M>>['route'];
