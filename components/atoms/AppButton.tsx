import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { ReactNode } from 'react';
import { getFontScaledSize } from '../../helepers/FontSize';

export type Props = {
  title: string;
  children?: ReactNode;
} & TouchableOpacityProps;

export function AppButton(props: Props) {
  return (
    <TouchableOpacity
      className="flex-1 h-full bg-dark dark:bg-green items-center justify-center rounded-full"
      {...props}
    >
      {props.children}
      <Text
        numberOfLines={1}
        adjustsFontSizeToFit
        style={{ fontSize: getFontScaledSize(18) }}
        className="text-center align-middle text-green font-bold uppercase dark:text-dark pl-4 pr-4"
      >
        {props.title}
      </Text>
    </TouchableOpacity>
  );
}
