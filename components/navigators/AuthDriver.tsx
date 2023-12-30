import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthDriverParamList } from '../../types/self/navigation/paramLists/AuthDriverParamList';
import Landing from '../pages/mobi/AuthDriver/Landing';
import { NativeStackScreenOptionsBase } from '../../settings/navigators/NativeStackScreenOptionsBase';
import { ChooseLoginType } from '../pages/mobi/AuthDriver/ChooseLoginType';
import { LoginByEmail } from '../pages/mobi/AuthDriver/LoginByEmail';
import { ChooseRegisterType } from '../pages/mobi/AuthDriver/ChooseRegisterType';

const Stack = createNativeStackNavigator<AuthDriverParamList>();

export default function AuthDriver() {
  return (
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
        name="chooseLoginType"
        component={ChooseLoginType}
      />
      <Stack.Screen
        options={{
          ...NativeStackScreenOptionsBase,
          animation: 'fade',
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
    </Stack.Navigator>
  );
}
