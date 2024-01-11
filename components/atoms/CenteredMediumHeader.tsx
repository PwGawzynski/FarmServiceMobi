import { ReactNode } from 'react';
import { Text, TextProps } from 'react-native';

export function CenteredMediumHeader({
  children,
}: {
  children: ReactNode;
} & TextProps) {
  return (
    <Text className="text-center text-dark dark:text-green text-2xl font-semibold">
      {children}
    </Text>
  );
}
