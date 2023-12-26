import { Separator, Text, XStack } from 'tamagui';

export function OrDivider() {
  return (
    <XStack mt="$4" mb="$4" alignItems="center">
      <Separator />
      <Text ml="$2" mr="$2" color="$background">
        OR
      </Text>
      <Separator />
    </XStack>
  );
}
