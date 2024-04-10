import { useQuery } from '@tanstack/react-query';
import { RefObject, useCallback, useState } from 'react';
import { ListRenderItemInfo } from '@shopify/flash-list';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { YStack } from 'tamagui';
import { ClientResponseBase } from '../../FarmServiceApiTypes/Clients/Responses';
import { getClientFields } from '../../api/clients/Client';
import { EXPO_PUBLIC_QUERY_STALE_TIME } from '../../settings/query/querySettings';
import { FieldResponseBase } from '../../FarmServiceApiTypes/Field/Ressponses';
import FieldListItem from '../molecules/FieldListItem';
import { FieldBottomSheetContent } from '../molecules/FieldBottomSheetContent';
import { SearchBox } from '../molecules/SearchBox';
import { UniversalList } from './UniversalList';

export interface Props {
  client: ClientResponseBase;
  modalRef: RefObject<BottomSheetModal>;
  onItemSelected?: (field: FieldResponseBase) => void;
  onItemDeselected?: (field: FieldResponseBase) => void;
}

export function ClientFieldsList({
  client,
  modalRef,
  onItemSelected,
  onItemDeselected,
}: Props) {
  const [filter, setFilter] = useState<string | undefined>(undefined);

  const { data } = useQuery({
    queryKey: ['clientFields', client.id],
    queryFn: keys => getClientFields(keys.queryKey[1] as string),
    staleTime: EXPO_PUBLIC_QUERY_STALE_TIME,
  });

  const renderItem = useCallback(
    (
      { item }: ListRenderItemInfo<FieldResponseBase>,
      bottomSheetRef: RefObject<BottomSheetModal>,
    ) => {
      return (
        <FieldListItem
          onSelected={onItemSelected}
          onDeselected={onItemDeselected}
          onPress={() => {
            bottomSheetRef.current?.present(
              <FieldBottomSheetContent
                field={item}
                client={client}
                bottomSheetRef={bottomSheetRef}
              />,
            );
          }}
          field={item}
        />
      );
    },
    [],
  );

  const sorted = data
    ?.filter(f =>
      filter
        ? f.nameLabel
            .toLowerCase()
            .includes(filter.toLowerCase().replace(' ', ''))
        : true,
    )
    .sort((a, b) =>
      a.nameLabel.toLowerCase() > b.nameLabel.toLowerCase() ? 1 : -1,
    );

  return (
    <>
      <YStack mt="$4" mb="$4">
        <SearchBox
          onTextChange={text => setFilter(text)}
          // todo add translation
          placeholder="Search Field"
        />
      </YStack>
      <YStack mt="$4" f={1}>
        <UniversalList
          renderItem={item => renderItem(item, modalRef)}
          data={sorted}
        />
      </YStack>
    </>
  );
}
