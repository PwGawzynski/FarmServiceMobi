import { t } from 'i18next';
import { Control } from 'react-hook-form/dist/types/form';
import { FormControllerSetup } from '../../components/atoms/FormCreator';
import { rules } from '../FormRules/CreateClientFormRules';
import { TranslationNames } from '../../locales/TranslationNames';
import { CreateClientForm } from '../../components/pages/owner/mobi/ClientsDesktopDriver/CreateClient';

export const createClientSetup = (
  control: Control<CreateClientForm>,
  onPhoneNumberFocus: () => void,
): FormControllerSetup<CreateClientForm> => [
  {
    control,
    rules: rules.email,
    name: 'email',
    textInputProp: {
      keyboardType: 'email-address',
      placeholder: t(TranslationNames.createCompanyForm.formPlaceholder.email),
    },
  },
  {
    control,
    rules: rules.name,
    name: 'name',
    textInputProp: {
      keyboardType: 'default',
      placeholder: t(TranslationNames.createClientForm.formPlaceholder.name),
    },
  },
  {
    control,
    rules: rules.surname,
    name: 'surname',
    textInputProp: {
      keyboardType: 'default',
      placeholder: t(TranslationNames.createClientForm.formPlaceholder.surname),
    },
  },
  {
    control,
    rules: rules.phoneNumber,
    name: 'phoneNumber',
    textInputProp: {
      onFocus: onPhoneNumberFocus,
      keyboardType: 'phone-pad',
      placeholder: t(
        TranslationNames.createClientForm.formPlaceholder.phoneNumber,
      ),
    },
  },
  {
    control,
    rules: rules.city,
    name: 'city',
    textInputProp: {
      keyboardType: 'default',
      placeholder: t(TranslationNames.addressForm.formPlaceholder.city),
    },
  },
  {
    control,
    rules: rules.county,
    name: 'county',
    textInputProp: {
      keyboardType: 'default',
      autoComplete: 'country',
      placeholder: t(TranslationNames.addressForm.formPlaceholder.county),
    },
  },
  {
    control,
    rules: rules.apartmentNumber,
    name: 'apartmentNumber',
    textInputProp: {
      keyboardType: 'numbers-and-punctuation',
      placeholder: t(
        TranslationNames.addressForm.formPlaceholder.apartmentNumber,
      ),
    },
  },
  {
    control,
    rules: rules.houseNumber,
    name: 'houseNumber',
    textInputProp: {
      keyboardType: 'numbers-and-punctuation',
      placeholder: t(TranslationNames.addressForm.formPlaceholder.houseNumber),
    },
  },
  {
    control,
    rules: rules.postalCode,
    name: 'postalCode',
    textInputProp: {
      keyboardType: 'numbers-and-punctuation',
      autoComplete: 'postal-code',
      placeholder: t(TranslationNames.addressForm.formPlaceholder.postalCode),
    },
  },
  {
    control,
    rules: rules.street,
    name: 'street',
    textInputProp: {
      keyboardType: 'default',
      autoComplete: 'street-address',
      placeholder: t(TranslationNames.addressForm.formPlaceholder.street),
    },
  },
  {
    control,
    rules: rules.voivodeship,
    name: 'voivodeship',
    textInputProp: {
      keyboardType: 'default',
      autoComplete: 'postal-address-region',
      placeholder: t(TranslationNames.addressForm.formPlaceholder.voivodeship),
    },
  },
];
