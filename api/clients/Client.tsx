import { t } from 'i18next';
import { Api } from '../Api';
import { apiHandler } from '../services/User';
import { TranslationNames } from '../../locales/TranslationNames';
import { ClientResponseBase } from '../../FarmServiceApiTypes/Clients/Responses';
import { CreateClientReqI } from '../../FarmServiceApiTypes/Clients/Requests';
import { CreateClientsCompanyReqI } from '../../FarmServiceApiTypes/ClientsCompany/Requests';
import { ClientsCompanyResponseBase } from '../../FarmServiceApiTypes/ClientsCompany/Responses';

export async function createClient(data: CreateClientReqI) {
  const UNAUTHORIZED_MSG = t(TranslationNames.serviceDefaults.unauthorised);
  const DEFAULT_MSG = t(TranslationNames.serviceDefaults.default);
  return apiHandler<CreateClientReqI, ClientResponseBase | undefined>(
    UNAUTHORIZED_MSG,
    DEFAULT_MSG,
    Api.createClient,
    data,
  ) as unknown as ClientResponseBase | undefined;
}

export async function assignCompanyToClient(data: CreateClientsCompanyReqI) {
  const UNAUTHORIZED_MSG = t(TranslationNames.serviceDefaults.unauthorised);
  const DEFAULT_MSG = t(TranslationNames.serviceDefaults.default);
  return apiHandler<
    CreateClientsCompanyReqI,
    ClientsCompanyResponseBase | undefined
  >(
    UNAUTHORIZED_MSG,
    DEFAULT_MSG,
    Api.assignCompanyToClient,
    data,
  ) as unknown as ClientsCompanyResponseBase | undefined;
}
export async function getClients() {
  const UNAUTHORIZED_MSG = t(TranslationNames.serviceDefaults.unauthorised);
  const DEFAULT_MSG = t(TranslationNames.serviceDefaults.default);
  return apiHandler<ClientResponseBase>(
    UNAUTHORIZED_MSG,
    DEFAULT_MSG,
    Api.getClients,
  ) as unknown as Array<ClientResponseBase> | undefined;
}
