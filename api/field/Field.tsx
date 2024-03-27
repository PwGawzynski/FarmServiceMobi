import { t } from 'i18next';
import { TranslationNames } from '../../locales/TranslationNames';
import { apiHandler } from '../services/User';
import { Api } from '../Api';
import {
  CreateFieldReqI,
  updateFieldReqI,
} from '../../FarmServiceApiTypes/Field/Requests';
import { FieldResponseBase } from '../../FarmServiceApiTypes/Field/Ressponses';

export async function createField(data: CreateFieldReqI) {
  const UNAUTHORIZED_MSG = t(TranslationNames.serviceDefaults.unauthorised);
  const DEFAULT_MSG = t(TranslationNames.serviceDefaults.default);
  return apiHandler<CreateFieldReqI, FieldResponseBase | undefined>(
    UNAUTHORIZED_MSG,
    DEFAULT_MSG,
    Api.createField,
    data,
  ) as unknown as FieldResponseBase | undefined;
}
export async function editField(data: updateFieldReqI) {
  const UNAUTHORIZED_MSG = t(TranslationNames.serviceDefaults.unauthorised);
  const DEFAULT_MSG = t(TranslationNames.serviceDefaults.default);
  return apiHandler<updateFieldReqI, FieldResponseBase | undefined>(
    UNAUTHORIZED_MSG,
    DEFAULT_MSG,
    Api.editField,
    data,
  ) as unknown as FieldResponseBase | undefined;
}
