import { View } from 'react-native';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';
import { ListRenderItemInfo } from '@shopify/flash-list';
import { YStack } from 'tamagui';
import { BlurView } from 'expo-blur';
import { ScreenBase } from '../common/ScreenBase';
import {
  ButtonOptions,
  NavigationBottomPanel,
} from '../../../../molecules/NavigationBottomPanel';
import { ActivitiesDesktopDriverScreenProps } from '../../../../../types/self/navigation/Owner/props/activities/ActivitiesDesktopDriverProps';
import { Api } from '../../../../../api/Api';
import { ActivityResponseBase } from '../../../../../FarmServiceApiTypes/Activity/Responses';
import { UniversalList } from '../../../../organisms/UniversalList';

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
    {
      title: 'Machines',
      onPress: () =>
        navigation.navigate('machinesDriver', {
          screen: 'machinesDesktopRoot',
          params: { screen: 'machinesDesktop' },
        }),
    },
  ];
  const [isFetching, setIsFetching] = useState(true);
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ['companiesTasks'],
    initialData: undefined as ActivityResponseBase[] | undefined,
  });

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let es: any;
    (async () => {
      es = await Api.companiesActivities({
        message: (m: ActivityResponseBase[]) => {
          setIsFetching(false);
          if (data?.length !== undefined && data.length !== m.length)
            Toast.show({
              type: 'info',
              text1: 'New Activity',
              text2: 'New Activity has been added',
            });
          queryClient.setQueryData(['companiesTasks'], m);
        },
      });
    })();
    return () => {
      es.removeAllEventListeners();
      es.close();
    };
  }, []);

  const renderItem = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ({ item }: ListRenderItemInfo<ActivityResponseBase>) => {
      return <BlurView />;
    },
    [],
  );

  return (
    <ScreenBase name="Last Activities">
      <YStack f={1}>
        <UniversalList<ActivityResponseBase>
          data={data}
          beFlex
          listSetup={{
            isLoading: isFetching,
          }}
          listEmptyText="No activities found"
          renderItem={renderItem}
        />
      </YStack>
      <View className="flex-1 flex-col">
        <View className="flex-1 " />
        <View className="flex-1 max-h-32 items-center ">
          <NavigationBottomPanel options={navigationOptions} />
        </View>
      </View>
    </ScreenBase>
  );
}
