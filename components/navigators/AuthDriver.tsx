import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { TamaguiProvider } from 'tamagui';
import { AuthDriverParamList } from '../../types/self/navigation/paramLists/AuthDriverParamList';
import Landing from '../pages/mobi/AuthDriver/Landing';
import { NativeStackScreenOptionsBase } from '../../settings/navigators/NativeStackScreenOptionsBase';
import { ChooseLoginType } from '../pages/mobi/AuthDriver/ChooseLoginType';
import { LoginByEmail } from '../pages/mobi/AuthDriver/LoginByEmail';
import { ChooseRegisterType } from '../pages/mobi/AuthDriver/ChooseRegisterType';
import { PasswordReset } from '../pages/mobi/AuthDriver/PasswordReset';
import { OperationConfirmedAnimation } from '../pages/mobi/AuthDriver/OperationConfirmedAnimation';
import { selectTheme } from '../../src/redux/feature/userSlice';
import { OwnerRootDriver } from './owner/OwnerRootDriver';
import { CreateCompany } from '../pages/mobi/AuthDriver/CreateCompany';
// eslint-disable-next-line import/extensions
import config from '../../tamagui_conf/tamagui.config';
import { Theme } from '../../FarmServiceApiTypes/Account/Constants';

const Stack = createNativeStackNavigator<AuthDriverParamList>();

export default function AuthDriver() {
  const theme = useSelector(selectTheme);
  console.log(theme);
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
    </TamaguiProvider>
  );
}
