import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';
import { ListRenderItemInfo } from '@shopify/flash-list';
import { YStack } from 'tamagui';
import { ScreenBase } from '../common/ScreenBase';
import {
  ButtonOptions,
  NavigationBottomPanel,
} from '../../../../molecules/NavigationBottomPanel';
import { ActivitiesDesktopDriverScreenProps } from '../../../../../types/self/navigation/Owner/props/activities/ActivitiesDesktopDriverProps';
import { Api } from '../../../../../api/Api';
import { ActivityResponseBase } from '../../../../../FarmServiceApiTypes/Activity/Responses';
import { UniversalList } from '../../../../organisms/UniversalList';
import { sortActivitiesByDateDesc } from '../../../../../helepers/filterFunctions';
import { ActivityItem } from '../../../../atoms/ActivityItem';
import { TranslationNames } from '../../../../../locales/TranslationNames';

const TRANSLATIONS = {
  title: TranslationNames.screens.activityDesktopRoot.title,
  newActivityToastTitle:
    TranslationNames.screens.activityDesktopRoot.newActivity,
  newActivityToastText:
    TranslationNames.screens.activityDesktopRoot.newActivityDescription,
  noActivities: TranslationNames.screens.activityDesktopRoot.noActivities,
};

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
              text1: TRANSLATIONS.newActivityToastTitle,
              text2: TRANSLATIONS.newActivityToastText,
            });
          queryClient.setQueryData(['companiesTasks'], m);
        },
      });
    })();
    return () => {
      es?.removeAllEventListeners();
      es?.close();
    };
  }, []);

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<ActivityResponseBase>) => {
      return <ActivityItem item={item} />;
    },
    [],
  );

  return (
    <ScreenBase name={TRANSLATIONS.title}>
      <YStack f={1} mt="$4">
        <UniversalList<ActivityResponseBase>
          data={sortActivitiesByDateDesc(data)}
          beFlex
          listSetup={{
            isLoading: isFetching,
          }}
          listEmptyText={TRANSLATIONS.noActivities}
          renderItem={renderItem}
          scrollToBottomOnContentSizeChange
        />
      </YStack>
      <YStack className="max-h-28 flex-1">
        <NavigationBottomPanel options={navigationOptions} />
      </YStack>
    </ScreenBase>
  );
}
