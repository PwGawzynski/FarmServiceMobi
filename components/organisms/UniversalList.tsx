import { Dimensions } from 'react-native';
import { useCallback, useMemo } from 'react';
import { ListRenderItemInfo } from '@shopify/flash-list';
import { t } from 'i18next';
import { VerticalList, VerticalListProps } from '../molecules/VerticalList';
import { ListInfo } from '../atoms/ListInfo';
import Empty from '../../assets/empty.svg';
import { TranslationNames } from '../../locales/TranslationNames';
import { SwipeRightAnimated } from '../atoms/SwipeRightAnimated';
import { ListItemSkeleton } from '../molecules/PersonListItem';

export type Props<T> = {
  data?: Array<T>;
  listSetup?: Omit<VerticalListProps<T>, 'renderItem' | 'estimatedSize'>;
  renderItem: (info: ListRenderItemInfo<T>) => JSX.Element;
  listEmptyComponent?: JSX.Element;
  listEmptyText?: string;
  swipeRightAnimation?: boolean;
};

const EL_HEIGHT = 100;
const EL_COUNT = Math.floor(Dimensions.get('window').height / EL_HEIGHT);

export function UniversalList<T>({
  data,
  listSetup,
  renderItem,
  listEmptyComponent,
  listEmptyText,
  swipeRightAnimation,
}: Props<T>) {
  const ListEmptyComponent = useMemo(
    () => (
      <ListInfo
        Ico={Empty}
        text={
          listEmptyText ||
          t(TranslationNames.components.universalList.listEmptyText)
        }
      >
        {swipeRightAnimation && <SwipeRightAnimated />}
      </ListInfo>
    ),
    [],
  );

  const onFetching = useCallback(() => {
    const elements = [];
    for (let i = 0; i < EL_COUNT; i += 1) {
      elements.push(<ListItemSkeleton key={i} />);
    }
    return elements;
  }, []);
  return (
    <VerticalList
      ListEmptyComponent={listEmptyComponent || ListEmptyComponent}
      estimatedSize={150}
      renderItem={renderItem}
      data={data}
      onLoadingData={onFetching()}
      {...listSetup}
    />
  );
}
