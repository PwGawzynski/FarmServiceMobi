import { t } from 'i18next';
import { FormRulesType } from './FormRulesType';
import { CreateClientForm } from '../../components/pages/mobi/ClientsDesktopDriver/NewClient';
import { TranslationNames } from '../../locales/TranslationNames';
import AddressConstants from '../../FarmServiceApiTypes/Address/Constants';
import { creteMinLenMessage } from './FormRulesHelper';
import { LoginUserConstants } from '../../FarmServiceApiTypes/User/Constants';
import { UserPersonalDataConstants } from '../../FarmServiceApiTypes/UserPersonalData/Constants';

export const rules: FormRulesType<CreateClientForm> = {
  email: {
    required: t(TranslationNames.createClientForm.validation.email),
    minLength: {
      value: LoginUserConstants.EMAIL_MIN_LEN,
      message: creteMinLenMessage(LoginUserConstants.EMAIL_MIN_LEN, 'email'),
    },
    maxLength: {
      value: LoginUserConstants.EMAIL_MAX_LEN,
      message: creteMinLenMessage(LoginUserConstants.EMAIL_MAX_LEN, 'email'),
    },
  },
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
  phone_number: {
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
  city: {
    required: t(TranslationNames.addressForm.validation.city),
    minLength: {
      value: AddressConstants.CITY_MIN_LEN,
      message: creteMinLenMessage(AddressConstants.CITY_MIN_LEN, 'city'),
    },
    maxLength: {
      value: AddressConstants.CITY_MAX_LEN,
      message: creteMinLenMessage(AddressConstants.CITY_MIN_LEN, 'city'),
    },
  },
  county: {
    required: t(TranslationNames.addressForm.validation.county),
    minLength: {
      value: AddressConstants.COUNTY_MIN_LEN,
      message: creteMinLenMessage(AddressConstants.COUNTY_MIN_LEN, 'county'),
    },
    maxLength: {
      value: AddressConstants.COUNTY_MAX_LEN,
      message: creteMinLenMessage(AddressConstants.COUNTY_MAX_LEN, 'county'),
    },
  },
  apartmentNumber: {
    minLength: {
      value: AddressConstants.APARTMENT_NR_MIN_LEN,
      message: creteMinLenMessage(
        AddressConstants.APARTMENT_NR_MIN_LEN,
        'apartmentNumber',
      ),
    },
    maxLength: {
      value: AddressConstants.APARTMENT_NR_MAX_LEN,
      message: creteMinLenMessage(
        AddressConstants.APARTMENT_NR_MAX_LEN,
        'apartmentNumber',
      ),
    },
  },
  houseNumber: {
    required: t(TranslationNames.addressForm.validation.houseNumber),
    minLength: {
      value: AddressConstants.HOUSE_NR_MIN_LEN,
      message: creteMinLenMessage(
        AddressConstants.HOUSE_NR_MIN_LEN,
        'houseNumber',
      ),
    },
    maxLength: {
      value: AddressConstants.HOUSE_NR_MAX_LEN,
      message: creteMinLenMessage(
        AddressConstants.HOUSE_NR_MAX_LEN,
        'houseNumber',
      ),
    },
  },
  postalCode: {
    required: t(TranslationNames.addressForm.validation.postalCode),
    minLength: {
      value: AddressConstants.POSTAL_CODE_LEN,
      message: creteMinLenMessage(
        AddressConstants.HOUSE_NR_MIN_LEN,
        'postalCode',
      ),
    },
    maxLength: {
      value: AddressConstants.POSTAL_CODE_LEN,
      message: creteMinLenMessage(
        AddressConstants.POSTAL_CODE_LEN,
        'postalCode',
      ),
    },
  },
  street: {
    minLength: {
      value: AddressConstants.STREET_MIN_LEN,
      message: creteMinLenMessage(AddressConstants.STREET_MIN_LEN, 'street'),
    },
    maxLength: {
      value: AddressConstants.STREET_MAX_LEN,
      message: creteMinLenMessage(AddressConstants.STREET_MAX_LEN, 'street'),
    },
  },
  voivodeship: {
    required: t(TranslationNames.addressForm.validation.voivodeship),
    minLength: {
      value: AddressConstants.VOIVODESHIP_MIN_LEN,
      message: creteMinLenMessage(
        AddressConstants.VOIVODESHIP_MIN_LEN,
        'voivodeship',
      ),
    },
    maxLength: {
      value: AddressConstants.VOIVODESHIP_MAX_LEN,
      message: creteMinLenMessage(
        AddressConstants.VOIVODESHIP_MAX_LEN,
        'voivodeship',
      ),
    },
  },
};
