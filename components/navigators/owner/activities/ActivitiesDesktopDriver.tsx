import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSelector } from 'react-redux';
import {
  MaterialBaseInitialLayout,
  MaterialTopTabScreenOptions,
} from '../../../../settings/navigators/MaterialTopTabScreenOptions';
import { ActivityDesktopDriverParamList } from '../../../../types/self/navigation/Owner/paramLists/activities/ActivityDesktopDriverParamList';
import { selectTheme } from '../../../../src/redux/feature/userSlice';
import { Theme } from '../../../../FarmServiceApiTypes/Account/Constants';
import { Colors } from '../../../../settings/styles/colors';
import { ActivityDesktopRoot } from '../../../pages/owner/mobi/ActivitiesDesktopTopTabNavigator/ActivityDesktopRoot';
import { AppSettings } from '../../../pages/owner/mobi/ActivitiesDesktopTopTabNavigator/AppSettings';

const Stack = createMaterialTopTabNavigator<ActivityDesktopDriverParamList>();

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
      initialRouteName="lastActivities"
    >
      <Stack.Screen name="lastActivities" component={ActivityDesktopRoot} />
      <Stack.Screen name="appSettings" component={AppSettings} />
    </Stack.Navigator>
  );
}
