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
    <Avatar bg="$color8" circular size={size || '$3'}>
      <AvatarImage source={{ uri: imageUrl }} />
      <AvatarFallback ai="center" jc="center">
        <Text
          adjustsFontSizeToFit
          numberOfLines={1}
          fontSize="$4"
          color="$color1"
        >
          {nameFirstLetter}
          {surnameFirstLetter}
        </Text>
      </AvatarFallback>
    </Avatar>
  );
}
