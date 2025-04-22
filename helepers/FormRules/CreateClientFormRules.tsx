import { t } from 'i18next';
import { FormRulesType } from './FormRulesType';
import { TranslationNames } from '../../locales/TranslationNames';
import { creteMinLenMessage } from './FormRulesHelper';
import { UserPersonalDataConstants } from '../../FarmServiceApiTypes/UserPersonalData/Constants';
import { AddressRules, CommonRules } from './CommonRules';
import { CreateUserForm } from '../../components/pages/owner/mobi/ClientsDesktopDriver/CreateClient';

export const rules: FormRulesType<CreateUserForm> = {
  email: CommonRules.email,
  name: {
    required: t(TranslationNames.createClientForm.validation.name),
    minLength: {
      value: UserPersonalDataConstants.NAME_MIN_LEN,
      message: creteMinLenMessage(
        UserPersonalDataConstants.NAME_MIN_LEN,
        'name',
      ),
    },
    maxLength: {
      value: UserPersonalDataConstants.NAME_MAX_LEN,
      message: creteMinLenMessage(
        UserPersonalDataConstants.NAME_MAX_LEN,
        'name',
      ),
    },
  },
  surname: {
    required: t(TranslationNames.createClientForm.validation.surname),
    minLength: {
      value: UserPersonalDataConstants.SURNAME_MIN_LEN,
      message: creteMinLenMessage(
        UserPersonalDataConstants.SURNAME_MIN_LEN,
        'surname' as never,
      ),
    },
    maxLength: {
      value: UserPersonalDataConstants.SURNAME_MAX_LEN,
      message: creteMinLenMessage(
        UserPersonalDataConstants.SURNAME_MAX_LEN,
        'surname' as never,
      ),
    },
  },
  phoneNumber: {
    required: t(TranslationNames.createClientForm.validation.phoneNumber),
    minLength: {
      value: UserPersonalDataConstants.PHONE_NUMBER_MIN_LEN,
      message: creteMinLenMessage(
        UserPersonalDataConstants.PHONE_NUMBER_MIN_LEN,
        'phoneNumber',
      ),
    },
    maxLength: {
      value: UserPersonalDataConstants.PHONE_NUMBER_MAX_LEN,
      message: creteMinLenMessage(
        UserPersonalDataConstants.PHONE_NUMBER_MAX_LEN,
        'phoneNumber',
      ),
    },
  },
  ...(AddressRules as FormRulesType<CreateUserForm>),
};
