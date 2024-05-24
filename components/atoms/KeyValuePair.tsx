import { SizableText, XStack } from 'tamagui';

export type KeyValuePairProps = {
  name: string;
  value?: string;
};

export function KeyValuePair({ name, value }: KeyValuePairProps) {
  return (
    <XStack mt="$2" jc="space-between">
      <SizableText color="$color4" size="$4">
        {name}
      </SizableText>
      <SizableText color="$color4" size="$4">
        {value?.toString() || 'N/A'}
      </SizableText>
    </XStack>
  );
}
