import { TextArea as TA } from 'tamagui';
import {
  NativeSyntheticEvent,
  TextInputTextInputEventData,
} from 'react-native';
import { useSelector } from 'react-redux';
import { ValidationError } from '../atoms/ValidationError';
import { selectTheme } from '../../src/redux/feature/userSlice';
import { Theme } from '../../FarmServiceApiTypes/Account/Constants';

export interface TextAreaProps {
  onChange: (e: NativeSyntheticEvent<TextInputTextInputEventData>) => void;
  onBlur: () => void;
  value: string;
  placeholderName?: string;
  error: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  disabled?: boolean;
}

export function TextArea({
  onChange,
  onBlur,
  value,
  placeholderName,
  error,
  disabled,
}: TextAreaProps) {
  const theme = useSelector(selectTheme);
  return (
    <>
      <TA
        padding={10}
        className="mt-4 text-base"
        onTextInput={onChange}
        borderColor={error ? '$color7' : '$color4'}
        placeholderTextColor={theme === Theme.dark ? '$color11' : '$color9'}
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
      />
      <ValidationError>{error}</ValidationError>
    </>
  );
}
