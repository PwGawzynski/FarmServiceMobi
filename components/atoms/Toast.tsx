import { useToastState, Toast as InternalToast } from '@tamagui/toast';
import { YStack } from 'tamagui';

export function Toast() {
  const currentToast = useToastState();

  if (!currentToast || currentToast.isHandledNatively) return null;
  return (
    <InternalToast
      key={currentToast.id}
      duration={currentToast.duration}
      enterStyle={{ opacity: 0, scale: 0.5, y: -25 }}
      exitStyle={{ opacity: 0, scale: 1, y: -20 }}
      y={0}
      opacity={1}
      scale={1}
      animation="100ms"
      viewportName={currentToast.viewportName}
    >
      <YStack>
        <InternalToast.Title>{currentToast.title}</InternalToast.Title>
        {!!currentToast.message && (
          <InternalToast.Description>
            {currentToast.message}
          </InternalToast.Description>
        )}
      </YStack>
    </InternalToast>
  );
}
