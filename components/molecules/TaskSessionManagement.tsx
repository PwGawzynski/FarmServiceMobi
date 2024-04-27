import { SizableText, YStack } from 'tamagui';
import { TaskSessionResponseBase } from '../../FarmServiceApiTypes/TaskSession/Responses';
import { ButtonTamagui } from '../atoms/ButtonTamagui';
import { KeyValuePair } from '../atoms/KeyValuePair';
import { Colors } from '../../settings/styles/colors';

export interface TaskSessionManagementProps {
  session: TaskSessionResponseBase;
  onBackToTask?: () => void;
}

export function TaskSessionManagement({
  session,
  onBackToTask,
}: TaskSessionManagementProps) {
  return (
    <YStack f={1} p="$4" pt="$0">
      <YStack f={1} maxHeight="42%">
        <YStack f={1}>
          <SizableText fontSize="$7" className="uppercase font-bold mb-2">
            Session Info
          </SizableText>
          <KeyValuePair
            name="OPENED AT"
            value={new Date(session.openedAt).toLocaleTimeString()}
          />
          <KeyValuePair
            name="CLOSED AT"
            value={
              session.closedAt
                ? new Date(session.closedAt).toLocaleTimeString()
                : 'N/A'
            }
          />
          <KeyValuePair
            name="CLOSED AT"
            value={
              session.closedAt
                ? new Date(session.closedAt).toLocaleTimeString()
                : 'N/A'
            }
          />
          <KeyValuePair
            name="CLOSED AT"
            value={
              session.closedAt
                ? new Date(session.closedAt).toLocaleTimeString()
                : 'N/A'
            }
          />
        </YStack>
        <ButtonTamagui
          text="Back"
          buttonProps={{
            mb: '$2',
            onPress: onBackToTask,
          }}
        />
        <ButtonTamagui
          text="Back"
          bgColor={Colors.ERROR_RED}
          buttonProps={{
            onPress: onBackToTask,
          }}
        />
      </YStack>
    </YStack>
  );
}
