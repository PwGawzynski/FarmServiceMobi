import AsyncStorage from '@react-native-async-storage/async-storage';
import { Theme } from '../FarmServiceApiTypes/Account/Constants';
import { DEFAULT_THEME } from '../settings/theme/themeSettings';

export async function getThemeFromStorage(): Promise<Theme | undefined> {
  const storedTheme = await AsyncStorage.getItem('theme');
  if (storedTheme) return JSON.parse(storedTheme) as Theme;
  return DEFAULT_THEME;
}

export async function setThemeToStorage(theme: Theme) {
  try {
    await AsyncStorage.setItem('theme', theme.toString());
    return true;
  } catch (e) {
    return false;
  }
}
