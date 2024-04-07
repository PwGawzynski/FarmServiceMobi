import { t } from 'i18next';
import { ScreenBase } from '../common/ScreenBase';
import { MachinesDriverScreenProps } from '../../../../../types/self/navigation/Owner/props/machines/MachinesDriverProps';
import { EntityAsACard } from '../../../../molecules/EntityAsACard';
import { TranslationNames } from '../../../../../locales/TranslationNames';

const TRANSLATIONS = {
  screenTitle: t(
    TranslationNames.screens.machineDriver.machineDetailsScreen.screenBaseName,
  ),
  editButton: t(
    TranslationNames.screens.machineDriver.machineDetailsScreen.entityAsACard
      .topRightButtonName,
  ),
  cardName: t(
    TranslationNames.screens.machineDriver.machineDetailsScreen.entityAsACard
      .cardName,
  ),
  machineId: t(
    TranslationNames.screens.machineDriver.machineDetailsScreen.entityAsACard
      .names.id,
  ),
  machineName: t(
    TranslationNames.screens.machineDriver.machineDetailsScreen.entityAsACard
      .names.name,
  ),
  machineLicensePlate: t(
    TranslationNames.screens.machineDriver.machineDetailsScreen.entityAsACard
      .names.licensePlate,
  ),
};

export function MachineDetails({
  route: { params },
  navigation,
}: MachinesDriverScreenProps<
  'machineDetails',
  'machinesDriver',
  'ownerRootDriver'
>) {
  const { machine } = params;
  const handleEditPress = () =>
    navigation.navigate('machinesDriver', {
      screen: 'machinesDesktopRoot',
      params: {
        screen: 'addMachine',
        params: { machine },
      },
    });
  return (
    <ScreenBase name={TRANSLATIONS.screenTitle}>
      <EntityAsACard
        onTopRightBtnPress={handleEditPress}
        topRightButtonName={TRANSLATIONS.editButton}
        cardName={TRANSLATIONS.cardName}
        data={machine}
        names={{
          id: TRANSLATIONS.machineId,
          name: TRANSLATIONS.machineName,
          licensePlate: TRANSLATIONS.machineLicensePlate,
        }}
        omittedKeys={['id']}
      />
    </ScreenBase>
  );
}
