import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  getThemeFromStorage,
  setThemeToStorage,
} from '../helepers/ThemeHelpers';
import { setTheme } from '../src/redux/feature/userSlice';

export function UseStoredTheme() {
  const [savedTheme, setSavedTheme] = useState(0);
  const dispatch = useDispatch();

  const save = (theme: number) => {
    (async () => {
      if (await setThemeToStorage(theme)) {
        console.log(theme, 'HALOOO');
        setSavedTheme(theme);
        dispatch(setTheme(theme));
      }
    })();
  };
  useEffect(() => {
    (async () => {
      const storedTheme = await getThemeFromStorage();
      console.log(storedTheme, 'ter');
      if (storedTheme) setSavedTheme(storedTheme);
    })();
  }, []);
  return { theme: savedTheme, setTheme: save };
}
