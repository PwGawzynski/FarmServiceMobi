import { useForm } from 'react-hook-form';
import { YStack } from 'tamagui';
import { ClientResponseBase } from '../../FarmServiceApiTypes/Clients/Responses';
import { FormCreator } from '../atoms/FormCreator';
import { createOrderSetup } from '../../helepers/FormSetups/CreateOrderSetup';
import { ButtonTamagui } from '../atoms/ButtonTamagui';

export interface Props {
  client: ClientResponseBase;
}

export interface OrderFormData {
  name: string;
  performanceDate: Date;
  additionalInfo?: string;
}

export function OrderForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<OrderFormData>();
  const onSubmit = (data: OrderFormData) => {
    console.log(data);
  };
  return (
    <YStack f={1}>
      <YStack f={1}>
        <FormCreator
          abs="flex-none"
          controllerSetups={createOrderSetup(control)}
          errors={errors}
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
