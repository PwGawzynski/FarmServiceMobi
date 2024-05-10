import { t } from 'i18next';
import { FormRulesType } from './FormRulesType';
import { creteMaxMessage, creteMinMessage } from './FormRulesHelper';
import { TranslationNames } from '../../locales/TranslationNames';
import { OrderAccountingFormI } from '../../types/self/common/types';
import { OrderPricingConstants } from '../../FarmServiceApiTypes/OrderPricing/Constants';

export const TaskTypePriceRules: FormRulesType<OrderAccountingFormI> = {
  Harvesting: {
    required: t(TranslationNames.taskTypePriceForm.validation.priceRequired),
    pattern: {
      value: /^(0|[1-9]\d*)(\.\d+)?$/,
      message: t(TranslationNames.taskTypePriceForm.validation.priceAsNumber),
    },
    min: {
      value: OrderPricingConstants.MIN_PRICE,
      message: creteMinMessage<OrderAccountingFormI>(
        OrderPricingConstants.MIN_PRICE,
        'Harvesting',
      ),
    },
    max: {
      value: OrderPricingConstants.MAX_PRICE,
      message: creteMaxMessage<OrderAccountingFormI>(
        OrderPricingConstants.MAX_PRICE,
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
      value: OrderPricingConstants.MIN_PRICE,
      message: creteMinMessage<OrderAccountingFormI>(
        OrderPricingConstants.MIN_PRICE,
        'Transport',
      ),
    },
    max: {
      value: OrderPricingConstants.MAX_PRICE,
      message: creteMaxMessage<OrderAccountingFormI>(
        OrderPricingConstants.MAX_PRICE,
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
      value: OrderPricingConstants.MIN_TAX,
      message: t(TranslationNames.taskTypePriceForm.validation.taxMinValue),
    },
    max: {
      value: OrderPricingConstants.MAX_TAX,
      message: t(TranslationNames.taskTypePriceForm.validation.taxMaxValue),
    },
  },
};
