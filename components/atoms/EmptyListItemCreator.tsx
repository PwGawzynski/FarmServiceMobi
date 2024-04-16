import { SizableText, YStack } from 'tamagui';
import { ButtonTamagui } from './ButtonTamagui';

export type Props = {
  onCreate: () => void;
  infoText?: string;
};

export function EmptyListItemCreator({ onCreate, infoText }: Props) {
  return (
    <YStack f={1}>
      <YStack f={1} ai="center" jc="center">
        <SizableText className="text-center p-2">{infoText}</SizableText>
        <ButtonTamagui
          text="Create"
          buttonProps={{
            mt: '$4',
            width: '100%',
            onPress: onCreate,
          }}
        />
      </YStack>
    </YStack>
  );
}
