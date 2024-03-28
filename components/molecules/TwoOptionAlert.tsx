import { AlertDialog, Button, Text, XStack } from 'tamagui';
import DangerIco from '../../assets/danger.svg';
import { Colors } from '../../settings/styles/colors';

export type Props = {
  open: boolean;
  title?: string;
  description?: string;
  leftButtonText?: string;
  rightButtonText?: string;
  onLeftButtonClick?: () => void;
  onRightButtonClick?: () => void;
  isDanger?: boolean;
};
export interface AlertI {
  status: boolean;
  title: string | undefined;
  description: string | undefined;
  leftButtonText: string | undefined;
  rightButtonText: string | undefined;
  onLeftButtonClick?: () => void;
  onRightButtonClick?: () => void;
  isDanger?: boolean;
}

export function TwoOptionAlert(props: Props) {
  return (
    <AlertDialog open={props.open}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay key={Math.random()} />
        <AlertDialog.Content p="$6" m="$8">
          <XStack ai="center" jc="center" pb="$4">
            {props.isDanger && (
              <DangerIco height={50} width={50} color={Colors.ERROR_RED} />
            )}
          </XStack>
          <Text
            fontWeight="bold"
            color={props.isDanger ? Colors.ERROR_RED : '$color4'}
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
          <AlertDialog.Description
            color={props.isDanger ? Colors.ERROR_RED : '$color4'}
            mt="$4"
            mb="$4"
            textAlign="center"
          >
            {props.description}
          </AlertDialog.Description>
          <XStack jc={props.rightButtonText ? 'space-between' : 'center'}>
            <Button
              backgroundColor={props.isDanger ? Colors.ERROR_RED : '$color4'}
              onPress={props.onLeftButtonClick}
              size="$3"
              pressStyle={
                {
                  color: props.isDanger ? Colors.ERROR_RED : '$color4',
                  borderColor: props.isDanger ? Colors.ERROR_RED : '$color4',
                } as never
              }
            >
              <Button.Text
                adjustsFontSizeToFit
                numberOfLines={1}
                textTransform="uppercase"
                fontWeight="bold"
              >
                {props.leftButtonText}
              </Button.Text>
            </Button>
            {props.rightButtonText && (
              <Button
                pressStyle={
                  {
                    color: '$color4',
                    borderColor: '$color4',
                  } as never
                }
                onPress={props.onRightButtonClick}
                size="$3"
                ml="$4"
              >
                <Button.Text
                  adjustsFontSizeToFit
                  numberOfLines={1}
                  textTransform="uppercase"
                  fontWeight="bold"
                >
                  {props.rightButtonText}
                </Button.Text>
              </Button>
            )}
          </XStack>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog>
  );
}
