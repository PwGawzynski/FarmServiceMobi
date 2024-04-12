import { useQuery } from '@tanstack/react-query';
import {
  ForwardedRef,
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import { ListRenderItemInfo } from '@shopify/flash-list';
import { t } from 'i18next';
import { XStack, YStack } from 'tamagui';
import { allWorkers } from '../../api/worker/Worker';
import { EXPO_PUBLIC_QUERY_STALE_TIME } from '../../settings/query/querySettings';
import { searchEngineNameSurnameFilter } from '../../helepers/filterFunctions';
import { WorkerResponseBase } from '../../FarmServiceApiTypes/Worker/Responses';
import PersonListItem from '../molecules/PersonListItem';
import { Status } from '../../FarmServiceApiTypes/Worker/Enums';
import { ListInfo } from '../atoms/ListInfo';
import NoUser from '../../assets/noUser.svg';
import { TranslationNames } from '../../locales/TranslationNames';
import { SwipeRightAnimated } from '../atoms/SwipeRightAnimated';
import { SearchBox } from '../molecules/SearchBox';
import { UniversalList } from './UniversalList';
import { ButtonTamagui } from '../atoms/ButtonTamagui';
import DeselectIco from '../../assets/list-x.svg';
import SelectAllIco from '../../assets/list-checks.svg';

function EmptyComponent() {
  return (
    <ListInfo
      Ico={NoUser}
      text={t(
        TranslationNames.screens.ownerRootDriver.workersDesktop.emptyList,
      )}
    >
      <SwipeRightAnimated />
    </ListInfo>
  );
}
export interface WorkerListProps {
  // eslint-disable-next-line react/no-unused-prop-types
  isSelectable?: boolean;
}

export interface WorkerListRef {
  workers: WorkerResponseBase[];
}
export const WorkerList = memo(
  forwardRef(
    ({ isSelectable }: WorkerListProps, ref: ForwardedRef<WorkerListRef>) => {
      const { data, isFetching, isError } = useQuery({
        queryKey: ['workers'],
        queryFn: allWorkers,
        staleTime: EXPO_PUBLIC_QUERY_STALE_TIME,
        gcTime: EXPO_PUBLIC_QUERY_STALE_TIME,
      });
      const [filter, setFilter] = useState<string | undefined>(undefined);
      const sorted = searchEngineNameSurnameFilter(data, filter);
      const [selectedWorkers, setSelectedWorkers] = useState<
        WorkerResponseBase[] | []
      >([]);

      /**
       * Exposes the fields selected
       */
      useImperativeHandle(
        ref,
        () =>
          ({
            workers: selectedWorkers,
          }) as WorkerListRef,
        [selectedWorkers],
      );

      const handleFieldSelection = (worker: WorkerResponseBase) =>
        setSelectedWorkers(p => [...p, worker]);
      const handleFieldDeselection = (worker: WorkerResponseBase) => {
        console.log(worker, 'test');
        setSelectedWorkers(prevState =>
          prevState.filter(f => f.id !== worker.id),
        );
      };
      const handleSelectBtn = () => {
        if (!selectedWorkers.length) setSelectedWorkers(data ?? []);
        else setSelectedWorkers([]);
      };

      const renderItem = useCallback(
        ({ item }: ListRenderItemInfo<WorkerResponseBase>) => (
          <PersonListItem
            item={item}
            name={item.personalData.name}
            surname={item.personalData.surname}
            bottomRightText={
              item.status !== undefined ? Status[item.status] : undefined
            }
            onPressNavigateTo={isSelectable ? 'workerDetails' : undefined}
            navigationParams={isSelectable ? { worker: item } : undefined}
            onSelected={handleFieldSelection}
            onDeselected={handleFieldDeselection}
            isSelected={!!selectedWorkers?.find(f => f.id === item.id)}
          />
        ),
        [selectedWorkers, isSelectable],
      );
      const ListEmptyComponent = useMemo(() => <EmptyComponent />, []);
      return (
        <YStack f={1} mt="$4">
          <XStack ai="center">
            <YStack f={1}>
              <SearchBox
                onTextChange={text => setFilter(text)}
                placeholder="Search worker"
              />
            </YStack>
            {isSelectable && (
              <ButtonTamagui
                icon={
                  selectedWorkers.length ? <DeselectIco /> : <SelectAllIco />
                }
                buttonProps={{
                  onPress: handleSelectBtn,
                  ml: '$2',
                }}
              />
            )}
          </XStack>
          <YStack f={1} mt="$4">
            <UniversalList
              data={sorted}
              renderItem={renderItem}
              listSetup={{ isLoading: isFetching, isLoadingError: isError }}
              listEmptyComponent={ListEmptyComponent}
            />
          </YStack>
        </YStack>
      );
    },
  ),
  (prev, cur) => prev.isSelectable === cur.isSelectable,
);
