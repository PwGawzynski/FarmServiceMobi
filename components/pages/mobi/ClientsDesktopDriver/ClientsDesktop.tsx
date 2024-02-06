import { t } from 'i18next';
import { useQuery } from '@tanstack/react-query';
import { YStack } from 'tamagui';
import { useState } from 'react';
import { ScreenBase } from '../common/ScreenBase';
import { TranslationNames } from '../../../../locales/TranslationNames';
import { getClients } from '../../../../api/clients/Client';
import { ClientList } from '../../../organisms/ClientsList';
import { SearchBox } from '../../../molecules/SearchBox';

const SCREEN_NAME = t(TranslationNames.screens.authDriver.clientsDesktop.title);

export function ClientsDesktop() {
  const { data } = useQuery({
    queryKey: ['clients'],
    queryFn: getClients,
  });
  const [filter, setFilter] = useState<string | undefined>(undefined);

  const sorted = data
    ?.filter(client =>
      filter
        ? (
            client.user.personal_data.name.trim() +
            client.user.personal_data.surname.trim()
          )
            .toLowerCase()
            .includes(filter.toLowerCase().replace(' ', ''))
        : true,
    )
    .sort((a, b) =>
      a.user.personal_data.surname.toLowerCase() >
      b.user.personal_data.surname.toLowerCase()
        ? 1
        : -1,
    );
  return (
    <ScreenBase name={SCREEN_NAME}>
      <YStack mt="$4" mb="$4">
        <SearchBox
          onTextChange={text => setFilter(text)}
          placeholder={t(
            TranslationNames.screens.authDriver.clientsDesktop.searchClient,
          )}
        />
      </YStack>
      <YStack f={1}>
        <ClientList data={sorted} />
      </YStack>
    </ScreenBase>
  );
}
