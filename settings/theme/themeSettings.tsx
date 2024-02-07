if (Number.isNaN(Number(process.env.EXPO_PUBLIC_DEFAULT_THEME))) {
  console.error(
    'Error: EXPO_PUBLIC_DEFAULT_THEME is not a number is: ',
    process.env.EXPO_PUBLIC_DEFAULT_THEME,
  );
}
export const DEFAULT_THEME = Number(process.env.EXPO_PUBLIC_DEFAULT_THEME);
