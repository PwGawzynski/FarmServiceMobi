import { NavigatorScreenParams } from '@react-navigation/native';
import { OwnerRootDriverParamList } from './OwnerRootDriverParamList';

export type AuthDriverParamList = {
  landing: undefined;
  chooseLoginType: undefined;
  loginByEmail: undefined;
  chooseRegisterType: undefined;
  passwordReset: undefined;
  ownerRootDriver: NavigatorScreenParams<OwnerRootDriverParamList>;
  OperationConfirmed: {
    redirectScreenName: keyof AuthDriverParamList;
    shownMessage?: string;
    goBack?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload?: any;
  };
};
