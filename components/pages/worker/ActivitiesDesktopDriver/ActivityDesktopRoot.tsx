import { useSelector } from 'react-redux';
import { useEffect, useMemo, useRef, useState } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { t } from 'i18next';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import { useTheme, YStack } from 'tamagui';
import { ActivitiesDesktopDriverScreenProps } from '../../../../types/self/navigation/Worker/props/activities/WorkerActivitiesDesktopDriverProps';
import {
  selectTheme,
  selectUser,
} from '../../../../src/redux/feature/userSlice';
import { Api } from '../../../../api/Api';
import { TaskResponseBase } from '../../../../FarmServiceApiTypes/Task/Responses';
import List from '../../../organisms/List';
import { TaskType } from '../../../../FarmServiceApiTypes/Task/Enums';
import { filterTasks } from '../../../../helepers/filterFunctions';
import { TranslationNames } from '../../../../locales/TranslationNames';
import { ScreenBase } from '../../owner/mobi/common/ScreenBase';
import ResumeIco from '../../../../assets/refresh.svg';
import { Theme } from '../../../../FarmServiceApiTypes/Account/Constants';
import { Colors } from '../../../../settings/styles/colors';
import PlayIco from '../../../../assets/play.svg';
import GearIco from '../../../../assets/settings.svg';

const TRANSLATIONS = {
  welcome: t(TranslationNames.workerScreens.activityDesktopRoot.welcome),
  newTaskIncomeHeader: t(
    TranslationNames.workerScreens.activityDesktopRoot.newTaskIncomeHeader,
  ),
  newTaskIncomeDescription: t(
    TranslationNames.workerScreens.activityDesktopRoot.newTaskIncomeDescription,
  ),
};

let checkedIfOpenSession = false;

export function ActivityDesktopRoot({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  navigation,
}: ActivitiesDesktopDriverScreenProps<
  'workerLastActivities',
  'workerActivityDesktopRoot',
  'workerActivityDriver',
  'workerRootDriver'
>) {
  const user = useSelector(selectUser);
  const name = user?.personalData.name;
  const [isFetching, setIsFetching] = useState(true);
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ['workerTasks'],
    initialData: undefined as TaskResponseBase[] | undefined,
  });
  useEffect(() => {
    if (!checkedIfOpenSession && data) {
      const openSession = data.find(task =>
        task.sessions.find(s => !s.closedAt),
      );
      checkedIfOpenSession = true;
      if (openSession) {
        navigation.navigate('taskView', {
          task: openSession,
        });
      }
    }
  }, [data]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let es: any;
    (async () => {
      es = await Api.workerTasks({
        message: (m: TaskResponseBase[]) => {
          setIsFetching(false);
          if (data?.length !== undefined && data.length !== m.length)
            Toast.show({
              type: 'info',
              text1: TRANSLATIONS.newTaskIncomeHeader,
              text2: TRANSLATIONS.newTaskIncomeDescription,
            });
          queryClient.setQueryData(['workerTasks'], m);
        },
      });
    })();
    return () => {
      es.removeAllEventListeners();
      es.close();
    };
  }, []);

  const { color4 } = useTheme();

  const appSettingsButton = useMemo(() => {
    const handlePress = () => !isFetching && navigation.navigate('appSettings');
    return (
      <YStack onPress={handlePress}>
        <GearIco height={30} width={30} color={color4?.val} />
      </YStack>
    );
  }, [navigation, color4, isFetching]);

  const modalRef = useRef<BottomSheetModal>(null);
  const theme = useSelector(selectTheme);
  return (
    <ScreenBase
      bottomSheetsProps={{
        modalRef,
        snapPoints: ['50%', '70%'],
      }}
      name={`${TRANSLATIONS.welcome} ${name}`}
      topRightButton={appSettingsButton}
    >
      <List<TaskResponseBase>
        isError={false}
        isLoading={isFetching}
        data={data}
        onPressNavigateTo="taskView"
        navigationParamName="task"
        listStyleSettings={item => ({
          header: item.field.nameLabel,
          bottomRightText: `${TaskType[item.type]} ( ${new Date(
            item.performanceDate,
          ).toLocaleDateString()} )`,
          alignment: 'left',
          customIco:
            // eslint-disable-next-line no-nested-ternary
            item.lastPausedAt && !item.closedAt ? (
              <ResumeIco
                color={theme === Theme.dark ? Colors.GREEN : Colors.WHITE}
              />
            ) : !item.lastPausedAt && !item.closedAt ? (
              <PlayIco
                color={theme === Theme.dark ? Colors.GREEN : Colors.WHITE}
              />
            ) : undefined,
          infoIco: true,
        })}
        filterFunction={filterTasks}
      />
    </ScreenBase>
  );
}
