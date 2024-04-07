import { useQuery } from '@tanstack/react-query';
import { ScreenBase } from '../common/ScreenBase';
import { getAllMachines } from '../../../../../api/Machine/Machine';

export function MachineDesktop() {
  const { data } = useQuery({
    queryKey: ['machines'],
    queryFn: getAllMachines,
  });
  console.log(data);
  return <ScreenBase name="machine desktop" />;
}
