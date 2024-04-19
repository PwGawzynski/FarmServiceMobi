import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { t } from 'i18next';
import { ScreenBase } from '../../owner/mobi/common/ScreenBase';
import { ActivitiesDesktopDriverScreenProps } from '../../../../types/self/navigation/Worker/props/activities/WorkerActivitiesDesktopDriverProps';
import { selectUser } from '../../../../src/redux/feature/userSlice';
import { Api } from '../../../../api/Api';
import { TaskResponseBase } from '../../../../FarmServiceApiTypes/Task/Responses';
import List from '../../../organisms/List';
import { TaskType } from '../../../../FarmServiceApiTypes/Task/Enums';
import { filterTasks } from '../../../../helepers/filterFunctions';
import { TranslationNames } from '../../../../locales/TranslationNames';

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
  const [tasks, setTasks] = useState<TaskResponseBase[]>([]);
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let es: any;
    (async () => {
      const eventSource = await Api.workerTasks({
        message: (m: TaskResponseBase[]) => setTasks(m),
      });
      es = eventSource;
    })();
    return () => {
      es.removeAllEventListeners();
      es.close();
    };
  }, []);
  const modalRef = useRef<BottomSheetModal>(null);
  return (
    <ScreenBase
      bottomSheetsProps={{
        modalRef,
        snapPoints: ['50%', '70%'],
      }}
      name={`${TRANSLATIONS.welcome} ${name}`}
    >
      <List<TaskResponseBase>
        isFetching={false}
        isError={false}
        isLoading={false}
        data={tasks}
        onPressNavigateTo="taskView"
        navigationParamName="task"
        modalRef={modalRef}
        listStyleSettings={item => ({
          header: item.field.nameLabel,
          bottomRightText: `${TaskType[item.type]} ( ${new Date(
            item.performanceDate,
          ).toLocaleDateString()} )`,
          alignment: 'left',
          infoIco: true,
        })}
        filterFunction={filterTasks}
      />
    </ScreenBase>
  );
}
