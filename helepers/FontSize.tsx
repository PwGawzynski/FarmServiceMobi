import { PixelRatio } from 'react-native';

const fontScale = PixelRatio.getFontScale();
export const getFontScaledSize = (size: number) => size / fontScale;
