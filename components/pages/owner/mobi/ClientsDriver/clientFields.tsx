import { useQuery } from '@tanstack/react-query';
import { YStack } from 'tamagui';
import { useCallback } from 'react';
import { ListRenderItemInfo } from '@shopify/flash-list';
import { ScreenBase } from '../common/ScreenBase';
import { getClientFields } from '../../../../../api/clients/Client';
import { ClientsDriverScreenProps } from '../../../../../types/self/navigation/Owner/props/clients/ClientsDriverProps';
import { EXPO_PUBLIC_QUERY_STALE_TIME } from '../../../../../settings/query/querySettings';
import FieldListItem from '../../../../molecules/FieldListItem';
import { UniversalList } from '../../../../organisms/UniversalList';
import { FieldResponseBase } from '../../../../../FarmServiceApiTypes/Field/Ressponses';

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
    ({ item }: ListRenderItemInfo<FieldResponseBase>) => {
      return <FieldListItem field={item} />;
    },
    [],
  );

  return (
    <ScreenBase name="fields">
      <YStack mt="$4" f={1}>
        <UniversalList listEmptyText="em" renderItem={renderItem} data={data} />
      </YStack>
    </ScreenBase>
  );
}
