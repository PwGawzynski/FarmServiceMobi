import { t } from 'i18next';
import { ScreenBase } from '../common/ScreenBase';
import { TranslationNames } from '../../../../../locales/TranslationNames';
import { WorkerList } from '../../../../organisms/WorkerList';

export function WorkersDesktop() {
  return (
    <ScreenBase
      name={t(TranslationNames.screens.ownerRootDriver.workersDesktop.title)}
    >
      <WorkerList isSelectable />
    </ScreenBase>
  );
}
