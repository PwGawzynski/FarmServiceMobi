import { Control } from 'react-hook-form/dist/types/form';
import { t } from 'i18next';
import { FormControllerSetup } from '../../components/atoms/FormCreator';
import { rules } from '../FormRules/CreateCompanyFormRules';
import { TranslationNames } from '../../locales/TranslationNames';
import { CreateClientsCompanyForm } from '../../components/pages/mobi/ClientsDriver/AssignCompanyToClient';
import { CreateCompanyForm } from '../../components/pages/mobi/AuthDriver/CreateCompany';

export const createCompanySetupBase = <T, M>(control: T): M =>
  [
    {
      control,
      rules: rules.email,
      name: 'email',
      textInputProp: {
        keyboardType: 'email-address',
        placeholder: t(
          TranslationNames.createCompanyForm.formPlaceholder.email,
        ),
      },
    },
    {
      control,
      rules: rules.NIP,
      name: 'NIP',
      textInputProp: {
        keyboardType: 'number-pad',
        placeholder: t(TranslationNames.createCompanyForm.formPlaceholder.NIP),
      },
    },
    {
      control,
      rules: rules.name,
      name: 'name',
      textInputProp: {
        placeholder: t(TranslationNames.createCompanyForm.formPlaceholder.name),
      },
    },
    {
      control,
      rules: rules.phoneNumber,
      name: 'phoneNumber',
      textInputProp: {
        keyboardType: 'phone-pad',
        placeholder: t(
          TranslationNames.createCompanyForm.formPlaceholder.phoneNumber,
        ),
      },
    },
    {
      control,
      rules: rules.city,
      name: 'city',
      textInputProp: {
        placeholder: t(TranslationNames.addressForm.formPlaceholder.city),
      },
    },
    {
      control,
      rules: rules.county,
      name: 'county',
      textInputProp: {
        autoComplete: 'country',
        placeholder: t(TranslationNames.addressForm.formPlaceholder.county),
      },
    },
    {
      control,
      rules: rules.apartmentNumber,
      name: 'apartmentNumber',
      textInputProp: {
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
        placeholder: t(
          TranslationNames.addressForm.formPlaceholder.houseNumber,
        ),
      },
    },
    {
      control,
      rules: rules.postalCode,
      name: 'postalCode',
      textInputProp: {
        keyboardType: 'number-pad',
        autoComplete: 'postal-code',
        placeholder: t(TranslationNames.addressForm.formPlaceholder.postalCode),
      },
    },
    {
      control,
      rules: rules.street,
      name: 'street',
      textInputProp: {
        autoComplete: 'street-address',
        placeholder: t(TranslationNames.addressForm.formPlaceholder.street),
      },
    },
    {
      control,
      rules: rules.voivodeship,
      name: 'voivodeship',
      textInputProp: {
        placeholder: t(
          TranslationNames.addressForm.formPlaceholder.voivodeship,
        ),
      },
    },
  ] as unknown as M;

export const createClientCompanySetup = (
  control: Control<CreateClientsCompanyForm>,
): FormControllerSetup<CreateClientsCompanyForm> => ({
  ...createCompanySetupBase(control),
});

export const createCompanySetup = (
  control: Control<CreateCompanyForm>,
): FormControllerSetup<CreateCompanyForm> => ({
  ...createCompanySetupBase(control),
});
