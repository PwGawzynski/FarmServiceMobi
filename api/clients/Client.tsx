import { t } from 'i18next';
import { Api } from '../Api';
import { apiHandler } from '../services/User';
import { ResponseObject } from '../../FarmServiceApiTypes/Respnse/responseGeneric';
import { TranslationNames } from '../../locales/TranslationNames';
import { ClientResponseBase } from '../../FarmServiceApiTypes/Clients/Responses';
import { CreateClientReqI } from '../../FarmServiceApiTypes/Clients/Requests';

export async function createCompany(data: CreateClientReqI) {
  const UNAUTHORIZED_MSG = t(TranslationNames.serviceDefaults.unauthorised);
  const DEFAULT_MSG = t(TranslationNames.serviceDefaults.default);
  return apiHandler<CreateClientReqI>(
    UNAUTHORIZED_MSG,
    DEFAULT_MSG,
    Api.createClient,
    data,
  ) as unknown as ResponseObject<ClientResponseBase>;
}
