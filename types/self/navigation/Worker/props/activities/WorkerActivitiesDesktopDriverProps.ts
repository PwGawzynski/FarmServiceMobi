import { StackScreenProps } from '@react-navigation/stack';
import { CompositeScreenProps } from '@react-navigation/native';
import { WorkerActivityDesktopDriverParamList } from '../../paramList/activities/WorkerActivityDesktopDriverParamList';
import { WorkerActivityDriverParamList } from '../../paramList/activities/WorkerActivityDriverParamList';
import { WorkerRootDriverParamList } from '../../paramList/WorkerRootDriverParamList';
import { AuthDriverParamList } from '../../../Owner/paramLists/AuthDriverParamList';
import { WorkerActivitiesDriverScreenProps } from './WorkerActivitiesDriverProps';

export type ActivitiesDesktopDriverProps<
  T extends keyof WorkerActivityDesktopDriverParamList,
> = StackScreenProps<WorkerActivityDesktopDriverParamList, T>;

export type ActivitiesDesktopDriverScreenProps<
  T extends keyof WorkerActivityDesktopDriverParamList,
  L extends keyof WorkerActivityDriverParamList,
  K extends keyof WorkerRootDriverParamList,
  M extends keyof AuthDriverParamList,
> = CompositeScreenProps<
  ActivitiesDesktopDriverProps<T>,
  WorkerActivitiesDriverScreenProps<L, K, M>
>;

export type ActivitiesDesktopDriverNavigationProps<
  T extends keyof WorkerActivityDesktopDriverParamList,
  L extends keyof WorkerActivityDriverParamList,
  K extends keyof WorkerRootDriverParamList,
  M extends keyof AuthDriverParamList,
> = CompositeScreenProps<
  ActivitiesDesktopDriverProps<T>,
  WorkerActivitiesDriverScreenProps<L, K, M>
>['navigation'];

export type ActivitiesDesktopDriverRouteProps<
  T extends keyof WorkerActivityDesktopDriverParamList,
  L extends keyof WorkerActivityDriverParamList,
  K extends keyof WorkerRootDriverParamList,
  M extends keyof AuthDriverParamList,
> = CompositeScreenProps<
  ActivitiesDesktopDriverProps<T>,
  WorkerActivitiesDriverScreenProps<L, K, M>
>['route'];
