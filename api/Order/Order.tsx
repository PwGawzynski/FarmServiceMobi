import { t } from 'i18next';
import { TranslationNames } from '../../locales/TranslationNames';
import { apiHandler } from '../services/User';
import { Api } from '../Api';
import {
  CreateOrderReqI,
  UpdateOrder,
} from '../../FarmServiceApiTypes/Order/Requests';
import { OrderResponseBase } from '../../FarmServiceApiTypes/Order/Ressponses';
import { CreateOrderPriceReqI } from '../../FarmServiceApiTypes/OrderPricing/Requests';

export async function createOrder(data: CreateOrderReqI) {
  const UNAUTHORIZED_MSG = t(TranslationNames.serviceDefaults.unauthorised);
  const DEFAULT_MSG = t(TranslationNames.serviceDefaults.default);
  return apiHandler<CreateOrderReqI>(
    UNAUTHORIZED_MSG,
    DEFAULT_MSG,
    Api.createOrder,
    data,
  ) as unknown as OrderResponseBase | undefined;
}
export async function updateOrderPrice(data: CreateOrderPriceReqI) {
  const UNAUTHORIZED_MSG = t(TranslationNames.serviceDefaults.unauthorised);
  const DEFAULT_MSG = t(TranslationNames.serviceDefaults.default);
  return apiHandler<CreateOrderPriceReqI>(
    UNAUTHORIZED_MSG,
    DEFAULT_MSG,
    Api.updateOrderPricing,
    data,
  ) as unknown as OrderResponseBase | undefined;
}
export async function getAllOrders() {
  const UNAUTHORIZED_MSG = t(TranslationNames.serviceDefaults.unauthorised);
  const DEFAULT_MSG = t(TranslationNames.serviceDefaults.default);
  return apiHandler<CreateOrderReqI>(
    UNAUTHORIZED_MSG,
    DEFAULT_MSG,
    Api.getAllOrders,
  ) as unknown as Array<OrderResponseBase> | undefined;
}

export async function updateOrder(data: UpdateOrder) {
  const UNAUTHORIZED_MSG = t(TranslationNames.serviceDefaults.unauthorised);
  const DEFAULT_MSG = t(TranslationNames.serviceDefaults.default);
  return apiHandler<UpdateOrder>(
    UNAUTHORIZED_MSG,
    DEFAULT_MSG,
    Api.updateOrder,
    data,
  ) as unknown as OrderResponseBase | undefined;
}
