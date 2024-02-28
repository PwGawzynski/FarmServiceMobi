import { StackScreenProps } from '@react-navigation/stack';
import { CompositeScreenProps } from '@react-navigation/native';
import { OwnerRootDriverParamList } from '../../paramLists/OwnerRootDriverParamList';
import { AuthDriverParamList } from '../../paramLists/AuthDriverParamList';
import { ActivityDesktopDriverParamList } from '../../paramLists/activities/ActivityDesktopDriverParamList';
import { ActivityDriverParamList } from '../../paramLists/activities/ActivityDriverParamList';
import { ActivitiesDriverScreenProps } from './ActivitiesDriverProps';

export type ActivitiesDesktopDriverProps<
  T extends keyof ActivityDesktopDriverParamList,
> = StackScreenProps<ActivityDesktopDriverParamList, T>;

export type ActivitiesDesktopDriverScreenProps<
  T extends keyof ActivityDesktopDriverParamList,
  L extends keyof ActivityDriverParamList,
  K extends keyof OwnerRootDriverParamList,
  M extends keyof AuthDriverParamList,
> = CompositeScreenProps<
  ActivitiesDesktopDriverProps<T>,
  ActivitiesDriverScreenProps<L, K, M>
>;

export type ActivitiesDesktopDriverNavigationProps<
  T extends keyof ActivityDesktopDriverParamList,
  L extends keyof ActivityDriverParamList,
  K extends keyof OwnerRootDriverParamList,
  M extends keyof AuthDriverParamList,
> = CompositeScreenProps<
  ActivitiesDesktopDriverProps<T>,
  ActivitiesDriverScreenProps<L, K, M>
>['navigation'];

export type ActivitiesDesktopDriverRouteProps<
  T extends keyof ActivityDesktopDriverParamList,
  L extends keyof ActivityDriverParamList,
  K extends keyof OwnerRootDriverParamList,
  M extends keyof AuthDriverParamList,
> = CompositeScreenProps<
  ActivitiesDesktopDriverProps<T>,
  ActivitiesDriverScreenProps<L, K, M>
>['route'];
