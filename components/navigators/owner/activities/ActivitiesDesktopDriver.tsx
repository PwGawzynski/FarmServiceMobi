import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSelector } from 'react-redux';
import { ActivityDesktopRoot } from '../../../pages/mobi/ActivitiesDesktopTopTabNavigator/ActivityDesktopRoot';
import {
  MaterialBaseInitialLayout,
  MaterialTopTabScreenOptions,
} from '../../../../settings/navigators/MaterialTopTabScreenOptions';
import { ActivityDesktopDriverParamList } from '../../../../types/self/navigation/paramLists/activities/ActivityDesktopDriverParamList';
import { selectTheme } from '../../../../src/redux/feature/userSlice';
import { Theme } from '../../../../FarmServiceApiTypes/Account/Constants';
import { Colors } from '../../../../settings/styles/colors';

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
    </Stack.Navigator>
  );
}
