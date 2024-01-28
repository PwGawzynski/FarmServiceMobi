import { t } from 'i18next';
import { Api } from '../Api';
import { apiHandler } from '../services/User';
import { CreateCompanyReqI } from '../../FarmServiceApiTypes/Company/Requests';
import { CompanyResponseBase } from '../../FarmServiceApiTypes/Company/Responses';
import { ResponseObject } from '../../FarmServiceApiTypes/Respnse/responseGeneric';
import { TranslationNames } from '../../locales/TranslationNames';

export async function createCompany(data: CreateCompanyReqI) {
  const UNAUTHORIZED_MSG = t(TranslationNames.serviceDefaults.unauthorised);
  const DEFAULT_MSG = t(TranslationNames.serviceDefaults.default);
  return apiHandler<CreateCompanyReqI>(
    UNAUTHORIZED_MSG,
    DEFAULT_MSG,
    Api.createCompany,
    data,
  ) as unknown as ResponseObject<CompanyResponseBase>;
}
