import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeStackScreenOptionsBase } from '../../../settings/navigators/NativeStackScreenOptionsBase';
import { ActivityDriver } from './activities/ActivitiesDriver';
import { WorkerRootDriverParamList } from '../../../types/self/navigation/Worker/paramList/WorkerRootDriverParamList';
import { WorkerAssignation } from '../../pages/worker/WorkerAssignation';

const Stack = createNativeStackNavigator<WorkerRootDriverParamList>();

export function WorkerRootDriver() {
  return (
    <Stack.Navigator
      // REMEMEBER TO change navigation in Landing when changing initialRouteName
      initialRouteName="workerActivityDriver"
      screenOptions={NativeStackScreenOptionsBase}
    >
      <Stack.Screen name="workerActivityDriver" component={ActivityDriver} />
      <Stack.Screen
        name="workerAssignationScreen"
        component={WorkerAssignation}
      />
    </Stack.Navigator>
  );
}
