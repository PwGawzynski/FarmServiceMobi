import { t } from 'i18next';
import { TranslationNames } from '../../locales/TranslationNames';

export const creteMinLenMessage = <T,>(minLen: number, key: keyof T) =>
  `${String(key)} ${t(
    TranslationNames.createCompanyForm.validation.validationAtLeast,
  )} ${minLen} ${t(
    TranslationNames.createCompanyForm.validation.validationCharacters,
  )}`;

export const creteMinMessage = <T,>(value: number, key: keyof T) =>
  `${String(key)} ${t(
    TranslationNames.createFieldForm.validation.lessThan,
  )} ${value}`;
export const creteMaxMessage = <T,>(value: number, key: keyof T) =>
  `${String(key)} ${t(
    TranslationNames.createFieldForm.validation.moreThan,
  )} ${value}`;
