import { t } from 'i18next';
import { useRef } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { ScreenBase } from '../common/ScreenBase';
import { TranslationNames } from '../../../../../locales/TranslationNames';
import { WorkerList } from '../../../../organisms/WorkerList';

export function WorkersDesktop() {
  const modalRef = useRef<BottomSheetModal>(null);
  return (
    <ScreenBase
      name={t(TranslationNames.screens.ownerRootDriver.workersDesktop.title)}
      bottomSheetsProps={{
        modalRef,
      }}
    >
      <WorkerList modalRef={modalRef} />
    </ScreenBase>
  );
}
