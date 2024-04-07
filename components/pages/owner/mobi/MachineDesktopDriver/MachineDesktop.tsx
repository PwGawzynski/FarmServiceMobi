import { useRef } from 'react';
import { t } from 'i18next';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { ScreenBase } from '../common/ScreenBase';
import { TranslationNames } from '../../../../../locales/TranslationNames';
import { MachineList } from '../../../../organisms/MachineList';

const TRANSLATIONS = {
  screenTitle: t(
    TranslationNames.screens.machineDesktopDriver.machinesDesktop.title,
  ),
};
export function MachineDesktop() {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  return (
    <ScreenBase
      bottomSheetsProps={{
        modalRef: bottomSheetRef,
        snapPoints: ['50%', '70%'],
      }}
      name={TRANSLATIONS.screenTitle}
    >
      <MachineList bottomSheetRef={bottomSheetRef} />
    </ScreenBase>
  );
}
