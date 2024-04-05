import { useForm } from 'react-hook-form';
import { YStack } from 'tamagui';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import Toast from 'react-native-toast-message';
import { t } from 'i18next';
import { ClientResponseBase } from '../../FarmServiceApiTypes/Clients/Responses';
import { FormCreator } from '../atoms/FormCreator';
import { createOrderSetup } from '../../helepers/FormSetups/CreateOrderSetup';
import { ButtonTamagui } from '../atoms/ButtonTamagui';
import { createOrder } from '../../api/Order/Order';
import { PendingInfo } from '../atoms/PendingInfo';
import { TranslationNames } from '../../locales/TranslationNames';

export interface Props {
  client: ClientResponseBase;
  onSuccess?: () => void;
}

export interface OrderFormData {
  name: string;
  performanceDate: Date;
  additionalInfo?: string;
}

export function OrderForm({ client, onSuccess }: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<OrderFormData>();

  const { mutate, isPending, isSuccess, error } = useMutation({
    mutationKey: ['createOrder', client.id],
    mutationFn: createOrder,
  });

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
      reset();
      onSuccess?.();
    }
  }, [error, isSuccess]);

  const onSubmit = (data: OrderFormData) => {
    mutate({ ...data, client: client.id });
  };

  return (
    <YStack f={1}>
      <YStack f={1}>
        <FormCreator
          abs="flex-none"
          controllerSetups={createOrderSetup(control)}
          errors={errors}
        />
        <PendingInfo
          addClassName="mt-4 max-h-6"
          isVisible={isPending}
          infoText="Creating order"
        />
      </YStack>
      <ButtonTamagui
        text="Submit"
        buttonProps={{
          onPress: handleSubmit(onSubmit),
        }}
      />
    </YStack>
  );
}
