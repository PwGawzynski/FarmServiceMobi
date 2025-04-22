import { Input } from 'tamagui';
import { useState } from 'react';
import { ControllerRenderProps } from 'react-hook-form/dist/types/controller';
import { FieldPath, FieldValues } from 'react-hook-form/dist/types';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useSelector } from 'react-redux';
import { ValidationError } from '../atoms/ValidationError';
import { selectTheme } from '../../src/redux/feature/userSlice';
import { Theme } from '../../FarmServiceApiTypes/Account/Constants';

export type Props<
  TName extends FieldPath<TFieldValues>,
  TFieldValues extends FieldValues = FieldValues,
> = {
  errors: string;
  controllers: { field: ControllerRenderProps<TFieldValues, TName> };
  placeholderName?: string;
};

export function DateSelector<
  TName extends FieldPath<TFieldValues>,
  TFieldValues extends FieldValues = FieldValues,
>({
  errors,
  controllers: {
    field: { onBlur, onChange, value, ref, name, disabled },
  },
  placeholderName,
}: Props<TName, TFieldValues>) {
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const theme = useSelector(selectTheme);
  return (
    <>
      <Input
        mt="$4"
        editable={false}
        backgroundColor="$color5"
        borderColor="$color4"
        value={value?.toLocaleDateString()}
        placeholder={placeholderName ?? name}
        placeholderTextColor={theme === Theme.dark ? '$color11' : '$color8'}
        onPressIn={() => setDatePickerVisible(true)}
        focusStyle={{
          borderColor: '$color4',
          borderWidth: 2,
        }}
        onBlur={onBlur}
        ref={ref}
        disabled={disabled}
      />
      <DateTimePickerModal
        isDarkModeEnabled={theme === Theme.dark}
        themeVariant={theme === Theme.dark ? 'dark' : 'light'}
        isVisible={datePickerVisible}
        mode="date"
        onConfirm={date => {
          setDatePickerVisible(false);
          onChange(date);
        }}
        onCancel={() => {
          setDatePickerVisible(false);
        }}
      />
      <ValidationError addClassName="pl-2">{errors}</ValidationError>
    </>
  );
}
