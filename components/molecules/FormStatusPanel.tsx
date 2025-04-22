import { View } from 'react-native';
import { PendingInfo, PendingInfoProps } from '../atoms/PendingInfo';
import { FormErrorInfo, FormErrorInfoProps } from '../atoms/FormErrorInfo';

export type Props = PendingInfoProps & FormErrorInfoProps;

export function FormStatusPanel(props: Props) {
  return (
    <View className="w-full h-6 mt-2 overflow-hidden flex-row justify-center items-center">
      <PendingInfo {...props} />
      {props.error && <FormErrorInfo {...props} />}
    </View>
  );
}
