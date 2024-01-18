import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSelector } from 'react-redux';
import { ClientsDesktopDriverParamList } from '../../../../types/self/navigation/paramLists/clients/ClientsDesktopDriverParamList';
import { ClientsDesktop } from '../../../pages/mobi/ClientsDesktopDriver/ClientsDesktop';
import {
  MaterialBaseInitialLayout,
  MaterialTopTabScreenOptions,
} from '../../../../settings/navigators/MaterialTopTabScreenOptions';
import { Theme } from '../../../../FarmServiceApiTypes/Account/Constants';
import { Colors } from '../../../../settings/styles/colors';
import { selectTheme } from '../../../../src/redux/feature/userSlice';

const TopTab = createMaterialTopTabNavigator<ClientsDesktopDriverParamList>();

export function ClientsDesktopDriver() {
  const theme = useSelector(selectTheme);

  return (
    <TopTab.Navigator
      initialRouteName="clientsDesktop"
      style={{
        backgroundColor: theme === Theme.dark ? Colors.DARK : Colors.WHITE,
        paddingBottom: '5%',
      }}
      initialLayout={MaterialBaseInitialLayout}
      screenOptions={MaterialTopTabScreenOptions}
    >
      <TopTab.Screen name="clientsDesktop" component={ClientsDesktop} />
    </TopTab.Navigator>
  );
}
