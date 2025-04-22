import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { AuthDriverProps } from '../../../../../types/self/navigation/Owner/props/AuthDriverProps';
import { ScreenBase } from '../common/ScreenBase';
import { LoginForm } from '../../../../organisms/LoginForm';
import { LoginUser } from '../../../../../FarmServiceApiTypes/User/LoginUser';
import { isMailFree } from '../../../../../api/services/User';

export function EmailAndPwdRegister({
  navigation,
}: AuthDriverProps<'emailAndPwdRegister'>) {
  const { mutate, data, isPending, error } = useMutation({
    mutationKey: ['isMailFree'],
    mutationFn: isMailFree,
    retry: false,
  });
  const [user, setUser] = useState<LoginUser | null>(null);
  const onSubmit = (d: LoginUser) => {
    if (d.email && d.password) {
      setUser(d);
      mutate(d.email);
    }
  };
  console.log(data);
  useEffect(() => {
    if (data && user) {
      navigation.navigate('chooseRole', {
        byMail: {
          ...user,
        },
      });
    }
  }, [data, user]);

  useEffect(() => {
    if (error) {
      Alert.alert('Error', error.message);
    }
  }, [error]);

  return (
    <ScreenBase titleBoxStyles="justify-center" name="Email and Password">
      <LoginForm isPending={isPending} onSubmit={onSubmit} buttonText="Next" />
    </ScreenBase>
  );
}
