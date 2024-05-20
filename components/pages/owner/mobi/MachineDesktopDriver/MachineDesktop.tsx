import { useRef } from 'react';
import { t } from 'i18next';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useQuery } from '@tanstack/react-query';
import { ScreenBase } from '../common/ScreenBase';
import { TranslationNames } from '../../../../../locales/TranslationNames';
import { getAllMachines } from '../../../../../api/Machine/Machine';
import { machineFilter } from '../../../../../helepers/filterFunctions';
import List from '../../../../organisms/List';
import { MachineResponseBase } from '../../../../../FarmServiceApiTypes/Machine/Responses';

const TRANSLATIONS = {
  screenTitle: t(
    TranslationNames.screens.machineDesktopDriver.machinesDesktop.title,
  ),
  searchPlaceholder: t(
    TranslationNames.screens.machineDesktopDriver.machinesDesktop
      .searchPlaceholder,
  ),
  emptyList: t(
    TranslationNames.screens.machineDesktopDriver.machinesDesktop.emptyList,
  ),
};
export function MachineDesktop() {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ['machines'],
    queryFn: getAllMachines,
  });
  return (
    <ScreenBase
      bottomSheetsProps={{
        modalRef: bottomSheetRef,
        snapPoints: ['50%', '70%'],
      }}
      name={TRANSLATIONS.screenTitle}
    >
      <List<MachineResponseBase>
        isFetching={isFetching}
        isError={isError}
        isLoading={isLoading}
        data={data}
        swipeRightAnimation
        listEmptyText={TRANSLATIONS.emptyList}
        modalRef={bottomSheetRef}
        onPressNavigateTo="machineDetails"
        navigationParamName="machine"
        listStyleSettings={item => ({
          header: item.name,
          bottomRightText: item.licensePlate,
          alignment: 'left',
          infoIco: true,
        })}
        filterFunction={machineFilter}
        searchEnginePlaceholder={TRANSLATIONS.searchPlaceholder}
      />
    </ScreenBase>
  );
}
