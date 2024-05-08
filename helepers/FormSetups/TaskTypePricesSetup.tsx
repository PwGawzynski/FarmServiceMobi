import { Control } from 'react-hook-form/dist/types/form';
import { t } from 'i18next';
import { FormControllerSetup } from '../../components/atoms/FormCreator';
import { TaskTypePriceRules } from '../FormRules/TaskTypePriceRules';
import { TranslationNames } from '../../locales/TranslationNames';
import { OrderAccountingFormI } from '../../types/self/common/types';

export const createTaskTypePriceSetup = (
  control: Control<OrderAccountingFormI>,
): FormControllerSetup<OrderAccountingFormI> => [
  {
    control,
    rules: TaskTypePriceRules.Harvesting,
    name: 'Harvesting',
    placeholderName: t(
      TranslationNames.taskTypePriceForm.formPlaceholder.harvesting,
    ),
    valuePreprocessor: (value: string) => value.replace(',', '.'),
    textInputProp: {
      keyboardType: 'numeric',
      placeholder: t(
        TranslationNames.taskTypePriceForm.validation.priceRequired,
      ),
    },
  },
  {
    control,
    rules: TaskTypePriceRules.Transport,
    name: 'Transport',
    placeholderName: t(
      TranslationNames.taskTypePriceForm.formPlaceholder.transport,
    ),
    valuePreprocessor: (value: string) => value.replace(',', '.'),
    textInputProp: {
      keyboardType: 'numeric',
      placeholder: t(
        TranslationNames.taskTypePriceForm.validation.priceRequired,
      ),
    },
  },
  {
    control,
    rules: TaskTypePriceRules.Tax,
    valuePreprocessor: (value: string) => value.replace(',', '.'),
    name: 'Tax',
    placeholderName: t(TranslationNames.taskTypePriceForm.formPlaceholder.tax),
    textInputProp: {
      keyboardType: 'numeric',
      placeholder: t(TranslationNames.taskTypePriceForm.formPlaceholder.tax),
    },
  },
];
