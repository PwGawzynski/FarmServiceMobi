import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeStackScreenOptionsBase } from '../../../../settings/navigators/NativeStackScreenOptionsBase';
import { ClientsDriverParamList } from '../../../../types/self/navigation/paramLists/ClientsDriverParamList';
import { ClientsDesktopDriver } from './ClientsDesktopDriver';

const Stack = createNativeStackNavigator<ClientsDriverParamList>();

export function ClientsDriver() {
  return (
    <Stack.Navigator
      screenOptions={NativeStackScreenOptionsBase}
      initialRouteName="clientsDesktopRoot"
    >
      <Stack.Screen
        name="clientsDesktopRoot"
        component={ClientsDesktopDriver}
      />
    </Stack.Navigator>
  );
}
