import { Theme } from '../../FarmServiceApiTypes/Account/Constants';

export const DEFAULT_THEME =
  (Number.isNaN(Number(process.env.DEFAULT_THEME)) &&
    Number(process.env.DEFAULT_THEME)) ||
  Theme.light;
