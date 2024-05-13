import { createTokens } from 'tamagui';
import { Colors } from '../settings/styles/colors';

const size = {
  0: 0,
  0.25: 2,
  0.5: 4,
  0.75: 8,
  1: 20,
  1.5: 24,
  2: 28,
  2.5: 32,
  3: 36,
  3.5: 40,
  4: 44,
  true: 44,
  4.5: 48,
  5: 52,
  5.5: 59,
  6: 64,
  6.5: 69,
  7: 74,
  7.6: 79,
  8: 84,
  8.5: 89,
  9: 94,
  9.5: 99,
  10: 104,
  11: 124,
  12: 144,
  13: 164,
  14: 184,
  15: 204,
  16: 224,
  17: 224,
  18: 244,
  19: 264,
  20: 284,
};

const spaces = Object.entries(size).map(
  ([k, v]) =>
    [
      k,
      Math.max(0, v <= 16 ? Math.round(v * 0.333) : Math.floor(v * 0.7 - 12)),
    ] as const,
);

const spacesNegative = spaces.slice(1).map(([k, v]) => [`-${k}`, -v]);

const space = {
  ...Object.fromEntries(spaces),
  ...Object.fromEntries(spacesNegative),
} as never;

const zIndex = {
  0: 0,
  1: 100,
  2: 200,
  3: 300,
  4: 400,
  5: 500,
};

const radius = {
  0: 0,
  1: 3,
  2: 5,
  3: 7,
  4: 9,
  true: 9,
  5: 10,
  6: 16,
  7: 19,
  8: 22,
  9: 26,
  10: 34,
  11: 42,
  12: 50,
};

const color = {
  darkTransparent: 'rgba(10,10,10,0)',

  dark1: '#050505',
  // background
  dark2: '#121212',
  dark3: '#191919',
  // bgPressed -> button default
  dark4: '#d7df71',
  // borderColorHover -> button border
  dark5: '#d7df71',
  // button Pressed
  dark6: '#121212',
  dark7: '#c51a1a',
  dark8: '#494949',
  // button text
  dark9: '#081e3f',
  dark10: '#7119ee',
  // color -> for button this is bg
  dark11: '#939292',
  // input text color
  dark12: '#081e3f',

  lightTransparent: 'rgba(255,255,255,0)',

  light1: '#fff',
  // background
  light2: '#fff',
  light3: 'hsl(0,0%,0%)',
  light4: Colors.GREEN,
  light5: 'hsl(0, 0%, 94.0%)',
  light6: 'hsl(0, 0%, 92.0%)',
  light7: 'hsl(0, 0%, 89.5%)',
  light8: 'hsl(0, 0%, 81.0%)',
  light9: 'hsl(0,0%,100%)',
  light10: 'hsl(0, 0%, 50.3%)',
  // color
  light11: Colors.DARK,
  light12: 'hsl(0, 0%, 9.0%)',
};

export const tokens = createTokens({
  color,
  space,
  size,
  radius,
  zIndex,
});
