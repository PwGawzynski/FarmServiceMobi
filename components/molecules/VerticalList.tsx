import {
  FlashList,
  ListRenderItem,
  useBlankAreaTracker,
} from '@shopify/flash-list';
import { useCallback, useEffect, useRef } from 'react';
import { View } from 'react-native';
import Empty from '../../assets/empty.svg';
import X from '../../assets/x.svg';
import { ListInfo } from '../atoms/ListInfo';
import { Colors } from '../../settings/styles/colors';

export type VerticalListProps<T> = {
  renderItem: ListRenderItem<T>;
  isLoading?: boolean;
  isLoadingError?: boolean;
  estimatedSize: number;
  data?: T[];
  ListEmptyComponent?: JSX.Element;
  onLoadingData?: JSX.Element[] | JSX.Element;
};

export function VerticalList<T>({
  renderItem,
  data,
  estimatedSize,
  ListEmptyComponent,
  onLoadingData,
  isLoading,
  isLoadingError,
}: VerticalListProps<T>) {
  const ref = useRef<FlashList<T>>(null);
  const [blankAreaTrackerResult, onBlankArea] = useBlankAreaTracker(ref);
  useEffect(() => {
    return () => {
      console.info('Blank Area Measurement ', blankAreaTrackerResult);
    };
  }, []);
  const onLoadListener = useCallback(
    ({ elapsedTimeInMs }: { elapsedTimeInMs: number }) => {
      console.info('Sample List load time', elapsedTimeInMs);
    },
    [],
  );
  const divider = useCallback(() => <View className="h-4" />, []);
  const ListEmpty = useCallback(
    () => <ListInfo Ico={Empty} text="There's nothing to se here" />,
    [],
  );
  const DataUndefinedInfo = useCallback(() => <ListInfo Ico={X} />, []);
  const LoadingErrorInfo = useCallback(
    () => (
      <ListInfo
        Ico={X}
        color={Colors.ERROR_RED}
        text="Problem occurred when fetching clients, please try again letter"
      />
    ),
    [],
  );
  if (isLoading) return onLoadingData;
  if (isLoadingError) return <LoadingErrorInfo />;
  if (data === undefined) return <DataUndefinedInfo />;
  return (
    <FlashList
      ref={ref}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={divider}
      estimatedItemSize={estimatedSize}
      data={data}
      ListEmptyComponent={ListEmptyComponent ?? ListEmpty}
      renderItem={renderItem}
      onBlankArea={onBlankArea}
      onLoad={onLoadListener}
    />
  );
}
