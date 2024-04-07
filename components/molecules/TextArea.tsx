import { TextArea as TA } from 'tamagui';
import { useSelector } from 'react-redux';
import { TextInputProps } from 'react-native';
import { ValidationError } from '../atoms/ValidationError';
import { selectTheme } from '../../src/redux/feature/userSlice';
import { Theme } from '../../FarmServiceApiTypes/Account/Constants';

export interface TextAreaProps {
  onChange: (e: string) => void;
  onBlur: () => void;
  value: string;
  placeholderName?: string;
  error: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  disabled?: boolean;
  textInputProps?: TextInputProps;
  abs?: string;
}

export function TextArea({
  onChange,
  onBlur,
  value,
  placeholderName,
  error,
  disabled,
  textInputProps,
  abs,
}: TextAreaProps) {
  const theme = useSelector(selectTheme);
  return (
    <>
      <TA
        padding={10}
        className={`mt-4 text-base ${abs}`}
        onChangeText={onChange}
        borderColor={error ? '$color7' : '$color4'}
        placeholderTextColor={
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (theme === Theme.dark ? '$color11' : '$color9') as any
        }
        onBlur={onBlur}
        focusStyle={{
          borderColor: error ? '$color7' : '$color4',
          borderWidth: 2,
        }}
        value={value?.toString()}
        placeholder={placeholderName}
        backgroundColor="$color6"
        height={120}
        disabled={disabled}
        {...textInputProps}
      />
      <ValidationError>{error}</ValidationError>
    </>
  );
}
