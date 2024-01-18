import { View } from 'react-native';
import { ScreenBase } from '../common/ScreenBase';
import { ActivitiesDesktopDriverScreenProps } from '../../../../types/self/navigation/props/activities/ActivitiesDesktopDriverProps';
import {
  ButtonOptions,
  NavigationBottomPanel,
} from '../../../molecules/NavigationBottomPanel';

export function ActivityDesktopRoot({
  navigation,
}: ActivitiesDesktopDriverScreenProps<
  'lastActivities',
  'activityDesktopRoot',
  'activityDriver',
  'ownerRootDriver'
>) {
  const navigationOptions: Array<ButtonOptions> = [
    {
      title: 'orders',
      onPress: () =>
        navigation.navigate('ordersDriver', {
          screen: 'ordersDesktopRoot',
          params: { screen: 'ordersDesktop' },
        }),
    },
    {
      title: 'workers',
      onPress: () =>
        navigation.navigate('workersDriver', {
          screen: 'workersDesktopRoot',
          params: { screen: 'workersDesktop' },
        }),
    },

    {
      title: 'clients',
      onPress: () =>
        navigation.navigate('clientsDriver', {
          screen: 'clientsDesktopRoot',
          params: { screen: 'clientsDesktop' },
        }),
    },
  ];
  return (
    <ScreenBase name="Last Activities">
      <View className="flex-1 flex-col">
        <View className="flex-1 " />
        <View className="flex-1 max-h-32 items-center ">
          <NavigationBottomPanel options={navigationOptions} />
        </View>
      </View>
    </ScreenBase>
  );
}
