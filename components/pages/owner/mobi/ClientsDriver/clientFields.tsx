import { useQuery } from '@tanstack/react-query';
import { YStack } from 'tamagui';
import { RefObject, useCallback, useRef } from 'react';
import { ListRenderItemInfo } from '@shopify/flash-list';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { ScreenBase } from '../common/ScreenBase';
import { getClientFields } from '../../../../../api/clients/Client';
import { ClientsDriverScreenProps } from '../../../../../types/self/navigation/Owner/props/clients/ClientsDriverProps';
import { EXPO_PUBLIC_QUERY_STALE_TIME } from '../../../../../settings/query/querySettings';
import FieldListItem from '../../../../molecules/FieldListItem';
import { UniversalList } from '../../../../organisms/UniversalList';
import { FieldResponseBase } from '../../../../../FarmServiceApiTypes/Field/Ressponses';
import { ButtonTamagui } from '../../../../atoms/ButtonTamagui';
import PlusIco from '../../../../../assets/plus.svg';
import { FieldBottomSheetContent } from '../../../../molecules/FieldBottomSheetContent';

export function ClientFields({
  route,
}: ClientsDriverScreenProps<
  'clientFields',
  'clientsDriver',
  'ownerRootDriver'
>) {
  const { client } = route.params;
  const { data } = useQuery({
    queryKey: ['clientFields', client.id],
    queryFn: keys => getClientFields(keys.queryKey[1] as string),
    staleTime: EXPO_PUBLIC_QUERY_STALE_TIME,
  });
  console.log(data);

  const renderItem = useCallback(
    (
      { item }: ListRenderItemInfo<FieldResponseBase>,
      bottomSheetRef: RefObject<BottomSheetModal>,
    ) => {
      return (
        <FieldListItem
          onPress={() => {
            bottomSheetRef.current?.present(
              <FieldBottomSheetContent field={item} />,
            );
          }}
          field={item}
        />
      );
    },
    [],
  );
  const modalRef = useRef<BottomSheetModal>(null);
  return (
    <ScreenBase
      name="fields"
      bottomSheetsProps={{
        modalRef,
        snapPoints: ['50%', '70%'],
      }}
    >
      <YStack mt="$4" f={1}>
        <UniversalList
          renderItem={item => renderItem(item, modalRef)}
          data={data}
        />
      </YStack>
      <YStack mb="$2">
        <ButtonTamagui
          icon={<PlusIco />}
          text="Add Filed"
          buttonProps={{
            onPress: () => modalRef?.current?.expand(),
          }}
        />
      </YStack>
    </ScreenBase>
  );
}
