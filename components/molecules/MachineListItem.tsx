import { Card, SizableText, useTheme, XStack, YStack } from 'tamagui';
import { useNavigation } from '@react-navigation/native';
import { MachineResponseBase } from '../../FarmServiceApiTypes/Machine/Responses';
import InfoIco from '../../assets/info.svg';

export type Props = {
  machine: MachineResponseBase;
};

export default function MachineListItem({ machine }: Props) {
  const { name, licensePlate } = machine;
  const {
    color4: { val },
  } = useTheme();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const navigation = useNavigation<any>();
  const onPress = () => navigation.navigate('machineDetails', { machine });
  return (
    <Card onPress={onPress}>
      <XStack p="$2" ai="center" justifyContent="space-between">
        <YStack ml="$2">
          <SizableText
            fontWeight="bold"
            fontSize={name.length > 20 ? '$4' : '$7'}
            color="$color"
            textTransform="uppercase"
            textAlign="left"
            adjustsFontSizeToFit
            numberOfLines={1}
          >
            {name}
          </SizableText>
          <SizableText color="$color4" textAlign="left">
            {licensePlate}
          </SizableText>
        </YStack>
        <YStack ai="flex-end" f={1}>
          <InfoIco color={val} />
        </YStack>
      </XStack>
    </Card>
  );
}
