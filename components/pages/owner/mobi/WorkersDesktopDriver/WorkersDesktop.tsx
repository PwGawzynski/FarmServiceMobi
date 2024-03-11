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

export function WorkersDesktop() {
  const { data, isFetching, isError } = useQuery({
    queryKey: ['workers'],
    queryFn: () => [] as Array<WorkerResponseBase>,
  });
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
      />
    ),
    [],
  );
  const ListEmptyComponent = useMemo(
    () => (
      <ListInfo
        Ico={NoUser}
        text={t(TranslationNames.screens.workersDesktop.emptyList)}
      >
        <SwipeRightAnimated />
      </ListInfo>
    ),
    [],
  );
  return (
    <ScreenBase name={t(TranslationNames.screens.workersDesktop.title)}>
      <YStack mt="$4" mb="$4">
        <SearchBox
          onTextChange={text => setFilter(text)}
          placeholder={t(
            TranslationNames.screens.workersDesktop.searchPlaceholder,
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
