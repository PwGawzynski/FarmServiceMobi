import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeStackScreenOptionsBase } from '../../../../settings/navigators/NativeStackScreenOptionsBase';
import { WorkersDriverParamList } from '../../../../types/self/navigation/Owner/paramLists/workers/WorkersDriverParamList';
import { WorkersDesktopDriver } from './WorkersDesktopDriver';
import { WorkerDetails } from '../../../pages/owner/mobi/WorkersDriver/WorkerDetails';

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
      <Stack.Screen
        name="workerDetails"
        component={WorkerDetails}
        options={{
          animation: 'slide_from_right',
          gestureDirection: 'horizontal',
        }}
      />
    </Stack.Navigator>
  );
}
