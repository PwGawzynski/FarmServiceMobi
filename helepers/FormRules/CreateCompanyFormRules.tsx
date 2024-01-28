import { UseControllerProps } from 'react-hook-form';
import { t } from 'i18next';
import { TranslationNames } from '../../locales/TranslationNames';
import { CompanyConstants } from '../../FarmServiceApiTypes/Company/Constants';
import AddressConstants from '../../FarmServiceApiTypes/Address/Constants';
import { CreateCompanyForm } from '../../components/pages/mobi/AuthDriver/CreateCompany';
import { CreateAddressReqI } from '../../FarmServiceApiTypes/Address/Requests';

const creteMinLenMessage = (
  minLen: number,
  key: keyof CreateCompanyForm | keyof CreateAddressReqI,
) =>
  `${key} ${t(
    TranslationNames.createCompanyForm.validation.validationAtLeast,
  )} ${minLen} ${t(
    TranslationNames.createCompanyForm.validation.validationCharacters,
  )}`;
export const rules: Partial<
  Record<
    keyof CreateCompanyForm,
    UseControllerProps<CreateCompanyForm>['rules']
  >
> = {
  email: {
    required: t(TranslationNames.createCompanyForm.validation.email),
    minLength: {
      value: CompanyConstants.MIN_EMAIL_LENGTH,
      message: creteMinLenMessage(CompanyConstants.MIN_EMAIL_LENGTH, 'email'),
    },
    maxLength: {
      value: CompanyConstants.MAX_EMAIL_LENGTH,
      message: creteMinLenMessage(CompanyConstants.MAX_EMAIL_LENGTH, 'email'),
    },
  },
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
      value: CompanyConstants.MIN_PHONE_LENGTH,
      message: creteMinLenMessage(CompanyConstants.MIN_NIP_LENGTH, 'NIP'),
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
  city: {
    required: t(TranslationNames.createCompanyForm.validation.city),
    minLength: {
      value: AddressConstants.CITY_MIN_LEN,
      message: creteMinLenMessage(CompanyConstants.MIN_EMAIL_LENGTH, 'city'),
    },
    maxLength: {
      value: AddressConstants.CITY_MAX_LEN,
      message: creteMinLenMessage(CompanyConstants.MIN_EMAIL_LENGTH, 'city'),
    },
  },
  county: {
    required: t(TranslationNames.createCompanyForm.validation.county),
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
    required: t(TranslationNames.createCompanyForm.validation.houseNumber),
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
    required: t(TranslationNames.createCompanyForm.validation.postalCode),
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
    required: t(TranslationNames.createCompanyForm.validation.voivodeship),
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
