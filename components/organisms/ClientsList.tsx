import { ListRenderItemInfo } from '@shopify/flash-list';
import { useCallback, useMemo } from 'react';
import { t } from 'i18next';
import { Dimensions } from 'react-native';
import { VerticalList, VerticalListProps } from '../molecules/VerticalList';
import { ClientResponseBase } from '../../FarmServiceApiTypes/Clients/Responses';
import { EmptyList } from '../atoms/EmptyList';
import NoUser from '../../assets/noUser.svg';
import { TranslationNames } from '../../locales/TranslationNames';
import { SwipeRightAnimated } from '../atoms/SwipeRightAnimated';
import ClientListItem, {
  ClientListItemSkeleton,
} from '../molecules/ClientListItem';

export type Props = {
  data?: Array<ClientResponseBase>;
  listSetup?: Omit<
    VerticalListProps<ClientResponseBase>,
    'renderItem' | 'estimatedSize'
  >;
};

const EL_HEIGHT = 100;
const EL_COUNT = Math.floor(Dimensions.get('window').height / EL_HEIGHT);

export function ClientList({ data, listSetup }: Props) {
  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<ClientResponseBase>) => (
      <ClientListItem client={item} />
    ),
    [],
  );

  const ListEmptyComponent = useMemo(
    () => (
      <EmptyList
        EmptyIco={NoUser}
        text={t(TranslationNames.components.clientList.listEmptyText)}
      >
        <SwipeRightAnimated />
      </EmptyList>
    ),
    [],
  );

  const onFetching = useCallback(() => {
    const elements = [];
    for (let i = 0; i < EL_COUNT; i += 1) {
      elements.push(<ClientListItemSkeleton key={i} />);
    }
    return elements;
  }, []);
  return (
    <VerticalList
      ListEmptyComponent={ListEmptyComponent}
      estimatedSize={150}
      renderItem={renderItem}
      data={data}
      onLoadingData={onFetching()}
      {...listSetup}
    />
  );
}
