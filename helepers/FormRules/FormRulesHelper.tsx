import { t } from 'i18next';
import { CreateCompanyForm } from '../../components/pages/mobi/AuthDriver/CreateCompany';
import { CreateAddressReqI } from '../../FarmServiceApiTypes/Address/Requests';
import { TranslationNames } from '../../locales/TranslationNames';

export const creteMinLenMessage = (
  minLen: number,
  key: keyof CreateCompanyForm | keyof CreateAddressReqI,
) =>
  `${key} ${t(
    TranslationNames.createCompanyForm.validation.validationAtLeast,
  )} ${minLen} ${t(
    TranslationNames.createCompanyForm.validation.validationCharacters,
  )}`;
