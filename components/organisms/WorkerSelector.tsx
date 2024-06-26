import { ForwardedRef, RefObject, useMemo, useState } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useQuery } from '@tanstack/react-query';
import { YStack } from 'tamagui';
import { t } from 'i18next';
import List, { ListRef } from './List';
import { WorkerResponseBase } from '../../FarmServiceApiTypes/Worker/Responses';
import { allWorkers } from '../../api/worker/Worker';
import { EXPO_PUBLIC_QUERY_STALE_TIME } from '../../settings/query/querySettings';
import { Status } from '../../FarmServiceApiTypes/Worker/Enums';
import { searchEngineNameSurnameFilter } from '../../helepers/filterFunctions';
import { ButtonTamagui } from '../atoms/ButtonTamagui';
import { TranslationNames } from '../../locales/TranslationNames';

export interface SelectWorkerProps {
  modalRef: RefObject<BottomSheetModal>;
  onSetAction: () => void;
  workerListRef: ForwardedRef<ListRef<WorkerResponseBase>>;
  maxSelectedItems?: number;
  ListEmptyComponent?: JSX.Element;
}
const TRANSLATIONS = {
  searchPlaceholder: t(
    TranslationNames.components.workerSelector.searchPlaceholder,
  ),
  next_step_button: t(TranslationNames.components.workerSelector.subbmitButton),
};
export function WorkerSelector({
  modalRef,
  onSetAction,
  workerListRef,
  maxSelectedItems,
  ListEmptyComponent,
}: SelectWorkerProps) {
  const [canSubmit, setCanSubmit] = useState(false);
  const { data, isFetching, isError, refetch } = useQuery({
    queryKey: ['workers'],
    queryFn: allWorkers,
    staleTime: EXPO_PUBLIC_QUERY_STALE_TIME,
    gcTime: EXPO_PUBLIC_QUERY_STALE_TIME,
  });
  const listEmptyComponent = useMemo(() => ListEmptyComponent, []);
  const isActiveFilter = (item: WorkerResponseBase) =>
    item.status === Status.Active;
  return (
    <YStack f={1}>
      <List<WorkerResponseBase>
        onRefreshCall={refetch}
        isSelectable
        listEmptyComponent={listEmptyComponent}
        triggerOnSelectedChange={isEmpty => {
          setCanSubmit(!isEmpty);
        }}
        ref={workerListRef}
        isFetching={isFetching}
        isError={isError}
        data={data?.filter(isActiveFilter)}
        maxSelectedItems={maxSelectedItems}
        modalRef={modalRef}
        listStyleSettings={item => ({
          header: `${item.personalData.name} ${item.personalData.surname}`,
          bottomRightText:
            item.status !== undefined ? Status[item.status] : undefined,
          alignment: 'right',
        })}
        filterFunction={searchEngineNameSurnameFilter}
        searchEnginePlaceholder={TRANSLATIONS.searchPlaceholder}
      />
      {canSubmit && (
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
