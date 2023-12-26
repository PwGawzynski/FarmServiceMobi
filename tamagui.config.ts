import { config } from '@tamagui/config/v2-reanimated';
import { createTamagui } from 'tamagui';
import { createInterFont } from '@tamagui/font-inter';
import { createMedia } from '@tamagui/react-native-media-driver';

// eslint-disable-next-line camelcase
const dark_palette = [
  'hsl(64, 63%, 66%)',
  'hsl(68, 49%, 62%)',
  'hsl(74, 38%, 58%)',
  'hsl(81, 28%, 55%)',

  'hsl(210, 77%, 9%)',
  'hsla(0,0%,100%,0)',

  'hsl(64, 63%, 66%)',
  'hsl(68, 49%, 62%)',
  'hsl(74, 38%, 58%)',
  'hsl(81, 28%, 55%)',

  'hsl(216, 77%, 14%)',
  'hsl(213, 78%, 15%)',
  'hsl(210, 79%, 15%)',
  'hsl(208, 80%, 16%)',

  'hsla(0,0%,0%,0)',
  'hsl(180,10%,27%)',

  'hsl(216, 77%, 14%)',
  'hsl(213, 78%, 15%)',
  'hsl(210, 79%, 15%)',
  'hsl(208, 80%, 16%)',
];

// eslint-disable-next-line camelcase
const light_palette = [
  'hsl(216,75%,8%)',
  'hsl(213, 78%, 15%)',
  'hsl(210, 79%, 15%)',
  'hsl(208, 80%, 16%)',

  'hsl(210, 77%, 9%)',
  'hsla(0,0%,100%,0)',

  'hsl(216, 77%, 14%)',
  'hsl(213, 78%, 15%)',
  'hsl(210, 79%, 15%)',
  'hsl(208, 80%, 16%)',

  'hsl(64, 63%, 66%)',
  'hsl(68, 49%, 62%)',
  'hsl(74, 38%, 58%)',
  'hsl(81, 28%, 55%)',

  'hsla(0,0%,99%,0)',
  'hsl(214, 81%, 10%)',

  'hsl(64, 63%, 66%)',
  'hsl(68, 49%, 62%)',
  'hsl(74, 38%, 58%)',
  'hsl(81, 28%, 55%)',
];

const createTheme = (palete: string[]) => ({
  background: palete[0],
  backgroundFocus: palete[1],
  backgroundHover: palete[2],
  backgroundPress: palete[3],
  backgroundStrong: palete[4],
  backgroundTransparent: palete[5],
  borderColor: palete[6],
  borderColorFocus: palete[7],
  borderColorHover: palete[8],
  borderColorPress: palete[9],
  color: palete[10],
  colorFocus: palete[11],
  colorHover: palete[12],
  colorPress: palete[13],
  colorTransparent: palete[14],
  placeholderColor: palete[15],
  shadowColor: palete[16],
  shadowColorFocus: palete[17],
  shadowColorHover: palete[18],
  shadowColorPress: palete[19],
});

// eslint-disable-next-line camelcase
const dark_theme = createTheme(dark_palette);
// eslint-disable-next-line camelcase
const light_theme = createTheme(light_palette);

const headingFont = createInterFont({
  family:
    'Inter, InterItalic, InterSemiBold, InterSemiBoldItalic, InterBold, InterBoldItalic, InterExtraBold, InterExtraBoldItalic',
  weight: {
    5: '500',
    6: '600',
    7: '700',
    8: '800',
    9: '900',
  },
  size: {
    1: 11,
    2: 12,
    3: 13,
    4: 14,
    true: 14,
    5: 16,
    6: 18,
    7: 20,
    8: 23,
    9: 30,
    10: 46,
    11: 55,
    12: 62,
    13: 72,
    14: 92,
    15: 114,
    16: 134,
  },
  face: {
    500: { normal: 'Inter', italic: 'InterItalic' },
    700: { normal: 'InterSemiBold', italic: 'InterSemiBoldItalic' },
    800: { normal: 'InterBold', italic: 'InterBoldItalic' },
    900: { normal: 'InterExtraBold', italic: 'InterExtraBoldItalic' },
  },
});
const bodyFont = createInterFont({
  weight: {
    5: '500',
    7: '700',
    8: '800',
    9: '900',
  },
  face: {
    500: { normal: 'Inter', italic: 'InterItalic' },
    700: { normal: 'InterSemiBold', italic: 'InterSemiBoldItalic' },
    800: { normal: 'InterBold', italic: 'InterBoldItalic' },
    900: { normal: 'InterExtraBold', italic: 'InterExtraBoldItalic' },
  },
});

const tamaguiConfig = createTamagui({
  ...config,
  fonts: {
    heading: headingFont,
    body: bodyFont,
  },
  themes: {
    // eslint-disable-next-line camelcase
    dark: dark_theme,
    // eslint-disable-next-line camelcase
    light: light_theme,
    dark_ScreenCard: {
      bg: 'hsl(216,75%,8%)',
    },
    light_ScreenCard: {
      bg: 'hsl(0,0%,100%)',
    },
    light_AppText: {
      color: 'hsl(216,75%,8%)',
    },
    dark_AppText: {
      color: 'hsl(64, 63%, 66%)',
    },
    light_Input: {
      background: 'hsla(0,0%,100%,0)',
      color: 'hsl(216,75%,8%)',
    },
    dark_Input: {
      background: 'hsla(0,0%,100%,0)',
      color: 'hsl(64, 63%, 66%)',
    },
  },
  media: createMedia({
    xs: { maxWidth: 660 },
    sm: { maxWidth: 800 },
    md: { maxWidth: 1020 },
    lg: { maxWidth: 1280 },
    xl: { maxWidth: 1420 },
    xxl: { maxWidth: 1600 },
    gtXs: { minWidth: 660 + 1 },
    gtSm: { minWidth: 800 + 1 },
    gtMd: { minWidth: 1020 + 1 },
    gtLg: { minWidth: 1280 + 1 },
    short: { maxHeight: 820 },
    tall: { minHeight: 820 },
    hoverNone: { hover: 'none' },
    pointerCoarse: { pointer: 'coarse' },
  }),
});

// this makes typescript properly type everything based on the config
type Conf = typeof tamaguiConfig;
declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}

export default tamaguiConfig;
