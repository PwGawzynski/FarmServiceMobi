import { NativeStackScreenProps } from 'react-native-screens/native-stack';
import { AuthDriverParamList } from '../paramLists/AuthDriverParamList';

export type AuthDriverProps<T extends keyof AuthDriverParamList> =
  NativeStackScreenProps<AuthDriverParamList, T>;

export type AuthDriverNavigationProps<T extends keyof AuthDriverParamList> =
  AuthDriverProps<T>['navigation'];

export type AuthDriverRouteProps<T extends keyof AuthDriverParamList> =
  AuthDriverProps<T>['route'];
