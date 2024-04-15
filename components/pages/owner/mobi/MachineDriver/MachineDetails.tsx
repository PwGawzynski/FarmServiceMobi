import { t } from 'i18next';
import { YStack } from 'tamagui';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { ScreenBase } from '../common/ScreenBase';
import { MachinesDriverScreenProps } from '../../../../../types/self/navigation/Owner/props/machines/MachinesDriverProps';
import { EntityAsACard } from '../../../../molecules/EntityAsACard';
import { TranslationNames } from '../../../../../locales/TranslationNames';
import { ButtonTamagui } from '../../../../atoms/ButtonTamagui';
import { Colors } from '../../../../../settings/styles/colors';
import { safelyDeleteMachine } from '../../../../../api/Machine/Machine';
import DangerIco from '../../../../../assets/danger.svg';
import { MachineResponseBase } from '../../../../../FarmServiceApiTypes/Machine/Responses';
import { showErrorToast } from '../../../../../helepers/ToastSetup';

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
  deleteButton: t(
    TranslationNames.screens.machineDriver.machineDetailsScreen.deleteButton,
  ),
  cantDeleteMachineHeader: t(
    TranslationNames.components.toast.cantDeleteMachine,
  ),
  cantDeleteMachineDescription: t(
    TranslationNames.components.toast.cantDeleteMachineDescription,
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

  const queryClient = useQueryClient();
  const { mutate, isError, isPending, error } = useMutation({
    mutationKey: ['machine', machine.id],
    mutationFn: safelyDeleteMachine,
    onSuccess: () => {
      queryClient.setQueryData(['machines'], (old: MachineResponseBase[]) =>
        old.filter((m: MachineResponseBase) => m.id !== machine.id),
      );
      navigation.navigate('machinesDriver', {
        screen: 'machinesDesktopRoot',
        params: { screen: 'machinesDesktop' },
      });
    },
  });

  useEffect(() => {
    if (isError)
      showErrorToast(
        error,
        TRANSLATIONS.cantDeleteMachineHeader,
        TRANSLATIONS.cantDeleteMachineDescription,
      );
  }, [isError]);

  const handleEditPress = () =>
    navigation.navigate('machinesDriver', {
      screen: 'machinesDesktopRoot',
      params: {
        screen: 'addMachine',
        params: { machine },
      },
    });
  const handleDeletePress = () =>
    mutate({
      machine: machine.id,
      name: machine.name,
      licensePlate: machine.licensePlate,
    });

  return (
    <ScreenBase name={TRANSLATIONS.screenTitle}>
      <YStack f={1}>
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
      </YStack>
      <ButtonTamagui
        icon={<DangerIco />}
        bgColor={Colors.ERROR_RED}
        text="Safely delete"
        isPending={isPending}
        buttonProps={{
          onPress: handleDeletePress,
          disabled: isPending,
        }}
      />
    </ScreenBase>
  );
}
