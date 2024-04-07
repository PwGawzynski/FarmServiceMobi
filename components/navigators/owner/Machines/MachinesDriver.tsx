import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeStackScreenOptionsBase } from '../../../../settings/navigators/NativeStackScreenOptionsBase';
import { MachinesDriverParamList } from '../../../../types/self/navigation/Owner/paramLists/machines/MachinesDriverParamList';
import { MachinesDesktopDriver } from './MachinesDesktopDriver';

const Stack = createNativeStackNavigator<MachinesDriverParamList>();

export function MachinesDriver() {
  return (
    <Stack.Navigator
      screenOptions={NativeStackScreenOptionsBase}
      initialRouteName="machinesDesktopRoot"
    >
      <Stack.Screen
        name="machinesDesktopRoot"
        component={MachinesDesktopDriver}
      />
    </Stack.Navigator>
  );
}
