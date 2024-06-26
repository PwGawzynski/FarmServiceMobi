import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { SizableText, View } from 'tamagui';
import { useSelector } from 'react-redux';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { CameraView, useCameraPermissions } from 'expo-camera';
import ScanningIco from '../../assets/scan-line.svg';
import OkIco from '../../assets/check-circle.svg';
import { selectTheme } from '../../src/redux/feature/userSlice';
import { Theme } from '../../FarmServiceApiTypes/Account/Constants';
import { Colors } from '../../settings/styles/colors';

export interface handleBarCodeScannedData {
  type: string;
  data: string;
}
export interface QRScannerProps {
  scanned: boolean;
  handleBarCodeScanned: (data: handleBarCodeScannedData) => void;
}

const ANIMATION_DURATION = 1000;

export function QRScanner({ scanned, handleBarCodeScanned }: QRScannerProps) {
  const theme = useSelector(selectTheme);
  const scale = useSharedValue(0.9);
  const BounceAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));
  const opacity = useSharedValue(0);
  const opacityAnimatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    requestPermission();
  }, []);

  if (permission === null) {
    return (
      <SizableText className="text-center p-4">
        Requesting for camera permission
      </SizableText>
    );
  }

  return (
    <View className="flex-1">
      {!scanned && (
        <CameraView
          barcodeScannerSettings={{
            barcodeTypes: ['qr'],
          }}
          onBarcodeScanned={
            scanned
              ? undefined
              : params => {
                  opacity.value = withTiming(1, {
                    duration: ANIMATION_DURATION,
                  });
                  handleBarCodeScanned(params);
                }
          }
          style={StyleSheet.absoluteFillObject}
        />
      )}
      {!scanned && (
        <Animated.View
          style={[BounceAnimatedStyle]}
          className="absolute w-full h-full top-0 left-0 "
        >
          <ScanningIco
            width="100%"
            height="100%"
            color={theme === Theme.dark ? Colors.GREEN : Colors.DARK_BLUE}
          />
        </Animated.View>
      )}
      {scanned && (
        <Animated.View
          style={[opacityAnimatedStyle]}
          className="w-full h-full flex-col items-center justify-center"
        >
          <OkIco width="100" height="100" color={Colors.GREEN} />
        </Animated.View>
      )}
    </View>
  );
}
