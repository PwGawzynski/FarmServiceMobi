import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Toast from 'react-native-toast-message';
import { ListRenderItemInfo } from '@shopify/flash-list';
import { useTheme, YStack } from 'tamagui';
import { t } from 'i18next';
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
import GearIco from '../../../../../assets/settings.svg';
import { HintCard } from '../../../../atoms/HintCard';

const TRANSLATIONS = {
  title: t(TranslationNames.screens.activityDesktopRoot.title),
  newActivityToastTitle: t(
    TranslationNames.screens.activityDesktopRoot.newActivity,
  ),
  newActivityToastText: t(
    TranslationNames.screens.activityDesktopRoot.newActivityDescription,
  ),
  noActivities: t(TranslationNames.screens.activityDesktopRoot.noActivities),
  emptyListHint: t(TranslationNames.screens.activityDesktopRoot.emptyListHint),
  emptyListHintDescription: t(
    TranslationNames.screens.activityDesktopRoot.emptyListHintDescription,
  ),
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
    initialData: [] as ActivityResponseBase[] | undefined,
  });
  const dataLength = useRef(data?.length);
  useEffect(() => {
    dataLength.current = data?.length;
  }, [data]);

  const { color4 } = useTheme();

  const appSettingsButton = useMemo(() => {
    const handlePress = () => navigation.navigate('appSettings');
    return (
      <YStack onPress={handlePress}>
        <GearIco height={30} width={30} color={color4?.val} />
      </YStack>
    );
  }, [navigation]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let es: any;
    (async () => {
      es = await Api.companiesActivities({
        message: (m: ActivityResponseBase[]) => {
          setIsFetching(false);
          if (
            dataLength.current !== undefined &&
            dataLength.current !== m.length
          )
            Toast.show({
              type: 'info',
              text1: TRANSLATIONS.newActivityToastTitle,
              text2: TRANSLATIONS.newActivityToastText,
            });
          queryClient.setQueryData(['companiesTasks'], m);
        },
        open: () => {
          setIsFetching(false);
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

  const listEmptyComponent = useMemo(
    () => (
      <HintCard
        header={TRANSLATIONS.emptyListHint}
        text={TRANSLATIONS.emptyListHintDescription}
      />
    ),
    [],
  );

  return (
    <ScreenBase name={TRANSLATIONS.title} topRightButton={appSettingsButton}>
      <YStack f={1} mt="$4">
        <UniversalList<ActivityResponseBase>
          data={sortActivitiesByDateDesc(data)}
          beFlex
          listSetup={{
            isLoading: isFetching,
          }}
          listEmptyComponent={listEmptyComponent}
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
