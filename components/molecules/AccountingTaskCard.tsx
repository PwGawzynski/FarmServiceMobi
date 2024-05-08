import { FlashList } from '@shopify/flash-list';
import { Card } from 'tamagui';
import { useCallback } from 'react';

import { TaskResponseBase } from '../../FarmServiceApiTypes/Task/Responses';
import {
  AccountingFieldInfo,
  AccountingFieldInfoProps,
} from '../atoms/AccountingFieldInfo';

export interface AccountingTaskCardProps {
  tasks: TaskResponseBase[];
  itemProps: Omit<AccountingFieldInfoProps, 'item'>;
  cardClassName?: string;
  bordered?: boolean;
  cardStyle?: React.CSSProperties;
}

export function AccountingTaskCard({
  tasks,
  itemProps,
  cardStyle,
  bordered,
}: AccountingTaskCardProps) {
  /**
   * Component to display accounting field info for each task
   */
  const TaskAccountingItem = useCallback(
    ({ item }: { item: TaskResponseBase }) => (
      <AccountingFieldInfo item={item} {...itemProps} />
    ),
    [tasks, itemProps.watch && itemProps.watch('Tax')],
  );

  return (
    <Card f={1} mt="$4" p="$4" style={cardStyle} bordered={bordered}>
      <FlashList
        extraData={itemProps.watch && itemProps.watch('Tax')}
        estimatedItemSize={20}
        renderItem={TaskAccountingItem}
        data={tasks}
      />
    </Card>
  );
}
