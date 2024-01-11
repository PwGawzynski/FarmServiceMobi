import { ControllerRenderProps } from 'react-hook-form/dist/types/controller';
import { FieldPath, FieldValues } from 'react-hook-form/dist/types';
import { TextInput, TextInputProps, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Colors } from '../../settings/styles/colors';
import { selectTheme } from '../../src/redux/feature/userSlice';
import { Theme } from '../../FarmServiceApiTypes/Account/Constants';
import { ValidationError } from './ValidationError';

export type AppInputProps<
  TName extends FieldPath<TFieldValues>,
  TFieldValues extends FieldValues = FieldValues,
> = {
  controllers: { field: ControllerRenderProps<TFieldValues, TName> };
  abs?: string;
  error?: string;
  textInputProps?: TextInputProps;
};

export function AppInput<
  TName extends FieldPath<TFieldValues>,
  TFieldValues extends FieldValues = FieldValues,
>({
  controllers: {
    field: { onBlur, onChange, value, ref, name, disabled },
  },
  textInputProps,
  abs,
  error,
}: AppInputProps<TName, TFieldValues>) {
  const theme = useSelector(selectTheme);
  return (
    <View className={`w-full ${abs}`}>
      <TextInput
        {...textInputProps}
        className="text-dark dark:text-green text-lg pb-2 h-14 border-b-4 border-b-dark dark:border-green "
        onBlur={onBlur}
        ref={ref}
        placeholderTextColor={
          theme === Theme.dark ? Colors.DARK_GRAY : Colors.LIGHT_BLUE
        }
        placeholder={name}
        editable={disabled}
        onChangeText={onChange}
        value={value}
      />
      <ValidationError>{error}</ValidationError>
    </View>
  );
}
