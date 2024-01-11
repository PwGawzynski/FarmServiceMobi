import { Text } from 'react-native';

export type InputLabelProps = {
  children: React.ReactNode;
};

export function ValidationError({ children }: InputLabelProps) {
  return <Text className="text-error-red text-sm">{children}</Text>;
}
