import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ActivityDesktopRoot } from '../../../pages/mobi/ActivitiesDesktopTopTabNavigator/ActivityDesktopRoot';
import { MaterialTopTabScreenOptions } from '../../../../settings/navigators/MaterialTopTabScreenOptions';
import { ActivityDesktopDriverParamList } from '../../../../types/self/navigation/paramLists/activities/ActivityDesktopDriverParamList';

const Stack = createMaterialTopTabNavigator<ActivityDesktopDriverParamList>();

export function ActivitiesDesktopDriver() {
  return (
    <Stack.Navigator
      screenOptions={MaterialTopTabScreenOptions}
      initialRouteName="lastActivities"
    >
      <Stack.Screen name="lastActivities" component={ActivityDesktopRoot} />
    </Stack.Navigator>
  );
}
