import { NavigatorScreenParams } from '@react-navigation/native';
import { ClientsDesktopDriverParamList } from './ClientsDesktopDriverParamList';
import { ClientResponseBase } from '../../../../../FarmServiceApiTypes/Clients/Responses';
import { CreateClientReqI } from '../../../../../FarmServiceApiTypes/Clients/Requests';

export type ClientsDriverParamList = {
  clientsDesktopRoot: NavigatorScreenParams<ClientsDesktopDriverParamList>;
  clientDetails: {
    client: ClientResponseBase;
  };
  assignCompanyToClient: {
    client?: CreateClientReqI;
    editClient?: ClientResponseBase;
  };
};
