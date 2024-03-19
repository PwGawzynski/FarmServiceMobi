import { t } from 'i18next';
import { useQuery } from '@tanstack/react-query';
import { YStack } from 'tamagui';
import { useCallback, useState } from 'react';
import { ListRenderItemInfo } from '@shopify/flash-list';
import { ScreenBase } from '../common/ScreenBase';
import { TranslationNames } from '../../../../../locales/TranslationNames';
import { getClients } from '../../../../../api/clients/Client';
import { EXPO_PUBLIC_QUERY_STALE_TIME } from '../../../../../settings/query/querySettings';
import { SearchBox } from '../../../../molecules/SearchBox';
import { ClientResponseBase } from '../../../../../FarmServiceApiTypes/Clients/Responses';
import PersonListItem from '../../../../molecules/PersonListItem';
import { UniversalList } from '../../../../organisms/UniversalList';

const SCREEN_NAME = t(
  TranslationNames.screens.clientDesktopDriver.clientsDesktop.title,
);

export function ClientsDesktop() {
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
      return (
        <PersonListItem
          name={item.user.personal_data.name}
          surname={item.user.personal_data.surname}
          bottomRightText={item.user.address.city}
          onPressNavigateTo="clientControlPanel"
          navigationParams={{ client: item }}
        />
      );
    },
    [],
  );
  return (
    <ScreenBase name={SCREEN_NAME}>
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
          renderItem={renderItem}
          data={sorted}
          listSetup={{ isLoading: isFetching, isLoadingError: isError }}
        />
      </YStack>
    </ScreenBase>
  );
}
