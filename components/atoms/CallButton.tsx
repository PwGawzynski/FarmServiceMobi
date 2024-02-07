// import * as Linking from 'expo-linking';
import { Button, useTheme } from 'tamagui';
import Phone from '../../assets/phone.svg';

type CallButtonProps = {
  phoneNumber: string;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function CallButton({ phoneNumber }: CallButtonProps) {
  // const onCallAction = () => Linking.openURL(`tel:${phoneNumber}`);
  const { color9 } = useTheme();
  console.log(color9);
  return (
    <Button
      onPress={() => {
        //  onCallAction();
      }}
    >
      <Phone color={color9.val} />
      Call
    </Button>
  );
}
