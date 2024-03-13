import { Adapt, Select, Sheet, SizableText, XStack } from 'tamagui';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import ChevronDown from '../../assets/chevron-down.svg';
import { Theme } from '../../FarmServiceApiTypes/Account/Constants';
import { Colors } from '../../settings/styles/colors';
import { selectTheme } from '../../src/redux/feature/userSlice';
import { PendingInfo } from '../atoms/PendingInfo';

export type SelectorProps = {
  value: string;
  onValueChange?: (val: string) => void;
  items: { name: string }[];
  itemListLabel?: string;
  description?: string;
  pending?: boolean;
};

export function Selector({
  value,
  onValueChange,
  items,
  itemListLabel,
  description,
  pending,
}: SelectorProps) {
  const handleValueChange = (v: string) => {
    if (onValueChange) onValueChange(v);
  };
  const theme = useSelector(selectTheme);

  const memoizedItems = useMemo(
    () =>
      items.map((item, i) => {
        return (
          <Select.Item
            index={i}
            key={item.name}
            value={item.name.toLowerCase()}
            style={{
              fontWeight: item.name.toLowerCase() === value ? 'bold' : 'normal',
              fontSize: item.name.toLowerCase() === value ? '$7' : '$4',
              color:
                // eslint-disable-next-line no-nested-ternary
                item.name.toLowerCase() === value
                  ? theme === Theme.dark
                    ? Colors.WHITE
                    : Colors.DARK_BLUE
                  : theme === Theme.dark
                    ? Colors.GREEN
                    : Colors.DARK_BLUE,
            }}
            pressStyle={{ backgroundColor: '$color8' }}
          >
            {item.name}
            <Select.ItemIndicator marginLeft="auto" />
          </Select.Item>
        );
      }),
    [items, value],
  );

  return (
    <XStack>
      <XStack f={1}>
        <SizableText
          adjustsFontSizeToFit
          numberOfLines={1}
          className="text-xl uppercase font-bold text-dark-blue dark:text-green"
        >
          {description}:
        </SizableText>
      </XStack>
      <Select
        value={value}
        onValueChange={handleValueChange}
        disablePreventBodyScroll
      >
        <Select.Trigger
          style={{
            flex: 1,
          }}
          size="$2"
          pressStyle={{ backgroundColor: '$color8' }}
          iconAfter={
            <ChevronDown
              color={theme === Theme.dark ? Colors.WHITE : Colors.DARK_BLUE}
            />
          }
        >
          {!pending ? (
            <Select.Value
              style={{ textTransform: 'uppercase' }}
              pressStyle={{ color: '$color8' }}
            >
              {value}
            </Select.Value>
          ) : (
            <PendingInfo isVisible infoText="Pending" />
          )}
        </Select.Trigger>

        <Adapt when="sm" platform="touch">
          <Sheet
            native
            modal
            dismissOnSnapToBottom
            animationConfig={{
              type: 'timing',
              duration: 300,
            }}
          >
            <Sheet.Frame>
              <Sheet.ScrollView>
                <Adapt.Contents />
              </Sheet.ScrollView>
            </Sheet.Frame>
            <Sheet.Overlay
              enterStyle={{ opacity: 0 }}
              exitStyle={{ opacity: 0 }}
            />
          </Sheet>
        </Adapt>

        <Select.Content zIndex={200000}>
          <Select.Viewport>
            <Select.Group>
              <Select.Label>
                <SizableText className="text-xl uppercase font-bold text-dark-blue dark:text-green">
                  {itemListLabel}
                </SizableText>
              </Select.Label>
              {memoizedItems}
            </Select.Group>
            {/* Native gets an extra icon */}
          </Select.Viewport>
        </Select.Content>
      </Select>
    </XStack>
  );
}
