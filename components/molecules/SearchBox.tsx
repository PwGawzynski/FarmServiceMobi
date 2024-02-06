import { Input, SizeTokens, XStack } from 'tamagui';
import SearchIcon from '../../assets/search.svg';
import { Colors } from '../../settings/styles/colors';

export type Props = {
  onTextChange: (value: string) => void;
  placeholder: string;
  size?: SizeTokens | string;
};

export function SearchBox({ onTextChange, placeholder, size }: Props) {
  return (
    <XStack
      ai="center"
      borderWidth={2}
      borderColor="$color4"
      borderRadius="$10"
      pl="$4"
      pr="$4"
      backgroundColor="$color1"
    >
      <SearchIcon color={Colors.GREEN} />
      <Input
        size={size ?? '$4'}
        f={1}
        color="$color4"
        backgroundColor="transparent"
        borderWidth={0}
        placeholderTextColor="$color8"
        placeholder={placeholder}
        onChangeText={onTextChange}
      />
    </XStack>
  );
}
