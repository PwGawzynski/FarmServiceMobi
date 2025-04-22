import { EnumType } from './typing';

export const makeArray = (e: EnumType) =>
  Object.keys(e)
    .map(key => e[key])
    .filter(_e => typeof _e === 'string') as Array<string>;
export const findEnumVal = (e: EnumType, value: string) =>
  Object.keys(e)
    .filter(k => Number.isNaN(Number(k)))
    .findIndex(key => key.toLowerCase() === value.toLowerCase());
