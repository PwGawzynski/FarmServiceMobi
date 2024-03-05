import { useSelector } from 'react-redux';
import { ScreenBase } from '../../owner/mobi/common/ScreenBase';
import { ActivitiesDesktopDriverScreenProps } from '../../../../types/self/navigation/Worker/props/activities/WorkerActivitiesDesktopDriverProps';
import { selectWorker } from '../../../../src/redux/feature/workerSlice';

export function ActivityDesktopRoot({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  navigation,
}: ActivitiesDesktopDriverScreenProps<
  'workerLastActivities',
  'workerActivityDesktopRoot',
  'workerActivityDriver',
  'workerRootDriver'
>) {
  const worker = useSelector(selectWorker);
  const name = worker?.personalData.name;
  return <ScreenBase name={`Welcome ${name}`} />;
}
