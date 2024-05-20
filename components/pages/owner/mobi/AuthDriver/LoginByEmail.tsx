import { useMutation } from '@tanstack/react-query';
import { Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { YStack } from 'tamagui';
import { ScreenBase } from '../common/ScreenBase';
import { TranslationNames } from '../../../../../locales/TranslationNames';
import { AuthDriverProps } from '../../../../../types/self/navigation/Owner/props/AuthDriverProps';
import { setUserAsync } from '../../../../../src/redux/feature/userSlice';
import { login } from '../../../../../api/services/User';
import { AppDispatch } from '../../../../../src/redux/app/Store';
import { LoginUser } from '../../../../../FarmServiceApiTypes/User/LoginUser';
import { CenteredMediumHeader } from '../../../../atoms/CenteredMediumHeader';
import { TextWithLink } from '../../../../atoms/TextWithLink';
import { UserRole } from '../../../../../FarmServiceApiTypes/User/Enums';
import { LoginForm } from '../../../../organisms/LoginForm';

export function LoginByEmail({ navigation }: AuthDriverProps<'loginByEmail'>) {
  const { t } = useTranslation();

  const dispatch = useDispatch<AppDispatch>();

  const { mutate, data, isPending } = useMutation({
    mutationFn: login,
    onError: error1 => Alert.alert('Error', error1.message),
  });

  useEffect(() => {
    if (data && data.role !== undefined) {
      // TODO add clientRole case
      if (data) dispatch(setUserAsync(data));

      if (data.role === UserRole.Owner)
        navigation.navigate('ownerRootDriver', {
          screen: 'activityDriver',
          params: {
            screen: 'activityDesktopRoot',
            params: {
              screen: 'lastActivities',
            },
          },
        });
      else if (data.role === UserRole.Worker) {
        navigation.navigate('workerRootDriver', {
          screen: 'workerAssignationScreen',
        });
      }
    }
  }, [data]);

  const onSubmit = (formData: LoginUser) => mutate(formData);

  return (
    <ScreenBase>
      <CenteredMediumHeader>
        {t(TranslationNames.screens.authDriver.loginByEmail.header)}
      </CenteredMediumHeader>
      <LoginForm onSubmit={onSubmit} isPending={isPending} />
      <YStack f={1} jc="flex-end">
        <TextWithLink
          text={t(
            TranslationNames.screens.authDriver.loginByEmail.forgotPassword,
          )}
          onLinkPress={() => navigation.navigate('passwordReset')}
          linkText={t(
            TranslationNames.screens.authDriver.loginByEmail.resetPassword,
          )}
        />
      </YStack>
    </ScreenBase>
  );
}
