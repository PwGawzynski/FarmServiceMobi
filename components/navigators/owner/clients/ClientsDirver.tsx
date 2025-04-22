import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeStackScreenOptionsBase } from '../../../../settings/navigators/NativeStackScreenOptionsBase';
import { ClientsDriverParamList } from '../../../../types/self/navigation/Owner/paramLists/clients/ClientsDriverParamList';
import { ClientsDesktopDriver } from './ClientsDesktopDriver';
import { ClientDetails } from '../../../pages/owner/mobi/ClientsDriver/ClientDetails';
import { AssignCompanyToClient } from '../../../pages/owner/mobi/ClientsDriver/AssignCompanyToClient';
import { ClientControlPanel } from '../../../pages/owner/mobi/ClientsDriver/ClientControlPanel';
import { ClientFields } from '../../../pages/owner/mobi/ClientsDriver/clientFields';

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
      <Stack.Screen
        name="clientControlPanel"
        component={ClientControlPanel}
        options={{
          animation: 'default',
          gestureDirection: 'horizontal',
        }}
      />
      <Stack.Screen
        name="clientFields"
        component={ClientFields}
        options={{
          animation: 'default',
          gestureDirection: 'horizontal',
        }}
      />
      <Stack.Screen
        name="assignCompanyToClient"
        component={AssignCompanyToClient}
        options={{
          animation: 'none',
          gestureDirection: 'horizontal',
        }}
      />
    </Stack.Navigator>
  );
}
