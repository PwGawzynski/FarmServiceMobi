import { useEffect, useState } from 'react';
import { getThemeFromStorage } from '../helepers/ThemeHelpers';

export function UseTheme() {
  const [theme, setTheme] = useState('light');
  useEffect(() => {
    (async () => {
      const storedTheme = await getThemeFromStorage();
      console.log(storedTheme, 'ter');
      if (storedTheme) setTheme(storedTheme);
    })();
  }, []);
  return theme;
}
