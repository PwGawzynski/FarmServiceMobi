import { Control } from 'react-hook-form/dist/types/form';
import { t } from 'i18next';
import {
  FormControllerSetup,
  InputType,
} from '../../components/atoms/FormCreator';
import { TranslationNames } from '../../locales/TranslationNames';
import { OrderFormData } from '../../components/organisms/OrderForm';
import { orderRules, updateOrderRules } from '../FormRules/CreateOrderRules';
import { UpdateOrderForm } from '../../components/pages/owner/mobi/OrderDriver/EditOrder';

export const createOrderSetup = (
  control: Control<OrderFormData>,
): FormControllerSetup<OrderFormData> => [
  {
    control,
    rules: orderRules.name,
    name: 'name',
    placeholderName: t(TranslationNames.createOrderForm.formPlaceholder.name),
    textInputProp: {
      keyboardType: 'default',
      placeholder: t(TranslationNames.createOrderForm.formPlaceholder.name),
    },
  },
  {
    control,
    rules: orderRules.additionalInfo,
    name: 'additionalInfo',
    inputType: InputType.TEXT_AREA,
    placeholderName: t(
      TranslationNames.createOrderForm.formPlaceholder.additionalInfo,
    ),
    textInputProp: {
      keyboardType: 'default',
    },
  },
  {
    control,
    rules: orderRules.performanceDate,
    name: 'performanceDate',
    inputType: InputType.DATE,
    placeholderName: t(
      TranslationNames.createOrderForm.formPlaceholder.performanceDate,
    ),
  },
];

export const createUpdateOrderSetup = (
  control: Control<UpdateOrderForm>,
): FormControllerSetup<UpdateOrderForm> => [
  {
    control,
    rules: updateOrderRules.name,
    name: 'name',
    placeholderName: t(TranslationNames.createOrderForm.formPlaceholder.name),
    textInputProp: {
      keyboardType: 'default',
      placeholder: t(TranslationNames.createOrderForm.formPlaceholder.name),
    },
  },
  {
    control,
    rules: updateOrderRules.additionalInfo,
    name: 'additionalInfo',
    inputType: InputType.TEXT_AREA,
    placeholderName: t(
      TranslationNames.createOrderForm.formPlaceholder.additionalInfo,
    ),
    inputStyle: 'h-52',
    textInputProp: {
      keyboardType: 'default',
    },
  },
  {
    control,
    rules: updateOrderRules.performanceDate,
    name: 'performanceDate',
    inputType: InputType.DATE,
    placeholderName: t(
      TranslationNames.createOrderForm.formPlaceholder.performanceDate,
    ),
  },
];
