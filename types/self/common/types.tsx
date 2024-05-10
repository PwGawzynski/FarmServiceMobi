import { TaskType } from '../../../FarmServiceApiTypes/Task/Enums';

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
