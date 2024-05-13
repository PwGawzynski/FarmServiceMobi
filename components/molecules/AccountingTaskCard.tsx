import { FlashList } from '@shopify/flash-list';
import { Card, SizableText, XStack } from 'tamagui';
import { useCallback } from 'react';

import { t } from 'i18next';
import { TaskResponseBase } from '../../FarmServiceApiTypes/Task/Responses';
import {
  AccountingFieldInfo,
  AccountingFieldInfoProps,
} from '../atoms/AccountingFieldInfo';
import { TranslationNames } from '../../locales/TranslationNames';

export interface AccountingTaskCardProps {
  tasks: TaskResponseBase[];
  itemProps: Omit<AccountingFieldInfoProps, 'item'>;
  cardClassName?: string;
  bordered?: boolean;
  cardStyle?: React.CSSProperties;
}

const TRANSLATIONS = {
  task: t(TranslationNames.components.accountingTaskCard.task),
  area: t(TranslationNames.components.accountingTaskCard.area),
  price: t(TranslationNames.components.accountingTaskCard.price),
  priceWithTax: t(TranslationNames.components.accountingTaskCard.priceWithTax),
};

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
    [tasks, itemProps.watch && itemProps.watch, itemProps.tax && itemProps.tax],
  );

  return (
    <Card
      minHeight="$12"
      f={1}
      mt="$4"
      p="$4"
      style={cardStyle}
      bordered={bordered}
    >
      <XStack mb="$2" jc="space-between" ai="center">
        <SizableText
          color="$color11"
          className="uppercase font-bold  text-left"
          f={1}
        >
          {TRANSLATIONS.task}
        </SizableText>
        <SizableText
          color="$color11"
          className="uppercase font-bold text-center"
          f={1}
        >
          {TRANSLATIONS.area}
        </SizableText>
        <SizableText
          color="$color11"
          className="uppercase font-bold text-center"
          f={1}
        >
          {TRANSLATIONS.price}
        </SizableText>
        <SizableText
          color="$color11"
          className="uppercase font-bold  text-right"
          f={1}
        >
          {TRANSLATIONS.priceWithTax}
        </SizableText>
      </XStack>
      <FlashList
        extraData={itemProps.watch && itemProps.watch()}
        estimatedItemSize={20}
        renderItem={TaskAccountingItem}
        data={tasks}
      />
    </Card>
  );
}
