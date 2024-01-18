import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { ScreenBase } from '../common/ScreenBase';
import { TranslationNames } from '../../../../locales/TranslationNames';
import { CenteredMediumHeader } from '../../../atoms/CenteredMediumHeader';
import { AppInput } from '../../../atoms/AppInput';
import { LoginUser } from '../../../../FarmServiceApiTypes/User/LoginUser';
import { AppButton } from '../../../atoms/AppButton';
import { resetPwd } from '../../../../api/services/User';
import { PendingInfo } from '../../../atoms/PendingInfo';
import { FormErrorInfo } from '../../../atoms/FormErrorInfo';
import { ResponseCode } from '../../../../FarmServiceApiTypes/Respnse/responseGeneric';
import { AuthDriverProps } from '../../../../types/self/navigation/props/AuthDriverProps';
import { LoginUserConstants } from '../../../../FarmServiceApiTypes/User/Constants';

type FormData = Pick<LoginUser, 'email'>;

export function PasswordReset({
  navigation,
}: AuthDriverProps<'passwordReset'>) {
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
    EMAIL_REQUIRED: `${t(
      TranslationNames.screens.authDriver.loginByEmail.emailValidationRequired,
    )}`,
    EMAIL_INVALID: `${t(
      TranslationNames.screens.authDriver.loginByEmail.emailValidationInvalid,
    )}`,
  };

  const { mutate, data, isPending, error } = useMutation({
    mutationFn: resetPwd,
  });

  useEffect(() => {
    if (data?.code === ResponseCode.ProcessedCorrect)
      navigation.navigate('OperationConfirmed', {
        shownMessage: t(
          TranslationNames.screens.authDriver.passwordReset.afterSuccess,
        ),
        redirectScreenName: 'loginByEmail',
      });
  }, [data]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUser>({
    defaultValues: {
      email: '',
    } as FormData,
  });
  const onSubmit = (formData: FormData) => mutate(formData);
  return (
    <ScreenBase>
      <CenteredMediumHeader textProps={{ className: 'mb-12' }}>
        {t(TranslationNames.screens.authDriver.passwordReset.header)}
      </CenteredMediumHeader>
      <Text className="text-center text-dark dark:text-green text-base font-medium mb-12">
        {t(TranslationNames.screens.authDriver.passwordReset.instruction)}
      </Text>
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
      <View className="h-6 w-full items-center justify-center">
        <PendingInfo
          isVisible={isPending}
          infoText={t(
            TranslationNames.screens.authDriver.passwordReset.pendingStatus,
          )}
        />
      </View>
      <View className="h-6 w-full items-center justify-center">
        {error && <FormErrorInfo error={error.message} />}
      </View>
      <AppButton
        title={t(TranslationNames.screens.authDriver.passwordReset.button)}
        className="mt-2 max-h-12"
        onPress={handleSubmit(onSubmit)}
      />
    </ScreenBase>
  );
}
