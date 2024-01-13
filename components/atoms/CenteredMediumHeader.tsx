import { ReactNode } from 'react';
import { Text, TextProps } from 'react-native';

export type Props = {
  children: ReactNode;
  textProps?: TextProps;
};

export function CenteredMediumHeader({ children, textProps }: Props) {
  return (
    <Text
      {...textProps}
      className={`text-center text-dark dark:text-green text-2xl font-semibold ${textProps?.className}`}
    >
      {children}
    </Text>
  );
}
