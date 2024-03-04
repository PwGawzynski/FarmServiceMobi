import { SizableText, XStack, YStack } from 'tamagui';
import { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { useMutation } from '@tanstack/react-query';
import { ScreenBase } from '../common/ScreenBase';
import {
  handleBarCodeScannedData,
  QRScanner,
} from '../../../../molecules/QRScanner';
import { assignWorker } from '../../../../../api/worker/Worker';

export function AddWorker() {
  const [scanned, setScanned] = useState(false);
  const { mutate: createNewWorker, data: worker } = useMutation({
    mutationFn: assignWorker,
  });
  console.log(worker);
  const handleQrScanned = ({ data }: handleBarCodeScannedData) => {
    createNewWorker({ user: data });
    setScanned(true);
  };
  const isFocused = useIsFocused();
  useEffect(() => {
    if (!isFocused) setScanned(false);
  }, [isFocused, worker]);

  return (
    <ScreenBase name="Add Worker">
      <YStack f={1} ai="center" jc="center">
        <XStack ai="center" jc="center" f={1}>
          <XStack className="w-52 h-52 rounded-lg dark:border-green border-2 overflow-hidden ">
            {isFocused && (
              <QRScanner
                scanned={scanned}
                handleBarCodeScanned={handleQrScanned}
              />
            )}
          </XStack>
        </XStack>
        <XStack ai="center" jc="center" f={1}>
          <SizableText className="mt-8 text-lg uppercase ">
            Scan QR code from your worker
          </SizableText>
        </XStack>
      </YStack>
    </ScreenBase>
  );
}
