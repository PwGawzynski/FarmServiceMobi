import {
  ListItem,
  ListItemStyleSettings,
} from '../components/organisms/ListItem';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ItemSetup<T extends Record<string, any>> {
  handleOnItemPress?: (item: T) => void;
  listStyleSettings?: (item: T) => ListItemStyleSettings;
  onPressNavigateTo?: string;
  navigationParamName?: string;
  isSelectable?: boolean;
  handleFieldSelection?: (item: T) => void;
  handleFieldDeselection?: (item: T) => void;
  selectedItems: T[];
  item: T;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createListItem<T extends Record<string, any>>({
  item,
  handleOnItemPress,
  listStyleSettings,
  onPressNavigateTo,
  navigationParamName,
  isSelectable,
  handleFieldSelection,
  handleFieldDeselection,
  selectedItems,
}: ItemSetup<T>) {
  const handleOnPress = () => {
    if (handleOnItemPress) handleOnItemPress(item);
  };

  const {
    bottomRightText,
    header,
    infoIco,
    avatarChars,
    alignment,
    customIco,
    disabled,
  } = listStyleSettings
    ? listStyleSettings(item)
    : {
        bottomRightText: undefined,
        header: undefined,
        infoIco: undefined,
        avatarChars: undefined,
        alignment: undefined,
        customIco: undefined,
        disabled: false,
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
      customIco={customIco}
      alignment={alignment}
      avatarChars={avatarChars}
      disabled={disabled}
    />
  );
}
