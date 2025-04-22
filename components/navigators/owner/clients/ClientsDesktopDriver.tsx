import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSelector } from 'react-redux';
import {
  Directions,
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler';
import { Platform } from 'react-native';
import { ClientsDesktopDriverParamList } from '../../../../types/self/navigation/Owner/paramLists/clients/ClientsDesktopDriverParamList';
import {
  MaterialBaseInitialLayout,
  MaterialTopTabScreenOptions,
} from '../../../../settings/navigators/MaterialTopTabScreenOptions';
import { Theme } from '../../../../FarmServiceApiTypes/Account/Constants';
import { Colors } from '../../../../settings/styles/colors';
import { selectTheme } from '../../../../src/redux/feature/userSlice';
import { ClientsDriverScreenProps } from '../../../../types/self/navigation/Owner/props/clients/ClientsDriverProps';
import { ClientsDesktop } from '../../../pages/owner/mobi/ClientsDesktopDriver/ClientsDesktop';
import { CreateClient } from '../../../pages/owner/mobi/ClientsDesktopDriver/CreateClient';

const TopTab = createMaterialTopTabNavigator<ClientsDesktopDriverParamList>();

export function ClientsDesktopDriver({
  navigation,
}: ClientsDriverScreenProps<
  'clientsDesktopRoot',
  'clientsDriver',
  'ownerRootDriver'
>) {
  const theme = useSelector(selectTheme);
  const fling = Gesture.Fling();
  fling
    .direction(Directions.DOWN)
    .enabled(Platform.OS === 'android')
    .onEnd(() => {
      navigation.goBack();
    });
  return (
    <GestureDetector gesture={fling}>
      <TopTab.Navigator
        initialRouteName="clientsDesktop"
        style={{
          backgroundColor: theme === Theme.dark ? Colors.DARK : Colors.WHITE,
          paddingBottom: '5%',
        }}
        initialLayout={MaterialBaseInitialLayout}
        screenOptions={MaterialTopTabScreenOptions}
      >
        <TopTab.Screen name="createClient" component={CreateClient} />
        <TopTab.Screen name="clientsDesktop" component={ClientsDesktop} />
      </TopTab.Navigator>
    </GestureDetector>
  );
}
