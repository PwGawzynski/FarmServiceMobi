import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
// eslint-disable-next-line import/extensions
import en from './locales/en.json';
// eslint-disable-next-line import/extensions
import pl from './locales/pl.json';

const LangResources = {
  en: {
    translation: en,
  },
  pl: {
    translation: pl,
  },
};

i18next.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: 'en',
  fallbackLng: 'en',
  resources: LangResources,
});
