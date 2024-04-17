import { t } from 'i18next';
import { useQuery } from '@tanstack/react-query';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useRef } from 'react';
import { ScreenBase } from '../common/ScreenBase';
import { TranslationNames } from '../../../../../locales/TranslationNames';
import { getClients } from '../../../../../api/clients/Client';
import { EXPO_PUBLIC_QUERY_STALE_TIME } from '../../../../../settings/query/querySettings';
import { clientListFilter } from '../../../../../helepers/filterFunctions';
import List from '../../../../organisms/List';
import { ClientResponseBase } from '../../../../../FarmServiceApiTypes/Clients/Responses';

const SCREEN_NAME = t(
  TranslationNames.screens.clientDesktopDriver.clientsDesktop.title,
);
const LIST_EMPTY_TEXT = t(
  TranslationNames.screens.clientDesktopDriver.clientsDesktop.emptyList,
);

const LIST_SEARCH_PLACEHOLDER = t(
  TranslationNames.screens.clientDesktopDriver.clientsDesktop.searchClient,
);

export function ClientsDesktop() {
  const modalRef = useRef<BottomSheetModal>(null);
  const { data, isFetching, isError } = useQuery({
    queryKey: ['clients'],
    queryFn: getClients,
    staleTime: EXPO_PUBLIC_QUERY_STALE_TIME,
    gcTime: EXPO_PUBLIC_QUERY_STALE_TIME,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  return (
    <ScreenBase
      bottomSheetsProps={{
        modalRef,
        snapPoints: ['50%', '70%'],
      }}
      name={SCREEN_NAME}
    >
      <List<ClientResponseBase>
        isFetching={isFetching}
        isError={isError}
        data={data}
        modalRef={modalRef}
        onPressNavigateTo="clientControlPanel"
        navigationParamName="client"
        listStyleSettings={item => ({
          header: `${item.user.personal_data.name} ${item.user.personal_data.surname}`,
          bottomRightText: item.user.address.city,
          alignment: 'right',
          avatarChars: [
            item.user.personal_data.name[0],
            item.user.personal_data.surname[0],
          ],
        })}
        filterFunction={clientListFilter}
        listEmptyText={LIST_EMPTY_TEXT}
        searchEnginePlaceholder={LIST_SEARCH_PLACEHOLDER}
      />
    </ScreenBase>
  );
}
