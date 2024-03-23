import { YStack } from 'tamagui';
import { useCallback, useMemo, useState } from 'react';
import { t } from 'i18next';
import { useQuery } from '@tanstack/react-query';
import { ListRenderItemInfo } from '@shopify/flash-list';
import { ScreenBase } from '../common/ScreenBase';
import { SearchBox } from '../../../../molecules/SearchBox';
import { TranslationNames } from '../../../../../locales/TranslationNames';
import { WorkerResponseBase } from '../../../../../FarmServiceApiTypes/Worker/Responses';
import { UniversalList } from '../../../../organisms/UniversalList';
import PersonListItem from '../../../../molecules/PersonListItem';
import { Status } from '../../../../../FarmServiceApiTypes/Worker/Enums';
import NoUser from '../../../../../assets/noUser.svg';
import { ListInfo } from '../../../../atoms/ListInfo';
import { SwipeRightAnimated } from '../../../../atoms/SwipeRightAnimated';
import { searchEngineNameSurnameFilter } from '../../../../../helepers/filterFunctions';
import { allWorkers } from '../../../../../api/worker/Worker';
import { EXPO_PUBLIC_QUERY_STALE_TIME } from '../../../../../settings/query/querySettings';

export function WorkersDesktop() {
  const { data, isFetching, isError } = useQuery({
    queryKey: ['workers'],
    queryFn: allWorkers,
    staleTime: EXPO_PUBLIC_QUERY_STALE_TIME,
    gcTime: EXPO_PUBLIC_QUERY_STALE_TIME,
  });
  console.log(data);
  const [filter, setFilter] = useState<string | undefined>(undefined);

  const sorted = searchEngineNameSurnameFilter(data, filter);
  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<WorkerResponseBase>) => (
      <PersonListItem
        name={item.personalData.name}
        surname={item.personalData.surname}
        bottomRightText={
          item.status !== undefined ? Status[item.status] : undefined
        }
        onPressNavigateTo="workerDetails"
        navigationParams={{ worker: item }}
      />
    ),
    [],
  );
  const ListEmptyComponent = useMemo(
    () => (
      <ListInfo
        Ico={NoUser}
        text={t(
          TranslationNames.screens.ownerRootDriver.workersDesktop.emptyList,
        )}
      >
        <SwipeRightAnimated />
      </ListInfo>
    ),
    [],
  );
  return (
    <ScreenBase
      name={t(TranslationNames.screens.ownerRootDriver.workersDesktop.title)}
    >
      <YStack mt="$4" mb="$4">
        <SearchBox
          onTextChange={text => setFilter(text)}
          placeholder={t(
            TranslationNames.screens.ownerRootDriver.workersDesktop
              .searchPlaceholder,
          )}
        />
      </YStack>
      <YStack f={1}>
        <UniversalList
          data={sorted}
          renderItem={renderItem}
          listSetup={{ isLoading: isFetching, isLoadingError: isError }}
          listEmptyComponent={ListEmptyComponent}
        />
      </YStack>
    </ScreenBase>
  );
}
