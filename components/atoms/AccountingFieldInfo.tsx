import { SizableText, XStack } from 'tamagui';
import { TaskType } from '../../FarmServiceApiTypes/Task/Enums';
import { TaskResponseBase } from '../../FarmServiceApiTypes/Task/Responses';
import { OrderAccountingFormI } from '../../types/self/common/types';

export interface AccountingFieldInfoProps {
  item: TaskResponseBase;
  tax?: number;
  prices?: {
    [K in keyof typeof TaskType]: number | undefined;
  };
  watch?: (name?: keyof OrderAccountingFormI) => number;
}

export function AccountingFieldInfo({
  item,
  watch,
  prices,
  tax,
}: AccountingFieldInfoProps) {
  const fieldArea = Number.isNaN(Number(item.field.area))
    ? 0
    : Number(Number(item.field.area).toFixed(2));
  const taxValue = Number.isNaN(Number(watch ? watch('Tax') : tax))
    ? 0
    : Number(watch ? watch('Tax') : tax);

  const priceForTask = Number.isNaN(
    Number(
      watch
        ? watch(TaskType[item.type] as keyof OrderAccountingFormI)
        : prices &&
            prices[TaskType[item.type as unknown as keyof typeof TaskType]],
    ),
  )
    ? 0
    : Number(
        watch
          ? watch(TaskType[item.type] as keyof OrderAccountingFormI)
          : prices &&
              prices[TaskType[item.type as unknown as keyof typeof TaskType]],
      );
  console.log(priceForTask);
  const priceWithoutTax = fieldArea * priceForTask;
  const priceWithTax =
    (taxValue || (watch && watch('Tax'))) && priceWithoutTax
      ? priceWithoutTax * (1 + taxValue || (watch && watch('Tax')) || 0)
      : 0;

  return (
    <XStack ai="center" jc="space-between" f={1} maxHeight={20}>
      <SizableText className="flex-1 text-left uppercase font-bold text-light-blue dark:text-white">
        {item.field.nameLabel}
      </SizableText>
      <SizableText className="flex-1 text-center uppercase font-bold text-light-blue dark:text-white">
        {fieldArea.toFixed(2).toString()}
      </SizableText>
      <SizableText className="flex-1 text-center uppercase font-bold text-light-blue dark:text-white">
        {priceWithoutTax.toFixed(2).toString()}
      </SizableText>
      <SizableText className="flex-1 text-right uppercase font-bold text-light-blue dark:text-white">
        {priceWithTax.toFixed(2).toString()} PLN
      </SizableText>
    </XStack>
  );
}
