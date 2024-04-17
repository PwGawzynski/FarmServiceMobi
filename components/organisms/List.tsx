import {
  ForwardedRef,
  forwardRef,
  memo,
  RefObject,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { XStack, YStack } from 'tamagui';
import { ListRenderItemInfo } from '@shopify/flash-list';
import Toast from 'react-native-toast-message';
import { t } from 'i18next';
import { SearchBox } from '../molecules/SearchBox';
import { ButtonTamagui } from '../atoms/ButtonTamagui';
import DeselectIco from '../../assets/list-x.svg';
import SelectAllIco from '../../assets/list-checks.svg';
import { UniversalList } from './UniversalList';
import { ListItem, ListItemStyleSettings } from './ListItem';
import { TranslationNames } from '../../locales/TranslationNames';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface Props<T extends Record<string, any>> {
  /* eslint-disable react/no-unused-prop-types */
  modalRef: RefObject<BottomSheetModal>;
  searchEnginePlaceholder?: string;
  isSelectable?: boolean;
  triggerOnSelectedChange?: (isEmpty: boolean) => void;
  data: T[] | undefined;
  filterFunction?: (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any[] | undefined,
    filter: string | undefined,
  ) => T[] | undefined;
  listStyleSettings?: (item: T) => ListItemStyleSettings;
  handleOnItemPress?: (item: T) => void;
  isFetching?: boolean;
  isLoading?: boolean;
  isError?: boolean;
  onPressNavigateTo?: string;
  navigationParamName?: string;
  listEmptyText?: string;
  ref?: ForwardedRef<ListRef<T>>;
  maxSelectedItems?: number;
  cName?: string;
  listEmptyComponent?: JSX.Element;
  swipeRightAnimation?: boolean;
  beFlex?: boolean;
  /* eslint-enable react/no-unused-prop-types */
}
export interface ListRef<T> {
  items: T[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ListMemo<T extends Record<string, any>>(
  {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    modalRef,
    triggerOnSelectedChange,
    isSelectable,
    data,
    filterFunction,
    listStyleSettings,
    handleOnItemPress,
    isFetching,
    isLoading,
    isError,
    navigationParamName,
    onPressNavigateTo,
    listEmptyText,
    searchEnginePlaceholder,
    maxSelectedItems,
    cName,
    listEmptyComponent,
    swipeRightAnimation,
    beFlex,
  }: Props<T>,
  ref: ForwardedRef<ListRef<T>>,
) {
  const [filter, setFilter] = useState<string | undefined>(undefined);
  const [selectedItems, setSelectedItems] = useState<T[] | []>([]);
  const sorted = filterFunction ? filterFunction(data, filter) : data;
  const maxSelected = maxSelectedItems ?? data?.length;

  const handleFieldSelection = (item: T) => {
    setSelectedItems(p => (p.length === maxSelected ? p : [...p, item]));
    if (maxSelected && selectedItems.length === maxSelected)
      Toast.show({
        type: 'info',
        text1: t(TranslationNames.components.list.cannotSelectMore),
        text2: t(TranslationNames.components.list.cannotSelectMoreDescription),
        autoHide: true,
        visibilityTime: 1500,
      });
  };
  const handleFieldDeselection = (item: T) =>
    setSelectedItems(prevState => prevState.filter(i => i.id !== item.id));
  const handleSelectBtn = () => {
    if (!selectedItems.length) setSelectedItems(data ?? []);
    else setSelectedItems([]);
  };

  useEffect(() => {
    if (triggerOnSelectedChange) triggerOnSelectedChange(!selectedItems.length);
  }, [selectedItems]);
  /**
   * Exposes the fields selected
   */
  useImperativeHandle(
    ref,
    () =>
      ({
        items: selectedItems,
      }) as ListRef<T>,
    [selectedItems],
  );

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<T>) => {
      const handleOnPress = () => {
        if (handleOnItemPress) handleOnItemPress(item);
      };

      const { bottomRightText, header, infoIco, avatarChars, alignment } =
        listStyleSettings
          ? listStyleSettings(item)
          : {
              bottomRightText: undefined,
              header: undefined,
              infoIco: undefined,
              avatarChars: undefined,
              alignment: undefined,
            };
      return (
        <ListItem<T>
          onPressNavigateTo={onPressNavigateTo}
          navigationParams={{ [navigationParamName ?? 'item']: item }}
          onSelected={isSelectable ? handleFieldSelection : undefined}
          onDeselected={isSelectable ? handleFieldDeselection : undefined}
          isSelected={selectedItems.some(i => i.id === item.id)}
          item={item}
          onPress={!isSelectable ? handleOnPress : undefined}
          header={header}
          bottomRightText={bottomRightText}
          infoIco={infoIco}
          alignment={alignment}
          avatarChars={avatarChars}
        />
      );
    },
    [selectedItems, data],
  );

  return (
    <>
      <YStack mt="$4" mb="$4" className={cName}>
        {filterFunction && (
          <XStack ai="center">
            <YStack f={1}>
              <SearchBox
                onTextChange={text => setFilter(text)}
                placeholder={searchEnginePlaceholder ?? ''}
              />
            </YStack>
            {isSelectable && !maxSelectedItems && (
              <ButtonTamagui
                icon={selectedItems.length ? <DeselectIco /> : <SelectAllIco />}
                buttonProps={{
                  onPress: handleSelectBtn,
                  ml: '$2',
                }}
              />
            )}
          </XStack>
        )}
      </YStack>
      <YStack f={1}>
        <UniversalList<T>
          beFlex={beFlex}
          listEmptyComponent={listEmptyComponent}
          listEmptyText={listEmptyText}
          renderItem={renderItem}
          data={sorted}
          swipeRightAnimation={swipeRightAnimation}
          listSetup={{
            isLoading: isFetching || isLoading,
            isLoadingError: isError,
          }}
        />
      </YStack>
    </>
  );
}

export default memo(forwardRef(ListMemo)) as typeof ListMemo;
