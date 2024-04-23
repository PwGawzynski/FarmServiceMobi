import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { t } from 'i18next';
import { useQuery, useQueryClient } from '@tanstack/react-query';
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
import InfoIco from '../../../../assets/info.svg';

const TRANSLATIONS = {
  welcome: t(TranslationNames.workerScreens.activityDesktopRoot.welcome),
};

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
    initialData: undefined,
  });
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let es: any;
    (async () => {
      es = await Api.workerTasks({
        message: (m: TaskResponseBase[]) => {
          setIsFetching(false);
          queryClient.setQueryData(['workerTasks'], m);
        },
      });
    })();
    return () => {
      es.removeAllEventListeners();
      es.close();
    };
  }, []);
  const modalRef = useRef<BottomSheetModal>(null);
  const theme = useSelector(selectTheme);
  return (
    <ScreenBase
      bottomSheetsProps={{
        modalRef,
        snapPoints: ['50%', '70%'],
      }}
      name={`${TRANSLATIONS.welcome} ${name}`}
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
            item.lastPausedAt && !item.closedAt ? (
              <ResumeIco
                color={theme === Theme.dark ? Colors.GREEN : Colors.DARK_BLUE}
              />
            ) : (
              <InfoIco
                color={theme === Theme.dark ? Colors.GREEN : Colors.DARK_BLUE}
              />
            ),
          infoIco: true,
        })}
        filterFunction={filterTasks}
      />
    </ScreenBase>
  );
}
