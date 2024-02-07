import { NavigatorScreenParams } from '@react-navigation/native';
import { ClientsDesktopDriverParamList } from './ClientsDesktopDriverParamList';
import { ClientResponseBase } from '../../../../../FarmServiceApiTypes/Clients/Responses';

export type ClientsDriverParamList = {
  clientsDesktopRoot: NavigatorScreenParams<ClientsDesktopDriverParamList>;
  clientDetails: {
    client: ClientResponseBase;
  };
};
