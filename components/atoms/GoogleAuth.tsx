import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
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
import { DefaultQueryErrorHandler } from '../../helepers/Api/DefaultQueryErrorHandler';

export function GoogleAuth({
  navigation,
}: AuthDriverProps<'chooseLoginType' | 'chooseRegisterType'>) {
  const { mutate, data } = useMutation({
    mutationKey: ['loginByGoogle'],
    mutationFn: loginByGoogle,
    onError: DefaultQueryErrorHandler,
  });
  const signIn = () => googleSignIn(mutate);
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
