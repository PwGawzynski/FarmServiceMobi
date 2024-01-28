import { NavigatorScreenParams } from '@react-navigation/native';
import { OwnerRootDriverParamList } from './OwnerRootDriverParamList';
import { OrdersDriverParamList } from './orders/OrdersDriverParamList';
import { OrdersDesktopDriverParamList } from './orders/OrdersDesktopDriverParamList';
import { ClientsDriverParamList } from './clients/ClientsDriverParamList';
import { ClientsDesktopDriverParamList } from './clients/ClientsDesktopDriverParamList';
import { ActivityDriverParamList } from './activities/ActivityDriverParamList';
import { ActivityDesktopDriverParamList } from './activities/ActivityDesktopDriverParamList';

export type AuthDriverParamList = {
  createCompany: undefined;
  landing: undefined;
  chooseLoginType: undefined;
  loginByEmail: undefined;
  chooseRegisterType: undefined;
  passwordReset: undefined;
  ownerRootDriver: NavigatorScreenParams<OwnerRootDriverParamList>;
  OperationConfirmed: {
    redirectScreenName:
      | keyof AuthDriverParamList
      | keyof OwnerRootDriverParamList
      | keyof OrdersDriverParamList
      | keyof OrdersDesktopDriverParamList
      | keyof ClientsDriverParamList
      | keyof ClientsDesktopDriverParamList
      | keyof ActivityDriverParamList
      | keyof ActivityDesktopDriverParamList;
    shownMessage?: string;
    goBack?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload?: any;
  };
};
