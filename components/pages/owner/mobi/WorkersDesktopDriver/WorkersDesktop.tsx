import { t } from 'i18next';
import { useRef } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useQuery } from '@tanstack/react-query';
import { ScreenBase } from '../common/ScreenBase';
import { TranslationNames } from '../../../../../locales/TranslationNames';
import { allWorkers } from '../../../../../api/worker/Worker';
import { EXPO_PUBLIC_QUERY_STALE_TIME } from '../../../../../settings/query/querySettings';
import { searchEngineNameSurnameFilter } from '../../../../../helepers/filterFunctions';
import { WorkerResponseBase } from '../../../../../FarmServiceApiTypes/Worker/Responses';
import List from '../../../../organisms/List';
import { Status } from '../../../../../FarmServiceApiTypes/Worker/Enums';

const TRANSLATIONS = {
  title: t(TranslationNames.screens.ownerRootDriver.workersDesktop.title),
  searchWorker: t(
    TranslationNames.screens.ownerRootDriver.workersDesktop.searchPlaceholder,
  ),
};

export function WorkersDesktop() {
  const modalRef = useRef<BottomSheetModal>(null);
  const { data, isFetching, isError } = useQuery({
    queryKey: ['workers'],
    queryFn: allWorkers,
    staleTime: EXPO_PUBLIC_QUERY_STALE_TIME,
    gcTime: EXPO_PUBLIC_QUERY_STALE_TIME,
  });
  return (
    <ScreenBase
      name={TRANSLATIONS.title}
      bottomSheetsProps={{
        modalRef,
      }}
    >
      <List<WorkerResponseBase>
        isFetching={isFetching}
        isError={isError}
        data={data}
        modalRef={modalRef}
        onPressNavigateTo="workerDetails"
        navigationParamName="worker"
        listStyleSettings={item => {
          return {
            header: `${item.personalData.name} ${item.personalData.surname}`,
            bottomRightText:
              item.status !== undefined ? Status[item.status] : undefined,
            alignment: 'right',
            avatarChars: [
              item.personalData.name[0],
              item.personalData.surname[0],
            ],
          };
        }}
        filterFunction={searchEngineNameSurnameFilter}
        searchEnginePlaceholder={TRANSLATIONS.searchWorker}
      />
    </ScreenBase>
  );
}
