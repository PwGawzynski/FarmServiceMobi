import { t } from 'i18next';
import { TranslationNames } from '../../locales/TranslationNames';
import { CompanyConstants } from '../../FarmServiceApiTypes/Company/Constants';
import { CreateCompanyForm } from '../../components/pages/mobi/AuthDriver/CreateCompany';
import { FormRulesType } from './FormRulesType';
import { creteMinLenMessage } from './FormRulesHelper';
import { AddressRules, CommonRules } from './CommonRules';

export const rules: FormRulesType<CreateCompanyForm> = {
  email: CommonRules.email,
  name: {
    required: t(TranslationNames.createCompanyForm.validation.name),
    minLength: {
      value: CompanyConstants.MIN_NAME_LENGTH,
      message: creteMinLenMessage(CompanyConstants.MIN_EMAIL_LENGTH, 'name'),
    },
    maxLength: {
      value: CompanyConstants.MAX_NAME_LENGTH,
      message: creteMinLenMessage(CompanyConstants.MAX_NAME_LENGTH, 'name'),
    },
  },
  NIP: {
    required: t(TranslationNames.createCompanyForm.validation.NIP),
    minLength: {
      value: CompanyConstants.MIN_NIP_LENGTH,
      message: creteMinLenMessage(CompanyConstants.MIN_NIP_LENGTH, 'NIP'),
    },
    maxLength: {
      value: CompanyConstants.MAX_NIP_LENGTH,
      message: creteMinLenMessage(CompanyConstants.MAX_NIP_LENGTH, 'NIP'),
    },
  },
  phoneNumber: {
    required: t(TranslationNames.createCompanyForm.validation.phoneNumber),
    minLength: {
      value: CompanyConstants.MIN_PHONE_LENGTH,
      message: creteMinLenMessage(
        CompanyConstants.MIN_EMAIL_LENGTH,
        'phoneNumber',
      ),
    },
    maxLength: {
      value: CompanyConstants.MAX_PHONE_LENGTH,
      message: creteMinLenMessage(
        CompanyConstants.MIN_EMAIL_LENGTH,
        'phoneNumber',
      ),
    },
  },
  ...AddressRules,
};
