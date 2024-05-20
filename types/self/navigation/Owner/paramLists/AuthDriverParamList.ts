import { NavigatorScreenParams } from '@react-navigation/native';
import { OwnerRootDriverParamList } from './OwnerRootDriverParamList';
import { OrdersDriverParamList } from './orders/OrdersDriverParamList';
import { OrdersDesktopDriverParamList } from './orders/OrdersDesktopDriverParamList';
import { ClientsDriverParamList } from './clients/ClientsDriverParamList';
import { ClientsDesktopDriverParamList } from './clients/ClientsDesktopDriverParamList';
import { ActivityDriverParamList } from './activities/ActivityDriverParamList';
import { ActivityDesktopDriverParamList } from './activities/ActivityDesktopDriverParamList';
import { WorkerRootDriverParamList } from '../../Worker/paramList/WorkerRootDriverParamList';
import { ClientResponseBase } from '../../../../../FarmServiceApiTypes/Clients/Responses';
import { FieldResponseBase } from '../../../../../FarmServiceApiTypes/Field/Ressponses';
import { UserRole } from '../../../../../FarmServiceApiTypes/User/Enums';

export type AuthDriverParamList = {
  createCompany: undefined;
  landing: undefined;
  chooseLoginType: undefined;
  loginByEmail: undefined;
  chooseRegisterType: undefined;
  chooseRole: {
    byGoogle?: {
      email: string;
      name?: string;
      surname?: string;
    };
  };
  register: {
    role: UserRole.Owner | UserRole.Worker | UserRole.Client;
    byGoogle?: {
      email: string;
      name?: string;
      surname?: string;
    };
  };
  passwordReset: undefined;
  addField: { client: ClientResponseBase; goBack?: boolean };
  editField: { client: ClientResponseBase; field: FieldResponseBase };
  ownerRootDriver: NavigatorScreenParams<OwnerRootDriverParamList>;
  workerRootDriver: NavigatorScreenParams<WorkerRootDriverParamList>;
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
