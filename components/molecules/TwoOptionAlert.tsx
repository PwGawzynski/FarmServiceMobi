import { AlertDialog, Button, Text, XStack } from 'tamagui';

export type Props = {
  open: boolean;
  title?: string;
  description?: string;
  leftButtonText?: string;
  rightButtonText?: string;
  onLeftButtonClick?: () => void;
  onRightButtonClick?: () => void;
};

export function TwoOptionAlert(props: Props) {
  return (
    <AlertDialog open={props.open}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay key={Math.random()} />
        <AlertDialog.Content p="$6" m="$8">
          <Text
            fontWeight="bold"
            textTransform="uppercase"
            textAlign="center"
            adjustsFontSizeToFit
            numberOfLines={1}
            fontSize="$4"
            jc="center"
            ai="center"
          >
            {props.title}
          </Text>
          <AlertDialog.Description mt="$4" mb="$4" textAlign="justify">
            {props.description}
          </AlertDialog.Description>
          <XStack jc="space-between">
            <Button onPress={props.onLeftButtonClick} size="$3">
              <Button.Text
                adjustsFontSizeToFit
                numberOfLines={1}
                textTransform="uppercase"
                fontWeight="bold"
              >
                {props.leftButtonText}
              </Button.Text>
            </Button>
            <Button onPress={props.onRightButtonClick} size="$3" ml="$4">
              <Button.Text
                adjustsFontSizeToFit
                numberOfLines={1}
                textTransform="uppercase"
                fontWeight="bold"
              >
                {props.rightButtonText}
              </Button.Text>
            </Button>
          </XStack>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog>
  );
}
