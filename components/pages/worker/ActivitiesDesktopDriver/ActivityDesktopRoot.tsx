import { ScreenBase } from '../../owner/mobi/common/ScreenBase';
import { ActivitiesDesktopDriverScreenProps } from '../../../../types/self/navigation/Worker/props/activities/WorkerActivitiesDesktopDriverProps';

export function ActivityDesktopRoot({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  navigation,
}: ActivitiesDesktopDriverScreenProps<
  'workerLastActivities',
  'workerActivityDesktopRoot',
  'workerActivityDriver',
  'workerRootDriver'
>) {
  return <ScreenBase name="Worker Last Activities" />;
}
