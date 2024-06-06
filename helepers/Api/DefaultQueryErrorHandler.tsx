import Toast from 'react-native-toast-message';
import { ErrorToastConfig } from './QueryDriver';

export function DefaultQueryErrorHandler(e: Error) {
  const payload = e.cause as ErrorToastConfig | string;
  if (typeof payload === 'string') {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: payload,
    });
    return;
  }
  const { header } = payload;
  const message = payload.description;
  Toast.show({
    type: 'error',
    text1: header,
    text2: message,
  });
}
