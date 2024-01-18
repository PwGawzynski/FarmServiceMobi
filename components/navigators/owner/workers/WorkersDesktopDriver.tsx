import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSelector } from 'react-redux';
import {
  MaterialBaseInitialLayout,
  MaterialTopTabScreenOptions,
} from '../../../../settings/navigators/MaterialTopTabScreenOptions';
import { selectTheme } from '../../../../src/redux/feature/userSlice';
import { Theme } from '../../../../FarmServiceApiTypes/Account/Constants';
import { Colors } from '../../../../settings/styles/colors';
import { WorkersDesktopDriverParamList } from '../../../../types/self/navigation/paramLists/workers/WorkersDesktopDriverParamList';
import { WorkersDesktop } from '../../../pages/mobi/WorkersDesktopDriver/WorkersDesktop';

const TopTab = createMaterialTopTabNavigator<WorkersDesktopDriverParamList>();

export function WorkersDesktopDriver() {
  const theme = useSelector(selectTheme);

  return (
    <TopTab.Navigator
      style={{
        backgroundColor: theme === Theme.dark ? Colors.DARK : Colors.WHITE,
        paddingBottom: '5%',
      }}
      initialLayout={MaterialBaseInitialLayout}
      screenOptions={MaterialTopTabScreenOptions}
      initialRouteName="workersDesktop"
    >
      <TopTab.Screen name="workersDesktop" component={WorkersDesktop} />
    </TopTab.Navigator>
  );
}
