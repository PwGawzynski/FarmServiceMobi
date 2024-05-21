import { useMutation } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { YStack } from 'tamagui';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';
import { ScreenBase } from '../common/ScreenBase';
import { logout } from '../../../../../api/services/User';
import {
  clearUserData,
  selectTheme,
  setTheme,
} from '../../../../../src/redux/feature/userSlice';
import { SettingOption, SettingsI } from '../../../../atoms/SettingOption';
import { Theme } from '../../../../../FarmServiceApiTypes/Account/Constants';
import { Colors } from '../../../../../settings/styles/colors';
import LogOutIco from '../../../../../assets/log-out.svg';
import ThemeIco from '../../../../../assets/sun-moon.svg';
import { TranslationNames } from '../../../../../locales/TranslationNames';
import { updateAccount } from '../../../../../api/account/Account';

const TRANSLATIONS = {
  screenTitle: t(TranslationNames.screens.appSettings.screenTitle),
  settings: {
    logout: t(TranslationNames.screens.appSettings.settings.logout),
    changeTheme: t(TranslationNames.screens.appSettings.settings.changeTheme),
    changeLanguage: t(TranslationNames.screens.appSettings.settings.changeLang),
  },
};

export function AppSettings() {
  const {
    mutate: mutateAccount,
    isPending: isAccountPending,
    isError: isAccountMutationError,
  } = useMutation({
    mutationKey: ['updateAccountSettings'],
    mutationFn: updateAccount,
  });

  const dispatch = useDispatch();
  const { mutate } = useMutation({
    mutationKey: ['logout'],
    mutationFn: logout,
    onSuccess: () => {
      dispatch(clearUserData());
    },
  });

  const theme = useSelector(selectTheme);
  const { i18n } = useTranslation();
  const { language } = i18n;

  const handleActions = (key: string) => {
    switch (key) {
      case 'logout':
        dispatch(clearUserData());
        mutate();
        break;
      case 'changeTheme':
        mutateAccount({
          theme: theme === Theme.dark ? Theme.light : Theme.dark,
        });
        dispatch(setTheme(theme === Theme.dark ? Theme.light : Theme.dark));
        break;
      case 'changeLanguage':
        i18n.changeLanguage(language === 'en' ? 'pl' : 'en');
        break;
      default:
        break;
    }
  };

  const settings = [
    {
      title: TRANSLATIONS.settings.logout,
      name: 'logout',
      Icon: (
        <LogOutIco color={theme === Theme.dark ? Colors.GREEN : Colors.DARK} />
      ),
    },
    {
      title: TRANSLATIONS.settings.changeTheme,
      name: 'changeTheme',
      Icon: (
        <ThemeIco color={theme === Theme.dark ? Colors.GREEN : Colors.DARK} />
      ),
      isPending: isAccountPending,
      isError: isAccountMutationError,
    },
  ] as Array<SettingsI>;
  return (
    <ScreenBase name={TRANSLATIONS.screenTitle}>
      <YStack f={1} mt="$4">
        {settings.map((setting: SettingsI, index: number) => (
          <SettingOption
            isPending={setting.isPending}
            isError={setting.isError}
            theme={theme}
            key={setting.name}
            title={setting.title}
            Icon={setting.Icon}
            onPress={handleActions}
            name={setting.name}
            topBorder={index === 0}
          />
        ))}
      </YStack>
    </ScreenBase>
  );
}
