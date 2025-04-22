import {
  CreateOrderReqI,
  UpdateOrder,
} from '../../FarmServiceApiTypes/Order/Requests';
import { OrderResponseBase } from '../../FarmServiceApiTypes/Order/Ressponses';
import { CreateOrderPriceReqI } from '../../FarmServiceApiTypes/OrderPricing/Requests';
import { InvoiceResponseBase } from '../../FarmServiceApiTypes/Invoice/Responses';
import { query } from '../../helepers/Api/QueryDriver';
import { SettlementRequest } from '../../FarmServiceApiTypes/Settlement/Requests';

export async function createOrder(data: CreateOrderReqI) {
  return query<CreateOrderReqI, OrderResponseBase>({
    type: 'POST',
    path: '/order',
    data,
  });
}
export async function updateOrderPrice(data: CreateOrderPriceReqI) {
  return query<CreateOrderPriceReqI, OrderResponseBase>({
    type: 'PUT',
    path: '/order/update-pricing',
    data,
  });
}

export async function getInvoices(orderId: string) {
  return query<undefined, InvoiceResponseBase[]>({
    type: 'GET',
    path: `/invoice/for`,
    config: {
      params: {
        orderId,
      },
    },
  });
}

type AccountData = {
  tasks: string[];
  orderId: string;
};
export async function account({ tasks, orderId }: AccountData) {
  return query<SettlementRequest, InvoiceResponseBase[]>({
    type: 'PUT',
    path: `/order/account`,
    data: {
      tasks,
    } as SettlementRequest,
    config: {
      params: {
        id: orderId,
      },
    },
  });
}

export async function getAllOrders() {
  return query<undefined, OrderResponseBase[]>({
    type: 'GET',
    path: '/order/all',
  });
}

export async function updateOrder(data: UpdateOrder) {
  return query<UpdateOrder, OrderResponseBase>({
    type: 'PUT',
    path: '/order',
    data,
  });
}
