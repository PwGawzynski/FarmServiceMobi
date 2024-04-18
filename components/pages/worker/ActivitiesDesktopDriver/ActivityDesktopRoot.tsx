import { useSelector } from 'react-redux';
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
  console.log(user?.personalData.name);
  const name = user?.personalData.name;
  return <ScreenBase name={`Welcome ${name}`} />;
}
