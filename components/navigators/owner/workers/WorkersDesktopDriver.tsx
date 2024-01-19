import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSelector } from 'react-redux';
import {
  Directions,
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler';
import { Platform } from 'react-native';
import {
  MaterialBaseInitialLayout,
  MaterialTopTabScreenOptions,
} from '../../../../settings/navigators/MaterialTopTabScreenOptions';
import { selectTheme } from '../../../../src/redux/feature/userSlice';
import { Theme } from '../../../../FarmServiceApiTypes/Account/Constants';
import { Colors } from '../../../../settings/styles/colors';
import { WorkersDesktopDriverParamList } from '../../../../types/self/navigation/paramLists/workers/WorkersDesktopDriverParamList';
import { WorkersDesktop } from '../../../pages/mobi/WorkersDesktopDriver/WorkersDesktop';
import { WorkersDriverScreenProps } from '../../../../types/self/navigation/props/workers/WorkersDriverProps';

const TopTab = createMaterialTopTabNavigator<WorkersDesktopDriverParamList>();

export function WorkersDesktopDriver({
  navigation,
}: WorkersDriverScreenProps<
  'workersDesktopRoot',
  'workersDriver',
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
    </GestureDetector>
  );
}
