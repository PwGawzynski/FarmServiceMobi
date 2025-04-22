import { t } from 'i18next';
import { Control } from 'react-hook-form/dist/types/form';
import { FormControllerSetup } from '../../components/atoms/FormCreator';
import { TranslationNames } from '../../locales/TranslationNames';
import { rules } from '../FormRules/CreateFieldRules';
import { ExtendedFormData } from '../../components/organisms/AddFieldForm';

export const createFieldSetup = (
  control: Control<ExtendedFormData>,
): FormControllerSetup<ExtendedFormData> => [
  {
    control,
    rules: rules.nameLabel,
    name: 'nameLabel',
    textInputProp: {
      keyboardType: 'default',
      placeholder: t(
        TranslationNames.createFieldForm.formPlaceholder.nameLabel,
      ),
    },
  },
  {
    control,
    rules: rules.area,
    name: 'area',
    textInputProp: {
      keyboardType: 'numeric',
      placeholder: t(TranslationNames.createFieldForm.formPlaceholder.area),
    },
  },
  {
    control,
    rules: rules.polishSystemId,
    name: 'polishSystemId',
    textInputProp: {
      keyboardType: 'default',
      placeholder: t(
        TranslationNames.createFieldForm.formPlaceholder.polishSystemId,
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
    rules: rules.voivodeship,
    name: 'voivodeship',
    textInputProp: {
      keyboardType: 'default',
      autoComplete: 'postal-address-region',
      placeholder: t(TranslationNames.addressForm.formPlaceholder.voivodeship),
    },
  },
];
