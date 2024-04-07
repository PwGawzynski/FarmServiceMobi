import { useQuery } from '@tanstack/react-query';
import { YStack } from 'tamagui';
import { useCallback } from 'react';
import { ListRenderItemInfo } from '@shopify/flash-list';
import { t } from 'i18next';
import { ScreenBase } from '../common/ScreenBase';
import { getAllMachines } from '../../../../../api/Machine/Machine';
import { UniversalList } from '../../../../organisms/UniversalList';
import { MachineResponseBase } from '../../../../../FarmServiceApiTypes/Machine/Responses';
import MachineListItem from '../../../../molecules/MachineListItem';
import { TranslationNames } from '../../../../../locales/TranslationNames';

const TRANSLATIONS = {
  screenTitle: t(
    TranslationNames.screens.machineDesktopDriver.machinesDesktop.title,
  ),
};
export function MachineDesktop() {
  const { data } = useQuery({
    queryKey: ['machines'],
    queryFn: getAllMachines,
  });
  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<MachineResponseBase>) => {
      return <MachineListItem machine={item} />;
    },
    [],
  );
  return (
    <ScreenBase name={TRANSLATIONS.screenTitle}>
      <YStack mt="$4" f={1}>
        <UniversalList renderItem={renderItem} data={data} />
      </YStack>
    </ScreenBase>
  );
}
