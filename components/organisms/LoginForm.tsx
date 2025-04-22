import { Controller, useForm } from 'react-hook-form';
import { t } from 'i18next';
import { View } from 'react-native';
import { LoginUserConstants } from '../../FarmServiceApiTypes/User/Constants';
import { AppInput } from '../atoms/AppInput';
import { TranslationNames } from '../../locales/TranslationNames';
import { LoginUser } from '../../FarmServiceApiTypes/User/LoginUser';
import { PendingInfo } from '../atoms/PendingInfo';
import { FormErrorInfo } from '../atoms/FormErrorInfo';
import { ButtonTamagui } from '../atoms/ButtonTamagui';

const VALIDATION = {
  EMAIL_MIN_LEN: `${t(
    TranslationNames.screens.authDriver.loginByEmail.emailValidationMinLength,
  )} ${LoginUserConstants.EMAIL_MIN_LEN} ${t(
    TranslationNames.screens.authDriver.loginByEmail.charComplement,
  )}`,
  EMAIL_MAX_LEN: `${t(
    TranslationNames.screens.authDriver.loginByEmail.emailValidationMaxLength,
  )} ${LoginUserConstants.EMAIL_MAX_LEN} ${t(
    TranslationNames.screens.authDriver.loginByEmail.charComplement,
  )}`,
  PASSWORD_MIN_LEN: `${t(
    TranslationNames.screens.authDriver.loginByEmail
      .passwordValidationMinLength,
  )} ${LoginUserConstants.PASSWORD_MIN_LEN} ${t(
    TranslationNames.screens.authDriver.loginByEmail.charComplement,
  )}`,
  PASSWORD_MAX_LEN: `${t(
    TranslationNames.screens.authDriver.loginByEmail
      .passwordValidationMaxLength,
  )} ${LoginUserConstants.PASSWORD_MAX_LEN} ${t(
    TranslationNames.screens.authDriver.loginByEmail.charComplement,
  )}`,
  EMAIL_REQUIRED: `${t(
    TranslationNames.screens.authDriver.loginByEmail.emailValidationRequired,
  )}`,
  PASSWORD_REQUIRED: `${t(
    TranslationNames.screens.authDriver.loginByEmail.passwordValidationRequired,
  )}`,
  EMAIL_INVALID: `${t(
    TranslationNames.screens.authDriver.loginByEmail.emailValidationInvalid,
  )}`,
  PASSWORD_PATTERN_MISMATCH: `${t(
    TranslationNames.screens.authDriver.loginByEmail.passwordValidationPattern,
  )}`,
};

export interface LoginFormProps {
  onSubmit: (data: LoginUser) => void;
  error?: Error | null;
  isPending?: boolean;
  buttonText?: string;
}

export function LoginForm({
  onSubmit,
  isPending,
  error,
  buttonText,
}: LoginFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUser>({
    defaultValues: {
      email: '',
      password: '',
    } as LoginUser,
  });

  return (
    <>
      <Controller
        control={control}
        rules={{
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: VALIDATION.EMAIL_INVALID,
          },
          minLength: {
            value: LoginUserConstants.EMAIL_MIN_LEN,
            message: VALIDATION.EMAIL_MIN_LEN,
          },
          maxLength: {
            value: LoginUserConstants.EMAIL_MAX_LEN,
            message: VALIDATION.EMAIL_MAX_LEN,
          },
          required: { value: true, message: VALIDATION.EMAIL_REQUIRED },
        }}
        render={({
          field: { onChange, onBlur, value, name, ref, disabled },
        }) => (
          <AppInput
            abs="mt-4"
            error={errors.email?.message}
            textInputProps={{
              autoComplete: 'email',
              keyboardType: 'email-address',
              placeholder: t(
                TranslationNames.screens.authDriver.loginByEmail
                  .emailPlaceholder,
              ),
            }}
            controllers={{
              field: { onChange, onBlur, value, ref, disabled, name },
            }}
          />
        )}
        name="email"
      />
      <Controller
        control={control}
        rules={{
          pattern: {
            value:
              /^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[a-zA-Z0-9!@#$%^&*()_+]{8,}$/,
            message: VALIDATION.PASSWORD_PATTERN_MISMATCH,
          },
          minLength: {
            value: LoginUserConstants.PASSWORD_MIN_LEN,
            message: VALIDATION.PASSWORD_MIN_LEN,
          },
          maxLength: {
            value: LoginUserConstants.PASSWORD_MAX_LEN,
            message: VALIDATION.PASSWORD_MAX_LEN,
          },
          required: { value: true, message: VALIDATION.PASSWORD_REQUIRED },
        }}
        render={({
          field: { onChange, onBlur, value, name, ref, disabled },
        }) => (
          <AppInput
            error={errors.password?.message}
            abs="mt-4"
            controllers={{
              field: { onChange, onBlur, value, ref, disabled, name },
            }}
            textInputProps={{
              secureTextEntry: true,
              autoComplete: 'current-password',
              textContentType: 'password',
              placeholder: t(
                TranslationNames.screens.authDriver.loginByEmail
                  .passwordPlaceholder,
              ),
            }}
          />
        )}
        name="password"
      />
      <View className="w-full h-6 mt-2 overflow-hidden flex-row justify-center items-center">
        <PendingInfo
          isVisible={!!isPending}
          infoText={t(
            TranslationNames.screens.authDriver.loginByEmail.pendingStatus,
          )}
        />
        {error && <FormErrorInfo error={error.message} />}
      </View>

      <ButtonTamagui
        text={
          buttonText ||
          t(TranslationNames.screens.authDriver.loginByEmail.loginButton)
        }
        buttonProps={{
          mt: '$4',
          onPress: handleSubmit(onSubmit),
        }}
      />
    </>
  );
}
