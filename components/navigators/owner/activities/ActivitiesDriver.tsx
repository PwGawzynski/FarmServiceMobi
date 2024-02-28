import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityDriverParamList } from '../../../../types/self/navigation/Owner/paramLists/activities/ActivityDriverParamList';
import { NativeStackScreenOptionsBase } from '../../../../settings/navigators/NativeStackScreenOptionsBase';
import { ActivitiesDesktopDriver } from './ActivitiesDesktopDriver';

const Stack = createNativeStackNavigator<ActivityDriverParamList>();

export function ActivityDriver() {
  return (
    <Stack.Navigator
      screenOptions={NativeStackScreenOptionsBase}
      initialRouteName="activityDesktopRoot"
    >
      <Stack.Screen
        name="activityDesktopRoot"
        component={ActivitiesDesktopDriver}
      />
    </Stack.Navigator>
  );
}
