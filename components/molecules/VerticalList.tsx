import {
  FlashList,
  ListRenderItem,
  useBlankAreaTracker,
} from '@shopify/flash-list';
import { useCallback, useEffect, useRef } from 'react';
import { View } from 'react-native';
import Empty from '../../assets/empty.svg';
import { EmptyList } from '../atoms/EmptyList';

export type VerticalListProps<T> = {
  renderItem: ListRenderItem<T>;
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
  const ListEmpty = useCallback(() => <EmptyList EmptyIco={Empty} />, []);
  if (data === undefined) return onLoadingData;
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
