import { Card, Text, XStack, YStack } from 'tamagui';
import { UserAvatar } from './UserAvatar';
import { ClientResponseBase } from '../../FarmServiceApiTypes/Clients/Responses';

export type Props = {
  user: ClientResponseBase['user'];
};

export function ClientListItem({ user }: Props) {
  const { name, surname } = user.personal_data;
  return (
    <Card>
      <XStack p="$2" ai="center" justifyContent="space-between">
        <UserAvatar
          nameFirstLetter={user.personal_data.name[0]}
          surnameFirstLetter={user.personal_data.surname[0]}
        />
        <YStack ml="$2">
          <Text
            fontWeight="bold"
            fontSize={name.length + surname.length > 20 ? '$4' : '$7'}
            color="$color"
            textTransform="uppercase"
            textAlign="right"
            adjustsFontSizeToFit
            numberOfLines={1}
          >
            {name.length > 10 ? `${name.slice(0, 10)}...` : name}{' '}
            {surname.length > 10 ? `${surname.slice(0, 10)}...` : surname}
          </Text>
          <Text color="$color8" textAlign="right">
            {user.address.city}
          </Text>
        </YStack>
      </XStack>
    </Card>
  );
}
