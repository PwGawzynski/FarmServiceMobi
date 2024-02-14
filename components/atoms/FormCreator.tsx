import { Controller, DefaultValues, UseControllerProps } from 'react-hook-form';
import { FieldValues } from 'react-hook-form/dist/types';
import { TextInputProps } from 'react-native';
import { FormState } from 'react-hook-form/dist/types/form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AppInput } from './AppInput';

export type FormControllerSetup<T extends FieldValues> = Array<
  UseControllerProps<T> & {
    textInputProp?: TextInputProps;
  }
>;

export type FormCreatorProps<T extends FieldValues> = {
  controllerSetups: FormControllerSetup<T>;
  errors: FormState<T>['errors'];
  onSubmit?: (formData: T) => void;
  defaultValues?: DefaultValues<T>;
  abs?: string;
};

export function FormCreator<T extends FieldValues>({
  controllerSetups,
  errors,
  abs,
}: FormCreatorProps<T>) {
  console.log(controllerSetups[0].name, 'test');
  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      className={`flex-1 mb-6 ${abs}`}
    >
      {controllerSetups.map(setup => (
        <Controller
          key={setup.name}
          {...setup}
          render={({
            field: { onChange, onBlur, value, name, ref, disabled },
          }) => (
            <AppInput
              abs="mt-4"
              error={errors[setup.name]?.message as string}
              textInputProps={{
                autoComplete: 'email',
                keyboardType: 'email-address',
                placeholder: name,
                ...setup.textInputProp,
              }}
              controllers={{
                field: { onChange, onBlur, value, ref, disabled, name },
              }}
            />
          )}
        />
      ))}
    </KeyboardAwareScrollView>
  );
}
