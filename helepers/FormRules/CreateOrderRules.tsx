import { t } from 'i18next';
import { FormRulesType } from './FormRulesType';

import { creteMaxMessage, creteMinMessage } from './FormRulesHelper';
import { OrderFormData } from '../../components/organisms/OrderForm';
import OrderConstants from '../../FarmServiceApiTypes/Order/Constants';
import { TranslationNames } from '../../locales/TranslationNames';
import { UpdateOrderForm } from '../../components/pages/owner/mobi/OrderDriver/EditOrder';

const orderRulesBase = {
  name: {
    required: t(TranslationNames.createOrderForm.validation.name),
    minLength: {
      value: OrderConstants.NAME_MIN_LEN,
      message: creteMinMessage<OrderFormData>(
        OrderConstants.NAME_MIN_LEN,
        'name',
      ),
    },
    maxLength: {
      value: OrderConstants.NAME_MAX_LEN,
      message: creteMaxMessage<OrderFormData>(
        OrderConstants.NAME_MAX_LEN,
        'name',
      ),
    },
  },
  additionalInfo: {
    minLength: {
      value: OrderConstants.ADDITIONAL_INFO_MIN_LEN,
      message: creteMinMessage<OrderFormData>(
        OrderConstants.ADDITIONAL_INFO_MIN_LEN,
        'additionalInfo',
      ),
    },
    maxLength: {
      value: OrderConstants.ADDITIONAL_INFO_MAX_LEN,
      message: creteMaxMessage<OrderFormData>(
        OrderConstants.ADDITIONAL_INFO_MAX_LEN,
        'additionalInfo',
      ),
    },
  },
  performanceDate: {
    required: t(TranslationNames.createOrderForm.validation.performanceDate),
  },
};
export const orderRules: FormRulesType<OrderFormData> = {
  ...orderRulesBase,
};

export const updateOrderRules: FormRulesType<UpdateOrderForm> = {
  ...orderRulesBase,
};
