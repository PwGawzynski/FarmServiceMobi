import AsyncStorage from '@react-native-async-storage/async-storage';
import { Theme } from '../FarmServiceApiTypes/Account/Constants';

export async function getThemeFromStorage(): Promise<Theme | undefined> {
  const storedTheme = await AsyncStorage.getItem('theme');
  console.log(storedTheme, 'FFFF');
  if (storedTheme) return JSON.parse(storedTheme) as Theme;
  return undefined;
}

export async function setThemeToStorage(theme: Theme) {
  try {
    await AsyncStorage.setItem('theme', theme.toString());
    return true;
  } catch (e) {
    return false;
  }
}
