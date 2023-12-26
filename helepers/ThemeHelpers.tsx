import AsyncStorage from '@react-native-async-storage/async-storage';
import { Theme } from '../FarmServiceApiTypes/Account/Constants';

export async function getThemeFromStorage() {
  const storedTheme = await AsyncStorage.getItem('theme');
  if (storedTheme) return storedTheme;
  return undefined;
}

export async function setThemeToStorage(theme: Theme) {
  try {
    await AsyncStorage.setItem(
      'theme',
      theme === Theme.dark ? 'dark' : 'light',
    );
    return true;
  } catch (e) {
    return false;
  }
}
