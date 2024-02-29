import { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { OwnerRootDriverParamList } from '../paramLists/OwnerRootDriverParamList';
import { AuthDriverProps } from './AuthDriverProps';
import { AuthDriverParamList } from '../paramLists/AuthDriverParamList';

export type OwnerRootDriverPros<T extends keyof OwnerRootDriverParamList> =
  StackScreenProps<OwnerRootDriverParamList, T>;

export type OwnerRootDriverScreenProps<
  T extends keyof OwnerRootDriverParamList,
  M extends keyof AuthDriverParamList,
> = CompositeScreenProps<OwnerRootDriverPros<T>, AuthDriverProps<M>>;

export type OwnerRootDriverNavigationProps<
  T extends keyof OwnerRootDriverParamList,
  M extends keyof AuthDriverParamList,
> = CompositeScreenProps<
  OwnerRootDriverPros<T>,
  AuthDriverProps<M>
>['navigation'];

export type OwnerRootDriverRouteProps<
  T extends keyof OwnerRootDriverParamList,
  M extends keyof AuthDriverParamList,
> = CompositeScreenProps<OwnerRootDriverPros<T>, AuthDriverProps<M>>['route'];
