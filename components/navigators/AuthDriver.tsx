import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { TamaguiProvider } from 'tamagui';
import { useColorScheme } from 'nativewind';
import { useEffect } from 'react';
import Toast from 'react-native-toast-message';
import { AuthDriverParamList } from '../../types/self/navigation/Owner/paramLists/AuthDriverParamList';
// eslint-disable-next-line import/extensions
import config from '../../tamagui_conf/tamagui.config';
import { Theme } from '../../FarmServiceApiTypes/Account/Constants';
import { ToastSetup } from '../../helepers/ToastSetup';
import { selectTheme } from '../../src/redux/feature/userSlice';
import { NativeStackScreenOptionsBase } from '../../settings/navigators/NativeStackScreenOptionsBase';
import Landing from '../pages/owner/mobi/AuthDriver/Landing';
import { OwnerRootDriver } from './owner/OwnerRootDriver';
import { ChooseLoginType } from '../pages/owner/mobi/AuthDriver/ChooseLoginType';
import { CreateCompany } from '../pages/owner/mobi/AuthDriver/CreateCompany';
import { LoginByEmail } from '../pages/owner/mobi/AuthDriver/LoginByEmail';
import { ChooseRegisterType } from '../pages/owner/mobi/AuthDriver/ChooseRegisterType';
import { PasswordReset } from '../pages/owner/mobi/AuthDriver/PasswordReset';
import { OperationConfirmedAnimation } from '../pages/owner/mobi/AuthDriver/OperationConfirmedAnimation';
import { WorkerRootDriver } from './worker/WorkerRootDriver';

const Stack = createNativeStackNavigator<AuthDriverParamList>();

export default function AuthDriver() {
  const theme = useSelector(selectTheme);
  const { setColorScheme } = useColorScheme();
  useEffect(() => {
    setColorScheme(theme === Theme.light ? 'light' : 'dark');
  }, [theme]);

  // TODO impossible for ios do it for android
  /* const [{ illuminance }, setData] = useState({ illuminance: 0 });
  useEffect(() => {
    const subscription = LightSensor.addListener(setData);

    return subscription && subscription.remove();
  }, []); */

  if (theme === undefined) return null;
  return (
    <TamaguiProvider config={config} defaultTheme={Theme[theme]}>
      <Stack.Navigator initialRouteName="landing">
        <Stack.Screen
          options={{
            ...NativeStackScreenOptionsBase,
            gestureEnabled: false,
            animation: 'fade',
          }}
          name="landing"
          component={Landing}
        />
        <Stack.Screen
          options={{
            ...NativeStackScreenOptionsBase,
            gestureEnabled: false,
            animation: 'fade',
          }}
          name="ownerRootDriver"
          component={OwnerRootDriver}
        />
        <Stack.Screen
          options={{
            ...NativeStackScreenOptionsBase,
            gestureEnabled: false,
            animation: 'fade',
          }}
          name="workerRootDriver"
          component={WorkerRootDriver}
        />
        <Stack.Screen
          options={{
            ...NativeStackScreenOptionsBase,
            gestureEnabled: false,
            animation: 'fade',
          }}
          name="chooseLoginType"
          component={ChooseLoginType}
        />
        <Stack.Screen
          options={{
            ...NativeStackScreenOptionsBase,
            gestureEnabled: false,
            animation: 'fade',
          }}
          name="createCompany"
          component={CreateCompany}
        />
        <Stack.Screen
          options={{
            ...NativeStackScreenOptionsBase,
            animation: 'fade',
            gestureEnabled: true,
            gestureDirection: 'horizontal',
          }}
          name="loginByEmail"
          component={LoginByEmail}
        />
        <Stack.Screen
          options={{
            ...NativeStackScreenOptionsBase,
            animation: 'fade',
            gestureDirection: 'horizontal',
          }}
          name="chooseRegisterType"
          component={ChooseRegisterType}
        />
        <Stack.Screen
          options={{
            ...NativeStackScreenOptionsBase,
            animation: 'fade',
            gestureDirection: 'horizontal',
          }}
          name="passwordReset"
          component={PasswordReset}
        />
        <Stack.Screen
          options={{
            ...NativeStackScreenOptionsBase,
            animation: 'fade',
            gestureDirection: 'horizontal',
          }}
          name="OperationConfirmed"
          component={OperationConfirmedAnimation}
        />
      </Stack.Navigator>
      {/* If there is any error in toast, start by moving it to app.tsx */}
      <Toast config={ToastSetup(theme)} />
    </TamaguiProvider>
  );
}
