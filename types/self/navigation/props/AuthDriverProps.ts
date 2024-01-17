import { StackScreenProps } from '@react-navigation/stack';
import { AuthDriverParamList } from '../paramLists/AuthDriverParamList';

export type AuthDriverProps<T extends keyof AuthDriverParamList> =
  StackScreenProps<AuthDriverParamList, T>;

export type AuthDriverNavigationProps<T extends keyof AuthDriverParamList> =
  AuthDriverProps<T>['navigation'];

export type AuthDriverRouteProps<T extends keyof AuthDriverParamList> =
  AuthDriverProps<T>['route'];
