import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeStackScreenOptionsBase } from '../../../../settings/navigators/NativeStackScreenOptionsBase';
import { WorkersDriverParamList } from '../../../../types/self/navigation/paramLists/workers/WorkersDriverParamList';
import { WorkersDesktopDriver } from './WorkersDesktopDriver';

const Stack = createNativeStackNavigator<WorkersDriverParamList>();

export function WorkersDriver() {
  return (
    <Stack.Navigator
      screenOptions={NativeStackScreenOptionsBase}
      initialRouteName="workersDesktopRoot"
    >
      <Stack.Screen
        name="workersDesktopRoot"
        component={WorkersDesktopDriver}
      />
    </Stack.Navigator>
  );
}
