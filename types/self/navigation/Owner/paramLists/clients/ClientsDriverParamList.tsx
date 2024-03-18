import { NavigatorScreenParams } from '@react-navigation/native';
import { ClientsDesktopDriverParamList } from './ClientsDesktopDriverParamList';
import { ClientResponseBase } from '../../../../../../FarmServiceApiTypes/Clients/Responses';
import { CreateClientReqI } from '../../../../../../FarmServiceApiTypes/Clients/Requests';
import { ClientsCompanyResponseBase } from '../../../../../../FarmServiceApiTypes/ClientsCompany/Responses';

export type ClientsDriverParamList = {
  clientsDesktopRoot: NavigatorScreenParams<ClientsDesktopDriverParamList>;
  clientDetails: {
    client: ClientResponseBase;
  };
  clientControlPanel: {
    client: ClientResponseBase;
  };
  assignCompanyToClient: {
    onCreateClient?: CreateClientReqI;
    afterCreateClient?: ClientResponseBase;
    onEdit?: {
      client: ClientResponseBase;
      company: ClientsCompanyResponseBase;
    };
  };
};
