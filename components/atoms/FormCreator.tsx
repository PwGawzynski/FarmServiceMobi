import { Controller, DefaultValues, UseControllerProps } from 'react-hook-form';
import { FieldValues } from 'react-hook-form/dist/types';
import { TextInputProps } from 'react-native';
import { FormState } from 'react-hook-form/dist/types/form';
import { ScrollView } from 'tamagui';
import { AppInput } from './AppInput';
import { DateSelector } from '../molecules/DateSelector';
import { TextArea } from '../molecules/TextArea';

export enum InputType {
  TEXT,
  TEXT_AREA,
  SELECT,
  DATE,
}
// ToDo add SELECT type
export type FormControllerSetup<T extends FieldValues> = Array<
  UseControllerProps<T> & {
    textInputProp?: TextInputProps;
    inputType?: InputType;
    placeholderName?: string;
    inputStyle?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    valuePreprocessor?: (value: any) => any;
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
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className={`flex-1 mb-6 ${abs}`}
    >
      {controllerSetups.map(setup => (
        <Controller
          key={setup.name}
          {...setup}
          render={({
            field: { onChange, onBlur, value, name, ref, disabled },
          }) => {
            switch (setup.inputType) {
              case InputType.DATE:
                return (
                  <DateSelector
                    placeholderName={setup.placeholderName ?? name}
                    controllers={{
                      field: {
                        onChange,
                        onBlur,
                        value: setup.valuePreprocessor
                          ? setup.valuePreprocessor(value)
                          : value,
                        ref,
                        disabled,
                        name,
                      },
                    }}
                    errors={errors[setup.name]?.message as string}
                  />
                );
              case InputType.TEXT_AREA:
                return (
                  <TextArea
                    value={
                      setup.valuePreprocessor
                        ? setup.valuePreprocessor(value)
                        : value
                    }
                    error={errors[setup.name]?.message as string}
                    onBlur={onBlur}
                    disabled={disabled}
                    onChange={onChange}
                    abs={setup.inputStyle}
                    placeholderName={setup.placeholderName ?? name}
                    textInputProps={setup.textInputProp}
                  />
                );
              default:
                return (
                  <AppInput
                    abs="mt-4"
                    error={errors[setup.name]?.message as string}
                    textInputProps={{
                      autoComplete: 'email',
                      keyboardType: 'email-address',
                      ...setup.textInputProp,
                      placeholder: setup.placeholderName ?? name,
                    }}
                    controllers={{
                      field: {
                        onChange: (e: string) =>
                          onChange(
                            setup.valuePreprocessor
                              ? setup.valuePreprocessor(e)
                              : e,
                          ),
                        onBlur,
                        value:
                          typeof value === 'number' ? value.toString() : value,
                        ref,
                        disabled,
                        name,
                      },
                    }}
                  />
                );
            }
          }}
        />
      ))}
    </ScrollView>
  );
}
