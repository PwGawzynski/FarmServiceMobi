import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeStackScreenOptionsBase } from '../../../../settings/navigators/NativeStackScreenOptionsBase';
import { ActivitiesDesktopDriver } from './ActivitiesDesktopDriver';
import { WorkerActivityDriverParamList } from '../../../../types/self/navigation/Worker/paramList/activities/WorkerActivityDriverParamList';
import { TaskView } from '../../../pages/worker/ActivityDriver/TaskView';

const Stack = createNativeStackNavigator<WorkerActivityDriverParamList>();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ActivityDriver(/* {}: WorkerRootDriverScreenProps<
  'workerActivityDriver',
  'workerRootDriver'
> */) {
  return (
    <Stack.Navigator
      screenOptions={NativeStackScreenOptionsBase}
      initialRouteName="workerActivityDesktopRoot"
    >
      <Stack.Screen
        name="workerActivityDesktopRoot"
        component={ActivitiesDesktopDriver}
      />
      <Stack.Screen
        options={{
          animation: 'slide_from_right',
          gestureDirection: 'horizontal',
        }}
        name="taskView"
        component={TaskView}
      />
    </Stack.Navigator>
  );
}
