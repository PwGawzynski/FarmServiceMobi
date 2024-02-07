import { Card, SizableText, XStack, YStack } from 'tamagui';
import { useNavigation } from '@react-navigation/native';
import { UserAvatar } from './UserAvatar';
import { ClientResponseBase } from '../../FarmServiceApiTypes/Clients/Responses';

export type Props = {
  client: ClientResponseBase;
};

export function ClientListItem({ client }: Props) {
  const { name, surname } = client.user.personal_data;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const navigation = useNavigation<any>();
  const onPress = () => navigation.navigate('clientDetails', { client });
  return (
    <Card onPress={onPress}>
      <XStack p="$2" ai="center" justifyContent="space-between">
        <UserAvatar
          nameFirstLetter={client.user.personal_data.name[0]}
          surnameFirstLetter={client.user.personal_data.surname[0]}
        />
        <YStack ml="$2">
          <SizableText
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
          </SizableText>
          <SizableText color="$color8" textAlign="right">
            {client.user.address.city}
          </SizableText>
        </YStack>
      </XStack>
    </Card>
  );
}
