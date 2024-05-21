import { t } from 'i18next';
import { TranslationNames } from '../../locales/TranslationNames';
import { apiHandler } from '../services/User';
import { Api } from '../Api';
import { UpdateAccountReqI } from '../../FarmServiceApiTypes/Account/Requests';
import { ResponseObject } from '../../FarmServiceApiTypes/Respnse/responseGeneric';

export async function updateAccount(data: UpdateAccountReqI) {
  const UNAUTHORIZED_MSG = t(TranslationNames.serviceDefaults.unauthorised);
  const DEFAULT_MSG = t(TranslationNames.serviceDefaults.default);
  return apiHandler<UpdateAccountReqI, ResponseObject | undefined>(
    UNAUTHORIZED_MSG,
    DEFAULT_MSG,
    Api.updateAccountSettings,
    data,
  ) as unknown as ResponseObject | undefined;
}
