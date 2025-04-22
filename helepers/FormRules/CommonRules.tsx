import { t } from 'i18next';
import { TranslationNames } from '../../locales/TranslationNames';
import { LoginUserConstants } from '../../FarmServiceApiTypes/User/Constants';
import { creteMinLenMessage } from './FormRulesHelper';
import AddressConstants from '../../FarmServiceApiTypes/Address/Constants';
import { FormRulesType } from './FormRulesType';
import { CreateAddressReqI } from '../../FarmServiceApiTypes/Address/Requests';
import { ExtendedFormData } from '../../components/organisms/AddFieldForm';

export const CommonRules = {
  email: {
    pattern: {
      value: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
      message: t(TranslationNames.createClientForm.validation.emailPattern),
    },
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
};

export const FieldAddressRules: FormRulesType<ExtendedFormData> = {
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
  longitude: {
    required: t(TranslationNames.addressForm.validation.longitude),
  },
  latitude: {
    required: t(TranslationNames.addressForm.validation.latitude),
  },
};

export const AddressRules: FormRulesType<CreateAddressReqI> = {
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
    pattern: {
      value: /^[0-9]{2}-[0-9]{3}$/,
      message: t(TranslationNames.addressForm.validation.postalCode),
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
