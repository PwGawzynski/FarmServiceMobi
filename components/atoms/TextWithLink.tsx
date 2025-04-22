import { TextProps, View } from 'react-native';
import { SizableText } from 'tamagui';
import { AppLinkButton } from './AppLinkButton';

export type Props = {
  text?: string;
  onLinkPress: () => void;
  linkText: string;
  abs?: string;
};

export function TextWithLink({
  text,
  onLinkPress,
  linkText,
  abs,
}: Props & TextProps) {
  return (
    <View className={`flex-row justify-center ${abs}`}>
      <SizableText className="text-center text-dark dark:text-green text-base font-medium ">
        {text}
      </SizableText>
      <AppLinkButton
        onPress={onLinkPress}
        textClassName="text-center font-medium text-base ml-1 color-light-blue dark:text-white"
        title={linkText}
      />
    </View>
  );
}
