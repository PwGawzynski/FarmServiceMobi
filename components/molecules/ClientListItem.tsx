import { Card, Circle, SizableText, View, XStack, YStack } from 'tamagui';
import { useNavigation } from '@react-navigation/native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { useEffect } from 'react';
import { UserAvatar } from './UserAvatar';
import { ClientResponseBase } from '../../FarmServiceApiTypes/Clients/Responses';

export type Props = {
  client: ClientResponseBase;
};

export default function ClientListItem({ client }: Props) {
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
            {name} {surname}
          </SizableText>
          <SizableText color="$color8" textAlign="right">
            {client.user.address.city}
          </SizableText>
        </YStack>
      </XStack>
    </Card>
  );
}

export interface ClientListItemSkeletonProps {
  maxHeight?: number;
}

export function ClientListItemSkeleton({
  maxHeight,
}: ClientListItemSkeletonProps) {
  const DURATION = 800;
  const opacity = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));
  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(1, { duration: DURATION }),
        withTiming(0, { duration: DURATION }),
      ),
      -1,
      true,
    );
  }, []);
  return (
    <View className={`flex-1 justify-center mt-2 mb-2 p-2 max-h-${maxHeight}`}>
      <Animated.View style={[animatedStyle]} className="flex-1 flex-row">
        <Circle height={40} width={40} backgroundColor="$color8" />
        <View className="flex-1 flex-col items-end">
          <View backgroundColor="$color8" className="flex-1 rounded-md w-2/3" />
          <View
            backgroundColor="$color8"
            className="flex-1 w-1/3 rounded-md mt-2"
          />
        </View>
      </Animated.View>
    </View>
  );
}
