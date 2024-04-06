import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { YStack } from 'tamagui';
import { useEffect } from 'react';
import Toast from 'react-native-toast-message';
import { t } from 'i18next';
import { ScreenBase } from '../common/ScreenBase';
import { UpdateOrder } from '../../../../../FarmServiceApiTypes/Order/Requests';
import { OrdersDriverScreenProps } from '../../../../../types/self/navigation/Owner/props/orders/OrdersDriverProps';
import { OrderResponseBase } from '../../../../../FarmServiceApiTypes/Order/Ressponses';
import { FormCreator } from '../../../../atoms/FormCreator';
import { createUpdateOrderSetup } from '../../../../../helepers/FormSetups/CreateOrderSetup';
import { updateOrder } from '../../../../../api/Order/Order';
import { ButtonTamagui } from '../../../../atoms/ButtonTamagui';
import { TranslationNames } from '../../../../../locales/TranslationNames';

function prepareDefaultValues(order: OrderResponseBase) {
  return {
    name: order.name,
    performanceDate: new Date(order.performanceDate),
    additionalInfo: order.additionalInfo,
    pricePerUnit: order.pricePerUnit,
  };
}

export type UpdateOrderForm = Omit<UpdateOrder, 'order'>;

export function EditOrder({
  route: { params },
  navigation,
}: OrdersDriverScreenProps<'editOrder', 'ordersDriver', 'ownerRootDriver'>) {
  const queryClient = useQueryClient();
  const { mutate, data, isPending, error, isSuccess } = useMutation({
    mutationKey: ['updateOrder', params.order.id],
    mutationFn: updateOrder,
    onSuccess: (sth, variables) => {
      queryClient.setQueryData(
        ['orders'],
        (oldData: Array<OrderResponseBase>) => {
          if (variables) {
            return [...oldData.filter(order => order.id !== sth?.id), sth];
          }
          return oldData;
        },
      );
    },
  });

  const defaultValues = prepareDefaultValues(params.order);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateOrderForm>({
    defaultValues,
  });
  const onSubmit = (formData: UpdateOrderForm) => {
    mutate({
      ...formData,
      order: params.order.id,
      pricePerUnit: Number(formData.pricePerUnit),
    });
  };

  useEffect(() => {
    if (error) {
      Toast.show({
        type: 'error',
        text1: t(TranslationNames.components.toast.canUpdateOrderHeader),
        text2:
          error.message ??
          t(TranslationNames.components.toast.canUpdateOrderDescription),
      });
    }
    if (isSuccess && data) navigation.navigate('orderDetails', { order: data });
  }, [error, isSuccess]);

  return (
    <ScreenBase
      name={t(TranslationNames.screens.orderDriver.editOrder.screenTitle)}
    >
      <YStack f={1}>
        <FormCreator
          controllerSetups={createUpdateOrderSetup(control)}
          errors={errors}
          abs="pb-12"
        />
      </YStack>
      <YStack>
        <ButtonTamagui
          isPending={isPending}
          text={t(TranslationNames.screens.orderDriver.editOrder.submitButton)}
          buttonProps={{
            onPress: handleSubmit(onSubmit),
          }}
        />
      </YStack>
    </ScreenBase>
  );
}
