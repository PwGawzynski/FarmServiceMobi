import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSelector } from 'react-redux';
import {
  MaterialBaseInitialLayout,
  MaterialTopTabScreenOptions,
} from '../../../../settings/navigators/MaterialTopTabScreenOptions';
import { selectTheme } from '../../../../src/redux/feature/userSlice';
import { Theme } from '../../../../FarmServiceApiTypes/Account/Constants';
import { Colors } from '../../../../settings/styles/colors';
import { WorkerActivityDesktopDriverParamList } from '../../../../types/self/navigation/Worker/paramList/activities/WorkerActivityDesktopDriverParamList';
import { ActivityDesktopRoot } from '../../../pages/worker/ActivitiesDesktopDriver/ActivityDesktopRoot';

const Stack =
  createMaterialTopTabNavigator<WorkerActivityDesktopDriverParamList>();

export function ActivitiesDesktopDriver() {
  const theme = useSelector(selectTheme);

  return (
    <Stack.Navigator
      style={{
        backgroundColor: theme === Theme.dark ? Colors.DARK : Colors.WHITE,
        paddingBottom: '5%',
      }}
      initialLayout={MaterialBaseInitialLayout}
      screenOptions={MaterialTopTabScreenOptions}
      initialRouteName="workerLastActivities"
    >
      <Stack.Screen
        name="workerLastActivities"
        component={ActivityDesktopRoot}
      />
    </Stack.Navigator>
  );
}
