import { Controller, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { ActivityIndicator, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ScreenBase } from '../common/ScreenBase';
import { AppInput } from '../../../atoms/AppInput';
import { LoginUser } from '../../../../FarmServiceApiTypes/User/LoginUser';
import { AppButton } from '../../../atoms/AppButton';
import { LoginUserConstants } from '../../../../FarmServiceApiTypes/User/Constants';
import { login } from '../../../../api/services/User';
import { Colors } from '../../../../settings/styles/colors';
import { setUserAsync } from '../../../../src/redux/feature/userSlice';
import { AppDispatch } from '../../../../src/redux/app/Store';
import { TranslationNames } from '../../../../locales/TranslationNames';
import { CenteredMediumHeader } from '../../../atoms/CenteredMediumHeader';
import { TextWithLink } from '../../../atoms/TextWithLink';
import { AuthDriverProps } from '../../../../types/self/navigation/props/AuthDriverProps';

export function LoginByEmail({ navigation }: AuthDriverProps<'loginByEmail'>) {
  const { t } = useTranslation();
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
      TranslationNames.screens.authDriver.loginByEmail
        .passwordValidationRequired,
    )}`,
    EMAIL_INVALID: `${t(
      TranslationNames.screens.authDriver.loginByEmail.emailValidationInvalid,
    )}`,
    PASSWORD_PATTERN_MISMATCH: `${t(
      TranslationNames.screens.authDriver.loginByEmail
        .passwordValidationPattern,
    )}`,
  };

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

  const dispatch = useDispatch<AppDispatch>();

  const { mutate, data, isPending, error } = useMutation({ mutationFn: login });

  useEffect(() => {
    if (data && data.role) {
      // TODO redirect when user is logged
      dispatch(setUserAsync({ ...data, isLogged: true }));
    }
  }, [data]);

  const onSubmit = (formData: LoginUser) => mutate(formData);

  return (
    <ScreenBase>
      <CenteredMediumHeader>
        {t(TranslationNames.screens.authDriver.loginByEmail.header)}
      </CenteredMediumHeader>
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
            }}
          />
        )}
        name="password"
      />
      <View className="w-full h-6 mt-2 overflow-hidden flex-row justify-center items-center">
        {isPending && (
          <>
            <ActivityIndicator color={Colors.GREEN} />
            <Text className="ml-2 text-dark-gray">
              {t(
                TranslationNames.screens.authDriver.loginByEmail.pendingStatus,
              )}
            </Text>
          </>
        )}
        {error && <Text className="ml-2 text-error-red">{error.message}</Text>}
      </View>
      <TextWithLink
        text={t(
          TranslationNames.screens.authDriver.loginByEmail.forgotPassword,
        )}
        onLinkPress={() => navigation.navigate('passwordReset')}
        linkText={t(
          TranslationNames.screens.authDriver.loginByEmail.resetPassword,
        )}
      />
      <AppButton
        title={t(TranslationNames.screens.authDriver.loginByEmail.loginButton)}
        className="mt-6"
        onPress={handleSubmit(onSubmit)}
      />
    </ScreenBase>
  );
}
