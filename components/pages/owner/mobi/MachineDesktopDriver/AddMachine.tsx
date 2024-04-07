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
import { createMachine } from '../../../../../api/Machine/Machine';
import { TranslationNames } from '../../../../../locales/TranslationNames';
import { MachineResponseBase } from '../../../../../FarmServiceApiTypes/Machine/Responses';

const createDefaultValues = (machine: CreateMachineReqI | undefined) =>
  ({
    name: machine?.name || '',
    licensePlate: machine?.licensePlate || '',
  }) as CreateMachineReqI;

export function AddMachine({
  route: { params },
  navigation,
}: MachinesDesktopDriverScreenProps<
  'addMachine',
  'machinesDesktopRoot',
  'machinesDriver',
  'ownerRootDriver'
>) {
  const [state, send] = useMachine(AddMachineMachine, {
    input: { data: params?.machine },
  });
  const resetMachine = () => send({ type: 'reset', data: undefined });

  const {
    control,
    handleSubmit,
    formState: { errors },
    resetField,
    reset,
  } = useForm({
    defaultValues: createDefaultValues(state.context.machine),
  });

  const queryClient = useQueryClient();
  const { mutate, isPending, isSuccess, error } = useMutation({
    mutationKey: ['createMachine'],
    mutationFn: createMachine,
    onSuccess: data =>
      queryClient.setQueryData(
        ['machines'],
        (oldData: MachineResponseBase[]) => {
          return oldData ? [...oldData, data] : [data];
        },
      ),
  });
  const onSubmit = (formData: CreateMachineReqI) => {
    if (state.value === 'Creating') mutate(formData);
  };

  useEffect(() => {
    if (error) {
      Toast.show({
        type: 'error',
        text1: t(TranslationNames.components.toast.cantCreateOrderHeader),
        text2:
          error.message ??
          t(TranslationNames.components.toast.cantCreateOrderDescription),
      });
      reset();
    }
    if (isSuccess) {
      navigation.navigate('machinesDesktop');
      resetMachine();
    }
  }, [isSuccess, error]);

  useEffect(() => {
    if (state.value === 'ClearData') {
      resetField('name');
      resetField('licensePlate');
    }
  }, [state.value]);

  return (
    <ScreenBase name="add machine">
      <FormCreator
        controllerSetups={createMachineSetup(control)}
        errors={errors}
      />
      <ButtonTamagui
        text="Submit"
        isPending={isPending}
        buttonProps={{
          onPress: handleSubmit(onSubmit),
        }}
      />
    </ScreenBase>
  );
}
