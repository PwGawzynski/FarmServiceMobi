import { t } from 'i18next';
import { ScreenBase } from '../common/ScreenBase';
import { TranslationNames } from '../../../../locales/TranslationNames';

const SCREEN_NAME = t(TranslationNames.screens.authDriver.clientsDesktop.title);

export function ClientsDesktop() {
  return <ScreenBase name={SCREEN_NAME} />;
}
