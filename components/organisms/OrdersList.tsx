import { useQuery } from '@tanstack/react-query';
import { RefObject, useCallback, useState } from 'react';
import { ListRenderItemInfo } from '@shopify/flash-list';
import { YStack } from 'tamagui';
import { t } from 'i18next';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { SearchBox } from '../molecules/SearchBox';
import { TranslationNames } from '../../locales/TranslationNames';
import { UniversalList } from './UniversalList';
import { getAllOrders } from '../../api/Order/Order';
import { OrderResponseBase } from '../../FarmServiceApiTypes/Order/Ressponses';
import OrderListItem from '../molecules/OrderListItem';

export interface Props {
  bottomSheetRef: RefObject<BottomSheetModal>;
}
// TODO add bottom sheet
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function OrderList({ bottomSheetRef }: Props) {
  const { data, isFetching, isLoading, isError } = useQuery({
    queryKey: ['orders'],
    queryFn: getAllOrders,
  });
  const [filter, setFilter] = useState<string | undefined>(undefined);

  const sorted = data
    ?.filter(order =>
      filter
        ? order.name
            .trim()
            .toLowerCase()
            .includes(filter.toLowerCase().replace(' ', ''))
        : true,
    )
    .sort((a, b) =>
      new Date(a.performanceDate).getTime() >
      new Date(b.performanceDate).getTime()
        ? 1
        : -1,
    );
  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<OrderResponseBase>) => {
      /* const handleOnPress = () => {
          if (optionalOnPress) optionalOnPress(item);
        }; */
      return <OrderListItem order={item} />;
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
