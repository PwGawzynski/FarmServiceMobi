import { ScreenBase } from '../owner/mobi/common/ScreenBase';
import { WorkerRootDriverScreenProps } from '../../../types/self/navigation/Worker/props/WorkerRootDriverProps';

export function Work({
  route: { params },
}: WorkerRootDriverScreenProps<'work', 'workerRootDriver'>) {
  const { task } = params;
  console.log(task);
  return <ScreenBase />;
}
