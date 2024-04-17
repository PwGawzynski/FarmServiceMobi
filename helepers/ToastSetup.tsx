import Toast, {
  BaseToast,
  ErrorToast,
  InfoToast,
  ToastConfig,
} from 'react-native-toast-message';
import { BaseToastProps } from 'react-native-toast-message/lib/src/types';
import { Colors } from '../settings/styles/colors';
import { Theme } from '../FarmServiceApiTypes/Account/Constants';

export const ToastSetup = (theme: Theme) =>
  ({
    success: (props: BaseToastProps) => {
      return (
        <BaseToast
          {...props}
          style={{
            borderLeftColor:
              theme === Theme.light ? Colors.DARK : Colors.LIGHT_BLUE,
            marginTop: 20,
            backgroundColor: 'transparent',
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ...(props as any).props.style,
          }}
          contentContainerStyle={{
            paddingHorizontal: 15,
            backgroundColor: theme === Theme.light ? Colors.DARK : Colors.WHITE,
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
          }}
          text1Style={{
            fontSize: 16,
            fontWeight: '500',
            color: theme === Theme.light ? Colors.WHITE : Colors.DARK,
            textTransform: 'uppercase',
          }}
          text2Style={{
            fontSize: 14,
            color: theme === Theme.light ? Colors.WHITE : Colors.DARKER_GRAY,
          }}
        />
      );
    },
    error: (props: BaseToastProps) => (
      <ErrorToast
        {...props}
        style={{
          borderLeftColor: Colors.ERROR_RED,
          marginTop: 20,
          backgroundColor: 'transparent',
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ...(props as any).props.style,
        }}
        contentContainerStyle={{
          paddingHorizontal: 15,
          backgroundColor: theme === Theme.light ? Colors.DARK : Colors.WHITE,
          borderTopRightRadius: 10,
          borderBottomRightRadius: 10,
        }}
        text1Style={{
          fontSize: 16,
          fontWeight: '500',
          color: Colors.ERROR_RED,
          textTransform: 'uppercase',
        }}
        text2Style={{
          fontSize: 14,
          color: theme === Theme.light ? Colors.WHITE : Colors.DARKER_GRAY,
        }}
      />
    ),
    info: (props: BaseToastProps) => (
      <InfoToast
        {...props}
        style={{
          borderLeftColor:
            theme === Theme.light ? Colors.LIGHT_BLUE : Colors.GREEN,
          marginTop: 20,
          backgroundColor: 'transparent',
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ...(props as any).props.style,
        }}
        contentContainerStyle={{
          paddingHorizontal: 15,
          backgroundColor: theme === Theme.light ? Colors.DARK : Colors.WHITE,
          borderTopRightRadius: 10,
          borderBottomRightRadius: 10,
        }}
        text1Style={{
          fontSize: 16,
          fontWeight: '500',
          color: Colors.DARK_BLUE,
          textTransform: 'uppercase',
        }}
        text2Style={{
          fontSize: 14,
          color: theme === Theme.light ? Colors.WHITE : Colors.DARKER_GRAY,
        }}
      />
    ),
  }) as ToastConfig;

export const showErrorToast = (
  error: Error | null,
  header: string,
  description: string,
) => {
  Toast.show({
    type: 'error',
    text1: header,
    text2: error?.message ?? description,
  });
};
