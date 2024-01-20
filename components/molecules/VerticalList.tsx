import {
  FlashList,
  ListRenderItem,
  useBlankAreaTracker,
} from '@shopify/flash-list';
import { useCallback, useEffect, useRef } from 'react';
import { View } from 'react-native';

export type VerticalListProps<T> = {
  renderItem: ListRenderItem<T>;
  data: T[];
  estimatedSize: number;
};

export function VerticalList<T>({
  renderItem,
  data,
  estimatedSize,
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
  const divider = useCallback(() => <View className="h-2" />, []);
  return (
    <FlashList
      ref={ref}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={divider}
      estimatedItemSize={estimatedSize}
      data={data}
      renderItem={renderItem}
      onBlankArea={onBlankArea}
      onLoad={onLoadListener}
    />
  );
}
