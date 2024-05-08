import { TaskType } from '../../../FarmServiceApiTypes/Task/Enums';

export type TaskTypeToNumber = {
  [K in keyof typeof TaskType]: number;
};
export type OrderAccountingFormI = TaskTypeToNumber & {
  Tax: number;
};

export type SummaryByTaskType = {
  TaskTypePrice: {
    [K in keyof typeof TaskType]: number;
  };
  TaskTypeArea: {
    [K in keyof typeof TaskType]: number;
  };
};

export type OrderAccountingSummary = {
  summary: SummaryByTaskType;
  tax: number;
  totalPrice: number;
  totalPriceWithTax: number;
};
