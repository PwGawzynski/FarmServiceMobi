import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeStackScreenOptionsBase } from '../../../../settings/navigators/NativeStackScreenOptionsBase';
import { ActivitiesDesktopDriver } from './ActivitiesDesktopDriver';
import { WorkerActivityDriverParamList } from '../../../../types/self/navigation/Worker/paramList/activities/WorkerActivityDriverParamList';

const Stack = createNativeStackNavigator<WorkerActivityDriverParamList>();

export function ActivityDriver() {
  return (
    <Stack.Navigator
      screenOptions={NativeStackScreenOptionsBase}
      initialRouteName="workerActivityDesktopRoot"
    >
      <Stack.Screen
        name="workerActivityDesktopRoot"
        component={ActivitiesDesktopDriver}
      />
    </Stack.Navigator>
  );
}
