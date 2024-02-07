import { SizableText, XStack } from 'tamagui';

export type KeyValuePairProps = {
  name: string;
  value?: string;
};

export function KeyValuePair({ name, value }: KeyValuePairProps) {
  return (
    <XStack mt="$2" jc="space-between">
      <SizableText color="white" size="$4">
        {name}
      </SizableText>
      <SizableText color="white" size="$4">
        {value?.toString() || 'N/A'}
      </SizableText>
    </XStack>
  );
}
