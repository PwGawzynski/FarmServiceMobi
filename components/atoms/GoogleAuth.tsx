import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { t } from 'i18next';
import { loginByGoogle } from '../../api/services/User';
import { googleSignIn } from '../../helepers/Api/GoogleAuth';
import { AppDispatch } from '../../src/redux/app/Store';
import { roleBasedRedirection } from '../../helepers/roleBasedRedirection';
import { TranslationNames } from '../../locales/TranslationNames';
import { AuthDriverProps } from '../../types/self/navigation/Owner/props/AuthDriverProps';
import GoogleIco from '../../assets/google.svg';
import { ButtonTamagui } from './ButtonTamagui';

export function GoogleAuth({
  navigation,
}: AuthDriverProps<'chooseLoginType' | 'chooseRegisterType'>) {
  const { mutate, data, error } = useMutation({
    mutationKey: ['loginByGoogle'],
    mutationFn: loginByGoogle,
  });
  const signIn = () => googleSignIn(mutate);
  useEffect(() => {
    if (error) Alert.alert('Error', error.message);
  }, [error]);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    roleBasedRedirection(data, navigation, dispatch);
  }, [data]);
  return (
    <ButtonTamagui
      buttonProps={{
        onPress: signIn,
        mt: '$4',
      }}
      icon={<GoogleIco width={35} height={35} />}
      text={t(TranslationNames.screens.authDriver.chooseLoginType.google)}
    />
  );
}
