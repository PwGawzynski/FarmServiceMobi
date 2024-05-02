import {
  FlashList,
  ListRenderItem,
  useBlankAreaTracker,
} from '@shopify/flash-list';
import { useCallback, useEffect, useRef } from 'react';
import { View } from 'react-native';
import { t } from 'i18next';
import X from '../../assets/x.svg';
import { ListInfo } from '../atoms/ListInfo';
import { Colors } from '../../settings/styles/colors';
import { TranslationNames } from '../../locales/TranslationNames';

const TRANSLATIONS = {
  problemOccurred: t(TranslationNames.components.verticalList.problemOccurred),
};

export type VerticalListProps<T> = {
  renderItem: ListRenderItem<T>;
  isLoading?: boolean;
  isLoadingError?: boolean;
  estimatedSize: number;
  data?: T[];
  ListEmptyComponent?: JSX.Element;
  onLoadingData?: JSX.Element[] | JSX.Element;
  scrollToBottomOnContentSizeChange?: boolean;
};

export function VerticalList<T>({
  renderItem,
  data,
  estimatedSize,
  ListEmptyComponent,
  onLoadingData,
  isLoading,
  isLoadingError,
  scrollToBottomOnContentSizeChange,
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

  const DataUndefinedInfo = useCallback(() => <ListInfo Ico={X} />, []);
  const LoadingErrorInfo = useCallback(
    () => (
      <ListInfo
        Ico={X}
        color={Colors.ERROR_RED}
        text={TRANSLATIONS.problemOccurred}
      />
    ),
    [],
  );
  const onContentSizeChange = useCallback(() => {
    if (scrollToBottomOnContentSizeChange) {
      ref.current?.scrollToEnd({ animated: true });
    }
  }, []);
  if (isLoading) return onLoadingData;
  if (isLoadingError) return <LoadingErrorInfo />;
  if (data === undefined) return <DataUndefinedInfo />;
  return (
    <FlashList
      ref={ref}
      onContentSizeChange={onContentSizeChange}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={divider}
      estimatedItemSize={estimatedSize}
      data={data}
      ListEmptyComponent={ListEmptyComponent}
      renderItem={renderItem}
      onBlankArea={onBlankArea}
      onLoad={onLoadListener}
    />
  );
}
