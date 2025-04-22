import { View, XStack } from 'tamagui';
import { CallButton, CallButtonProps } from '../atoms/CallButton';
import { MailButton, MailButtonProps } from '../atoms/MailButton';

export type CallAndMailPanelProps = {
  callButtonProps: CallButtonProps;
  mailButtonProps: MailButtonProps;
};

export function CallAndMailPanel(props: CallAndMailPanelProps) {
  return (
    <XStack f={1}>
      <CallButton {...props.callButtonProps} />
      <View width="$2" />
      <MailButton {...props.mailButtonProps} />
    </XStack>
  );
}
