import { StackScreenProps } from '@react-navigation/stack';
import { CompositeScreenProps } from '@react-navigation/native';
import { OwnerRootDriverParamList } from '../../paramLists/OwnerRootDriverParamList';
import { AuthDriverParamList } from '../../paramLists/AuthDriverParamList';
import { OwnerRootDriverScreenProps } from '../OwnerRootDriverProps';
import { ActivityDriverParamList } from '../../paramLists/activities/ActivityDriverParamList';

export type ActivitiesDriverPros<T extends keyof ActivityDriverParamList> =
  StackScreenProps<ActivityDriverParamList, T>;

export type ActivitiesDriverScreenProps<
  T extends keyof ActivityDriverParamList,
  K extends keyof OwnerRootDriverParamList,
  M extends keyof AuthDriverParamList,
> = CompositeScreenProps<
  ActivitiesDriverPros<T>,
  OwnerRootDriverScreenProps<K, M>
>;

export type ActivitiesDriverNavigationProps<
  T extends keyof ActivityDriverParamList,
  K extends keyof OwnerRootDriverParamList,
  M extends keyof AuthDriverParamList,
> = CompositeScreenProps<
  ActivitiesDriverPros<T>,
  OwnerRootDriverScreenProps<K, M>
>['navigation'];

export type ActivitiesDriverRouteProps<
  T extends keyof ActivityDriverParamList,
  K extends keyof OwnerRootDriverParamList,
  M extends keyof AuthDriverParamList,
> = CompositeScreenProps<
  ActivitiesDriverPros<T>,
  OwnerRootDriverScreenProps<K, M>
>['route'];
