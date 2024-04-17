import { ForwardedRef, RefObject, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { YStack } from 'tamagui';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { t } from 'i18next';
import { getClientFields } from '../../api/clients/Client';
import { EXPO_PUBLIC_QUERY_STALE_TIME } from '../../settings/query/querySettings';
import List, { ListRef } from './List';
import { FieldResponseBase } from '../../FarmServiceApiTypes/Field/Ressponses';
import { createFieldBottomSign } from '../pages/owner/mobi/ClientsDriver/clientFields';
import { clientFieldsFilter } from '../../helepers/filterFunctions';
import { ButtonTamagui } from '../atoms/ButtonTamagui';
import { ClientResponseBase } from '../../FarmServiceApiTypes/Clients/Responses';
import { TranslationNames } from '../../locales/TranslationNames';

export interface SelectFieldsProps {
  client: ClientResponseBase;
  modalRef: RefObject<BottomSheetModal>;
  onSetAction: () => void;
  fieldListRef: ForwardedRef<ListRef<FieldResponseBase>>;
  maxSelectedItems?: number;
  ListEmptyComponent?: JSX.Element;
}
const TRANSLATIONS = {
  searchPlaceholder: t(
    TranslationNames.components.fieldSelector.searchPlaceholder,
  ),
  next_step_button: t(TranslationNames.components.fieldSelector.subbmitButton),
};
export function FieldSelector({
  client,
  modalRef,
  onSetAction,
  fieldListRef,
  maxSelectedItems,
  ListEmptyComponent,
}: SelectFieldsProps) {
  const [canSubmit, setCanSubmit] = useState(false);
  const { data, isError, isFetching } = useQuery({
    queryKey: ['clientFields', client.id],
    queryFn: keys => getClientFields(keys.queryKey[1] as string),
    staleTime: EXPO_PUBLIC_QUERY_STALE_TIME,
  });
  const listEmptyComponent = useMemo(() => ListEmptyComponent, []);

  return (
    <YStack f={1}>
      <List<FieldResponseBase>
        isSelectable
        listEmptyComponent={listEmptyComponent}
        triggerOnSelectedChange={isEmpty => {
          setCanSubmit(!isEmpty);
        }}
        ref={fieldListRef}
        isFetching={isFetching}
        isError={isError}
        maxSelectedItems={maxSelectedItems}
        data={data}
        modalRef={modalRef}
        listStyleSettings={item => ({
          header: item.nameLabel,
          bottomRightText: createFieldBottomSign(item),
          alignment: 'left',
          infoIco: true,
        })}
        filterFunction={clientFieldsFilter}
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
