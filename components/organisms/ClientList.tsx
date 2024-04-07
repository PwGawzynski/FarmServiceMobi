import { useQuery } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { ListRenderItemInfo } from '@shopify/flash-list';
import { YStack } from 'tamagui';
import { t } from 'i18next';
import { getClients } from '../../api/clients/Client';
import { EXPO_PUBLIC_QUERY_STALE_TIME } from '../../settings/query/querySettings';
import { ClientResponseBase } from '../../FarmServiceApiTypes/Clients/Responses';
import PersonListItem from '../molecules/PersonListItem';
import { SearchBox } from '../molecules/SearchBox';
import { TranslationNames } from '../../locales/TranslationNames';
import { UniversalList } from './UniversalList';

export interface Props {
  optionalOnPress?: (client: ClientResponseBase) => void;
  defaultBehavior?: boolean;
  swipeRightAnimation?: boolean;
  listEmptyText?: string;
  emptyListComponent?: JSX.Element;
}

export function ClientList({
  optionalOnPress,
  defaultBehavior,
  swipeRightAnimation,
  listEmptyText,
  emptyListComponent,
}: Props) {
  const { data, isFetching, isError } = useQuery({
    queryKey: ['clients'],
    queryFn: getClients,
    staleTime: EXPO_PUBLIC_QUERY_STALE_TIME,
    gcTime: EXPO_PUBLIC_QUERY_STALE_TIME,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
  const [filter, setFilter] = useState<string | undefined>(undefined);

  const sorted = data
    ?.filter(client =>
      filter
        ? (
            client.user.personal_data.name.trim() +
            client.user.personal_data.surname.trim()
          )
            .toLowerCase()
            .includes(filter.toLowerCase().replace(' ', ''))
        : true,
    )
    .sort((a, b) =>
      a.user.personal_data.surname.toLowerCase() >
      b.user.personal_data.surname.toLowerCase()
        ? 1
        : -1,
    );
  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<ClientResponseBase>) => {
      const handleOnPress = () => {
        if (optionalOnPress) optionalOnPress(item);
      };
      return (
        <PersonListItem
          name={item.user.personal_data.name}
          surname={item.user.personal_data.surname}
          bottomRightText={item.user.address.city}
          onPressNavigateTo={defaultBehavior ? 'clientControlPanel' : undefined}
          navigationParams={{ client: item }}
          onPress={handleOnPress}
        />
      );
    },
    [],
  );
  return (
    <>
      <YStack mt="$4" mb="$4">
        <SearchBox
          onTextChange={text => setFilter(text)}
          placeholder={t(
            TranslationNames.screens.clientDesktopDriver.clientsDesktop
              .searchClient,
          )}
        />
      </YStack>
      <YStack f={1}>
        <UniversalList
          listEmptyComponent={emptyListComponent}
          renderItem={renderItem}
          data={sorted}
          listEmptyText={listEmptyText}
          swipeRightAnimation={swipeRightAnimation}
          listSetup={{ isLoading: isFetching, isLoadingError: isError }}
        />
      </YStack>
    </>
  );
}
