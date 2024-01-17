import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ClientsDesktopDriverParamList } from '../../../../types/self/navigation/paramLists/clients/ClientsDesktopDriverParamList';
import { ClientsDesktop } from '../../../pages/mobi/ClientsDesktopDriver/ClientsDesktop';
import { MaterialTopTabScreenOptions } from '../../../../settings/navigators/MaterialTopTabScreenOptions';

const TopTab = createMaterialTopTabNavigator<ClientsDesktopDriverParamList>();

export function ClientsDesktopDriver() {
  return (
    <TopTab.Navigator
      initialRouteName="clientsDesktop"
      screenOptions={MaterialTopTabScreenOptions}
    >
      <TopTab.Screen name="clientsDesktop" component={ClientsDesktop} />
    </TopTab.Navigator>
  );
}
