import { EnumType } from './typing';

export const makeArray = (e: EnumType) =>
  Object.keys(e)
    .map(key => e[key])
    .filter(_e => typeof _e === 'string') as Array<string>;
