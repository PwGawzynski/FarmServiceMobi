import { ForwardedRef, RefObject, useEffect, useMemo, useState } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useQuery } from '@tanstack/react-query';
import { YStack } from 'tamagui';
import { t } from 'i18next';
import List, { ListRef } from './List';
import { filterTasks } from '../../helepers/filterFunctions';
import { ButtonTamagui } from '../atoms/ButtonTamagui';
import { TranslationNames } from '../../locales/TranslationNames';
import { TaskResponseBase } from '../../FarmServiceApiTypes/Task/Responses';
import { getTaskByOrder } from '../../api/Task/Task';
import { TaskType } from '../../FarmServiceApiTypes/Task/Enums';

export interface SelectTaskProps {
  modalRef: RefObject<BottomSheetModal>;
  onSetAction?: () => void;
  listRef: ForwardedRef<ListRef<TaskResponseBase>>;
  maxSelectedItems?: number;
  ListEmptyComponent?: JSX.Element;
  send: (
    event:
      | { type: 'fetched'; data: TaskResponseBase[] | undefined }
      | { type: 'error'; data: TaskResponseBase[] | undefined }
      | { type: 'retry'; data: TaskResponseBase[] | undefined },
  ) => void;
  orderId: string;
}
const TRANSLATIONS = {
  searchPlaceholder: t(
    TranslationNames.components.taskSelector.searchPlaceholder,
  ),
  next_step_button: t(TranslationNames.components.taskSelector.buttonTitle),
};
export function TaskSelector({
  modalRef,
  onSetAction,
  listRef,
  maxSelectedItems,
  ListEmptyComponent,
  send,
  orderId,
}: SelectTaskProps) {
  const [canSubmit, setCanSubmit] = useState(false);
  const {
    data: tasks,
    isPending,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['orderTasks', orderId],
    queryFn: context => getTaskByOrder(context.queryKey[1]),
  });
  useEffect(() => {
    if (tasks) send({ type: 'fetched', data: tasks });
  }, [tasks]);
  const listEmptyComponent = useMemo(() => ListEmptyComponent, []);
  const isActiveFilter = (item: TaskResponseBase) => item.isDone;
  return (
    <YStack f={1}>
      <List<TaskResponseBase>
        isSelectable
        listEmptyComponent={listEmptyComponent}
        triggerOnSelectedChange={isEmpty => {
          setCanSubmit(!isEmpty);
        }}
        ref={listRef}
        isFetching={isPending || isLoading}
        isError={isError}
        data={tasks?.filter(isActiveFilter)}
        maxSelectedItems={maxSelectedItems}
        modalRef={modalRef}
        listStyleSettings={item => ({
          header: `${item.field.nameLabel} - ${item.field.area} ha`,
          bottomRightText: `${TaskType[item.type]}`,
          alignment: 'right',
        })}
        filterFunction={filterTasks}
        searchEnginePlaceholder={TRANSLATIONS.searchPlaceholder}
        cName="mt-0"
      />
      {canSubmit && onSetAction && (
        <ButtonTamagui
          text={TRANSLATIONS.next_step_button}
          buttonProps={{
            onPress: () => onSetAction(),
          }}
        />
      )}
    </YStack>
  );
}
