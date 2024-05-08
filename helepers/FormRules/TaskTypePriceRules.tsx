import { t } from 'i18next';
import { FormRulesType } from './FormRulesType';
import OrderConstants from '../../FarmServiceApiTypes/Order/Constants';
import { creteMaxMessage, creteMinMessage } from './FormRulesHelper';
import { TranslationNames } from '../../locales/TranslationNames';
import { OrderAccountingFormI } from '../../types/self/common/types';

export const TaskTypePriceRules: FormRulesType<OrderAccountingFormI> = {
  Harvesting: {
    required: t(TranslationNames.taskTypePriceForm.validation.priceRequired),
    pattern: {
      value: /^(0|[1-9]\d*)(\.\d+)?$/,
      message: t(TranslationNames.taskTypePriceForm.validation.priceAsNumber),
    },
    min: {
      value: OrderConstants.MIN_PRICE_PER_UNIT,
      message: creteMinMessage<OrderAccountingFormI>(
        OrderConstants.MIN_PRICE_PER_UNIT,
        'Harvesting',
      ),
    },
    max: {
      value: OrderConstants.MAX_PRICE_PER_UNIT,
      message: creteMaxMessage<OrderAccountingFormI>(
        OrderConstants.MAX_PRICE_PER_UNIT,
        'Harvesting',
      ),
    },
  },
  Transport: {
    required: t(TranslationNames.taskTypePriceForm.validation.priceRequired),
    pattern: {
      value: /^(0|[1-9]\d*)(\.\d+)?$/,
      message: t(TranslationNames.taskTypePriceForm.validation.priceAsNumber),
    },
    min: {
      value: OrderConstants.MIN_PRICE_PER_UNIT,
      message: creteMinMessage<OrderAccountingFormI>(
        OrderConstants.MIN_PRICE_PER_UNIT,
        'Transport',
      ),
    },
    max: {
      value: OrderConstants.MAX_PRICE_PER_UNIT,
      message: creteMaxMessage<OrderAccountingFormI>(
        OrderConstants.MAX_PRICE_PER_UNIT,
        'Transport',
      ),
    },
  },
  Tax: {
    required: t(TranslationNames.taskTypePriceForm.validation.taxIsRequired),
    pattern: {
      value: /^(0|[1-9]\d*)(\.\d+)?$/,
      message: t(TranslationNames.taskTypePriceForm.validation.priceAsNumber),
    },
    min: {
      value: 0,
      message: t(TranslationNames.taskTypePriceForm.validation.taxMinValue),
    },
    max: {
      value: 1,
      message: t(TranslationNames.taskTypePriceForm.validation.taxMaxValue),
    },
  },
};
