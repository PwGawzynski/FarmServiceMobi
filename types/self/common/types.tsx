import { TaskType } from '../../../FarmServiceApiTypes/Task/Enums';
import { CreateUserReqI } from '../../../FarmServiceApiTypes/User/Requests';
import { CreateClientReqI } from '../../../FarmServiceApiTypes/Clients/Requests';

export type TaskTypeToNumber = {
  [K in keyof typeof TaskType]: number;
};
export type OrderAccountingFormI = TaskTypeToNumber & {
  Tax: number;
};

export type SummaryByTaskType = {
  TaskTypePrice: {
    [K in keyof typeof TaskType]: number | undefined;
  };
  TaskTypeArea: {
    [K in keyof typeof TaskType]: number | undefined;
  };
};

export type OrderAccountingSummary = {
  summary: SummaryByTaskType;
  pricesForTaskTypeUnit: {
    [K in keyof typeof TaskType]: number | undefined;
  };
  tax: number;
  totalPrice: number;
  totalPriceWithTax: number;
};

export type CreateUserForm = Omit<CreateUserReqI, 'email'> &
  CreateUserReqI['personalData'] &
  CreateClientReqI['user']['address'];
