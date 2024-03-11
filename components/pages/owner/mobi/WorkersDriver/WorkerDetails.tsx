import { ScreenBase } from '../common/ScreenBase';
import { WorkersDriverScreenProps } from '../../../../../types/self/navigation/Owner/props/workers/WorkersDriverProps';

export function WorkerDetails({
  route: {
    params: { worker },
  },
}: WorkersDriverScreenProps<
  'workerDetails',
  'workersDriver',
  'ownerRootDriver'
>) {
  if (!worker) return null;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { email, status, position, personalData, address } = worker;
  return <ScreenBase name={`${personalData.name} ${personalData.surname}`} />;
}
