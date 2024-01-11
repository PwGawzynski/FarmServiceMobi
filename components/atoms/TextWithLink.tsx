import { Text, TextProps, View } from 'react-native';
import { AppLinkButton } from './AppLinkButton';

export type Props = {
  text: string;
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
      <Text className="text-center text-dark dark:text-green text-base font-medium ">
        {text}
      </Text>
      <AppLinkButton
        onPress={onLinkPress}
        textClassName="text-center font-medium text-base ml-1 color-light-blue dark:text-white"
        title={linkText}
      />
    </View>
  );
}
