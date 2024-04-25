import { SizableText, YStack } from 'tamagui';
import { TaskSessionResponseBase } from '../../FarmServiceApiTypes/TaskSession/Responses';
import { ButtonTamagui } from '../atoms/ButtonTamagui';

export interface TaskSessionManagementProps {
  session: TaskSessionResponseBase;
  onBackToTask?: () => void;
}

export function TaskSessionManagement({
  session,
  onBackToTask,
}: TaskSessionManagementProps) {
  return (
    <YStack>
      <SizableText>
        {new Date(session.openedAt).toLocaleTimeString()}
      </SizableText>
      <ButtonTamagui
        text="Back"
        buttonProps={{
          onPress: onBackToTask,
        }}
      />
    </YStack>
  );
}
