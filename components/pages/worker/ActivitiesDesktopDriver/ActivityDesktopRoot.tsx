import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { ScreenBase } from '../../owner/mobi/common/ScreenBase';
import { ActivitiesDesktopDriverScreenProps } from '../../../../types/self/navigation/Worker/props/activities/WorkerActivitiesDesktopDriverProps';
import { selectUser } from '../../../../src/redux/feature/userSlice';

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
  useEffect(() => {
    /* Api.workerTasks({
      open: m => console.log(m),
      message: m => console.log(m),
      error: m => console.log(m),
    }); */
  }, []);
  return <ScreenBase name={`Welcome ${name}`} />;
}
