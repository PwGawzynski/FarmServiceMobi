import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeStackScreenOptionsBase } from '../../../../settings/navigators/NativeStackScreenOptionsBase';
import { ClientsDriverParamList } from '../../../../types/self/navigation/paramLists/clients/ClientsDriverParamList';
import { ClientsDesktopDriver } from './ClientsDesktopDriver';
import { ClientDetails } from '../../../pages/mobi/ClientsDriver/ClientDetails';

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
      <Stack.Screen
        name="clientDetails"
        component={ClientDetails}
        options={{
          animation: 'default',
          gestureDirection: 'horizontal',
        }}
      />
    </Stack.Navigator>
  );
}
