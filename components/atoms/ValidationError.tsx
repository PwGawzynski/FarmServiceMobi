import { Text } from 'react-native';

export type InputLabelProps = {
  children: React.ReactNode;
  addClassName?: string;
};

export function ValidationError({ children, addClassName }: InputLabelProps) {
  return (
    <Text className={`text-error-red text-sm ${addClassName} `}>
      {children}
    </Text>
  );
}
