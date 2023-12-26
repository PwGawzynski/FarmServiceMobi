import { useTheme, XStack, YStack } from 'tamagui';
import Location from '../../assets/location.svg';
import { Text } from './Text';

export function Logo() {
  const { background } = useTheme();

  return (
    <XStack mt="$8" h="$6" justifyContent="center" alignItems="center">
      <XStack>
        <YStack w="20%">
          <Location width="100%" height="100%" fill={background?.val} />
        </YStack>
        <YStack justifyContent="center">
          <Text fontStyle="italic" fontSize={40}>
            FarmService
          </Text>
        </YStack>
      </XStack>
    </XStack>
  );
}
