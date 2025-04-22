import { Avatar, AvatarFallback, AvatarImage, SizeTokens, Text } from 'tamagui';

export type Props = {
  nameFirstLetter: string;
  surnameFirstLetter: string;
  imageUrl?: string;
  size?: SizeTokens | string;
};

export function UserAvatar({
  nameFirstLetter,
  surnameFirstLetter,
  imageUrl,
  size,
}: Props) {
  return (
    <Avatar bg="$color5" circular size={size || '$3'} ml="$1">
      <AvatarImage source={{ uri: imageUrl }} />
      <AvatarFallback ai="center" jc="center">
        <Text
          adjustsFontSizeToFit
          numberOfLines={1}
          fontSize="$4"
          color="$color3"
        >
          {nameFirstLetter}
          {surnameFirstLetter}
        </Text>
      </AvatarFallback>
    </Avatar>
  );
}
