import { StackScreenProps } from '@react-navigation/stack';
import { CompositeScreenProps } from '@react-navigation/native';
import { WorkerActivityDriverParamList } from '../../paramList/activities/WorkerActivityDriverParamList';
import { WorkerRootDriverParamList } from '../../paramList/WorkerRootDriverParamList';
import { AuthDriverParamList } from '../../../Owner/paramLists/AuthDriverParamList';
import { WorkerRootDriverScreenProps } from '../WorkerRootDriverProps';

export type WorkerActivitiesDriverPros<
  T extends keyof WorkerActivityDriverParamList,
> = StackScreenProps<WorkerActivityDriverParamList, T>;

export type WorkerActivitiesDriverScreenProps<
  T extends keyof WorkerActivityDriverParamList,
  K extends keyof WorkerRootDriverParamList,
  M extends keyof AuthDriverParamList,
> = CompositeScreenProps<
  WorkerActivitiesDriverPros<T>,
  WorkerRootDriverScreenProps<K, M>
>;

export type WorkerActivitiesDriverNavigationProps<
  T extends keyof WorkerActivityDriverParamList,
  K extends keyof WorkerRootDriverParamList,
  M extends keyof AuthDriverParamList,
> = CompositeScreenProps<
  WorkerActivitiesDriverPros<T>,
  WorkerRootDriverScreenProps<K, M>
>['navigation'];

export type WorkerActivitiesDriverRouteProps<
  T extends keyof WorkerActivityDriverParamList,
  K extends keyof WorkerRootDriverParamList,
  M extends keyof AuthDriverParamList,
> = CompositeScreenProps<
  WorkerActivitiesDriverPros<T>,
  WorkerRootDriverScreenProps<K, M>
>['route'];
