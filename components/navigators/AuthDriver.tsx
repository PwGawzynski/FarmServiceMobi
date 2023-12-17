import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthDriverParamList } from '../../types/self/navigation/paramLists/AuthDriverParamList';
import Landing from '../pages/mobi/common/Landing';
import { NativeStackScreenOptionsBase } from '../../settings/navigators/NativeStackScreenOptionsBase';

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
    </Stack.Navigator>
  );
}
