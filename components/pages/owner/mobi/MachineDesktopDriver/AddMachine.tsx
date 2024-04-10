import { useMachine } from '@xstate/react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import Toast from 'react-native-toast-message';
import { t } from 'i18next';
import { ScreenBase } from '../common/ScreenBase';
import { MachinesDesktopDriverScreenProps } from '../../../../../types/self/navigation/Owner/props/machines/MachinesDesktopDriverProps';
import { AddMachineMachine } from '../../../../../helepers/StateMachines/AddMachineMachine';
import { CreateMachineReqI } from '../../../../../FarmServiceApiTypes/Machine/Requests';
import { FormCreator } from '../../../../atoms/FormCreator';
import { createMachineSetup } from '../../../../../helepers/FormSetups/CreateMachineSetup';
import { ButtonTamagui } from '../../../../atoms/ButtonTamagui';
import {
  createMachine,
  updateMachine,
} from '../../../../../api/Machine/Machine';
import { TranslationNames } from '../../../../../locales/TranslationNames';
import { MachineResponseBase } from '../../../../../FarmServiceApiTypes/Machine/Responses';
import PlusIco from '../../../../../assets/plus.svg';
import SaveIco from '../../../../../assets/check.svg';

const createDefaultValues = (machine: CreateMachineReqI | undefined) => {
  return {
    name: machine?.name || '',
    licensePlate: machine?.licensePlate || '',
  } as CreateMachineReqI;
};

const TRANSLATIONS = {
  cant_create_machine_header: t(
    TranslationNames.components.toast.cantAddMachine,
  ),
  cant_create_machine_description: t(
    TranslationNames.components.toast.cantAddMachineDescription,
  ),
  cant_edit_machine_header: t(
    TranslationNames.components.toast.cantUpdateMachine,
  ),
  cant_edit_machine_description: t(
    TranslationNames.components.toast.cantUpdateMachineDescription,
  ),
  button_create: t(
    TranslationNames.screens.machineDesktopDriver.addMachineScreen.button
      .creating,
  ),
  button_edit: t(
    TranslationNames.screens.machineDesktopDriver.addMachineScreen.button.save,
  ),
  screen_create: t(
    TranslationNames.screens.machineDesktopDriver.addMachineScreen.screenTitle,
  ),
  screen_edit: t(
    TranslationNames.screens.machineDesktopDriver.addMachineScreen
      .screenEditTitle,
  ),
};

const showErrorAddMachineToast = (error: Error | null) => {
  Toast.show({
    type: 'error',
    text1: TRANSLATIONS.cant_create_machine_header,
    text2: error?.message ?? TRANSLATIONS.cant_create_machine_description,
  });
};

const showErrorEditMachineToast = (error: Error | null) => {
  Toast.show({
    type: 'error',
    text1: TRANSLATIONS.cant_edit_machine_header,
    text2: error?.message ?? TRANSLATIONS.cant_edit_machine_description,
  });
};

export function AddMachine({
  route: { params },
  navigation,
}: MachinesDesktopDriverScreenProps<
  'addMachine',
  'machinesDesktopRoot',
  'machinesDriver',
  'ownerRootDriver'
>) {
  // MACHINE
  const [state, send] = useMachine(AddMachineMachine, {
    input: { data: params?.machine },
  });
  const resetMachine = (
    machine: MachineResponseBase | undefined = undefined,
  ) => {
    send({ type: 'reset', data: machine });
  };
  // FORM
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: createDefaultValues(state.context.machine),
  });
  // CREATE QUERY
  const queryClient = useQueryClient();
  const { mutate, isPending, isSuccess, error } = useMutation({
    mutationKey: ['createMachine'],
    mutationFn: createMachine,
    onSuccess: data =>
      queryClient.setQueryData(
        ['machines'],
        (oldData: MachineResponseBase[]) => {
          return oldData ? [data, ...oldData] : [data];
        },
      ),
  });
  // EDIT QUERY
  const {
    mutate: editMutate,
    isPending: editIsPending,
    isSuccess: editIsSuccess,
    error: editError,
  } = useMutation({
    mutationKey: ['createMachine'],
    mutationFn: updateMachine,
    onSuccess: data =>
      queryClient.setQueryData(
        ['machines'],
        (oldData: MachineResponseBase[]) => {
          return oldData
            ? [...oldData.filter(m => m.id !== params?.machine?.id), data]
            : [data];
        },
      ),
  });
  // FORM SUBMIT
  const onSubmit = (formData: CreateMachineReqI) => {
    if (state.value === 'Creating') mutate(formData);
    if (state.value === 'Edit' && params?.machine) {
      editMutate({
        ...formData,
        machine: params?.machine?.id,
      });
    }
  };

  // EDIT SETUP FORM DATA
  useEffect(() => {
    if (params?.machine) {
      send({ type: 'edit', data: params?.machine });
      reset(createDefaultValues(params?.machine));
    }
  }, [params?.machine]);

  // REACT ON QUERY STATUS
  useEffect(() => {
    if (error) {
      showErrorAddMachineToast(error);
      resetMachine();
    }
    if (editError) {
      showErrorEditMachineToast(editError);
      resetMachine();
    }
    if (isSuccess || editIsSuccess) {
      resetMachine();
      navigation.navigate('machinesDesktop');
    }
  }, [isSuccess, error, editIsSuccess, editError]);

  // CLEAR DATA - resetMachine
  useEffect(() => {
    if (state.value === 'ClearData') {
      reset({ name: '', licensePlate: '' });
      send({ type: 'done', data: undefined });
    }
  }, [state.value]);

  const BUTTON_TEXT =
    (state.value === 'Creating' && TRANSLATIONS.button_create) ||
    (state.value === 'Edit' && TRANSLATIONS.button_edit) ||
    '';
  const BUTTON_ICON = (state.value === 'Creating' && PlusIco) || SaveIco;

  const SCREEN_TITLE =
    (state.value === 'Edit' && TRANSLATIONS.screen_edit) ||
    (state.value === 'Creating' && TRANSLATIONS.screen_create) ||
    '';
  return (
    <ScreenBase name={SCREEN_TITLE}>
      <FormCreator
        controllerSetups={createMachineSetup(control)}
        errors={errors}
      />
      <ButtonTamagui
        text={BUTTON_TEXT}
        isPending={isPending || editIsPending}
        icon={<BUTTON_ICON />}
        buttonProps={{
          onPress: handleSubmit(onSubmit),
        }}
      />
    </ScreenBase>
  );
}
