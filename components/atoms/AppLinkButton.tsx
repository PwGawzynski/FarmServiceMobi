import { TouchableOpacity, TouchableOpacityProps, Text } from 'react-native';

export type Props = {
  title: string;
  textClassName?: string;
} & TouchableOpacityProps;

export function AppLinkButton(props: Props) {
  return (
    <TouchableOpacity {...props}>
      <Text
        className={`text-dark dark:text-green underline ${props.textClassName}`}
      >
        {props.title}
      </Text>
    </TouchableOpacity>
  );
}
