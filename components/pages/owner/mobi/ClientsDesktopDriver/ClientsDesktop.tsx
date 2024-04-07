import { t } from 'i18next';
import { ScreenBase } from '../common/ScreenBase';
import { TranslationNames } from '../../../../../locales/TranslationNames';
import { ClientList } from '../../../../organisms/ClientList';

const SCREEN_NAME = t(
  TranslationNames.screens.clientDesktopDriver.clientsDesktop.title,
);
const LIST_EMPTY_TEXT = t(
  TranslationNames.screens.clientDesktopDriver.clientsDesktop.emptyList,
);

export function ClientsDesktop() {
  return (
    <ScreenBase name={SCREEN_NAME}>
      <ClientList
        listEmptyText={LIST_EMPTY_TEXT}
        defaultBehavior
        swipeRightAnimation
      />
    </ScreenBase>
  );
}
