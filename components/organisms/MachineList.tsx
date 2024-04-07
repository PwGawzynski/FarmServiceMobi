import { useQuery } from '@tanstack/react-query';
import { RefObject, useCallback, useState } from 'react';
import { ListRenderItemInfo } from '@shopify/flash-list';
import { YStack } from 'tamagui';
import { t } from 'i18next';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { SearchBox } from '../molecules/SearchBox';
import { TranslationNames } from '../../locales/TranslationNames';
import { UniversalList } from './UniversalList';
import { getAllMachines } from '../../api/Machine/Machine';
import { MachineResponseBase } from '../../FarmServiceApiTypes/Machine/Responses';
import MachineListItem from '../molecules/MachineListItem';

export interface Props {
  bottomSheetRef: RefObject<BottomSheetModal>;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function MachineList({ bottomSheetRef }: Props) {
  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ['machines'],
    queryFn: getAllMachines,
  });
  const [filter, setFilter] = useState<string | undefined>(undefined);
  const sorted = data
    ?.filter(m =>
      filter
        ? (m.name + m.licensePlate)
            .trim()
            .replaceAll(' ', '')
            .toLowerCase()
            .includes(filter.toLowerCase().replaceAll(' ', ''))
        : true,
    )
    .sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1));
  console.log(filter, sorted);

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<MachineResponseBase>) => {
      return <MachineListItem machine={item} />;
    },
    [],
  );

  return (
    <>
      <YStack mt="$4" mb="$4">
        <SearchBox
          onTextChange={text => setFilter(text)}
          placeholder={t(
            TranslationNames.screens.machineDesktopDriver.machinesDesktop
              .searchPlaceholder,
          )}
        />
      </YStack>
      <YStack f={1}>
        <UniversalList
          renderItem={renderItem}
          data={sorted}
          swipeRightAnimation
          listSetup={{
            isLoading: isFetching || isLoading,
            isLoadingError: isError,
          }}
        />
      </YStack>
    </>
  );
}
