import { ListRenderItemInfo } from '@shopify/flash-list';
import { useCallback } from 'react';
import { VerticalList } from '../molecules/VerticalList';
import { ClientResponseBase } from '../../FarmServiceApiTypes/Clients/Responses';
import { ClientListItem } from '../molecules/ClientListItem';

export type Props = {
  data?: Array<ClientResponseBase>;
};

export function ClientList({ data }: Props) {
  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<ClientResponseBase>) => (
      <ClientListItem client={item} />
    ),
    [],
  );

  return (
    <VerticalList estimatedSize={150} renderItem={renderItem} data={data} />
  );
}
