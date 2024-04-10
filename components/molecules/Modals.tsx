import { View } from 'react-native';
import { Card, SizableText, YStack } from 'tamagui';
import Modal from 'react-native-modal';
import { ButtonTamagui } from '../atoms/ButtonTamagui';

export interface InfoModalProps {
  isVisible: boolean;
  header?: string;
  description: string;
  onConfirm?: () => void;
}

export function InfoModal({
  isVisible,
  description,
  header = 'INFO',
  onConfirm,
}: InfoModalProps) {
  return (
    <Modal animationIn="fadeIn" coverScreen isVisible={isVisible}>
      <View className="items-center justify-center" style={{ flex: 1 }}>
        <Card
          bordered
          p="$4"
          style={{
            minHeight: '18%',
            minWidth: '80%',
          }}
          jc="space-between"
        >
          <SizableText className="text-xl font-bold text-center text-dark-blue dark:text-white">
            {header}
          </SizableText>
          <YStack>
            <SizableText className="text-dark-blue dark:text-white text-center">
              {description}
            </SizableText>
          </YStack>
          <ButtonTamagui
            text="OK"
            buttonProps={{
              size: '$3',
              onPress: () => {
                if (onConfirm) onConfirm();
              },
            }}
          />
        </Card>
      </View>
    </Modal>
  );
}
