import { XStack, YStack } from 'tamagui';
import { useMutation } from '@tanstack/react-query';
import { ScreenBase } from '../common/ScreenBase';
import { WorkersDriverScreenProps } from '../../../../../types/self/navigation/Owner/props/workers/WorkersDriverProps';
import { EntityAsACard } from '../../../../molecules/EntityAsACard';
import { Selector } from '../../../../molecules/Selector';
import {
  Position,
  Status,
} from '../../../../../FarmServiceApiTypes/Worker/Enums';
import { CallAndMailPanel } from '../../../../molecules/CallAndMailPanel';
import { updateWorkerStatusOrPosition } from '../../../../../api/worker/Worker';

type enumType = { [key: string]: string | number };
const makeArray = (e: enumType) =>
  Object.keys(e)
    .map(key => e[key])
    .filter(_e => typeof _e === 'string') as Array<string>;

const findEnumVal = (e: enumType, value: string) =>
  Object.keys(e)
    .filter(k => Number.isNaN(Number(k)))
    .findIndex(key => key.toLowerCase() === value.toLowerCase());
export function WorkerDetails({
  route: {
    params: { worker },
  },
}: WorkersDriverScreenProps<
  'workerDetails',
  'workersDriver',
  'ownerRootDriver'
>) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, email, status, position, personalData, address } = worker;
  const { data, mutate } = useMutation({
    mutationKey: ['updateWorkerStatusOrPosition', id],
    mutationFn: updateWorkerStatusOrPosition,
  });
  console.log(data, 'data-worker-details');
  if (!worker) return null;
  return (
    <ScreenBase name={`${personalData.name} ${personalData.surname}`}>
      <YStack justifyContent="space-between" f={1}>
        <YStack>
          <EntityAsACard
            data={personalData}
            names={{
              name: 'Name',
              surname: 'Surname',
              phoneNumber: 'Phone number',
            }}
            cardName="Personal"
            topRightButtonName="Edit"
            omittedKeys={['name', 'surname']}
          />
          <EntityAsACard
            data={address}
            names={{
              city: 'City',
              street: 'Street',
              houseNumber: 'House number',
              county: 'County',
              apartmentNumber: 'Apartment number',
              postalCode: 'Postal code',
              voivodeship: 'Voivodeship',
            }}
            cardName="Address"
            topRightButtonName="Edit"
          />
          <YStack className="mt-4 mb-4">
            <Selector
              initialValue={
                status !== undefined ? Status[status].toLowerCase() : ''
              }
              items={makeArray(Status).map(e => ({ name: e }))}
              description="Status"
              itemListLabel="Choose role"
              onValueChange={v => {
                console.log(findEnumVal(Status, v));
                mutate({ status: findEnumVal(Status, v), worker: id });
              }}
            />
          </YStack>
          <YStack className="mt-4 mb-4">
            <Selector
              initialValue={
                position !== undefined ? Position[position].toLowerCase() : ''
              }
              items={makeArray(Position).map(e => ({ name: e }))}
              description="Position"
              itemListLabel="Choose role"
              onValueChange={v => {
                console.log(findEnumVal(Position, v));
                mutate({ position: findEnumVal(Position, v), worker: id });
              }}
            />
          </YStack>
        </YStack>
        <XStack mt="$4">
          <CallAndMailPanel
            callButtonProps={{ phoneNumber: personalData.phoneNumber }}
            mailButtonProps={{
              emailOptions: {
                body: 'Send from FarmService T.M',
                recipients: [email],
              },
            }}
          />
        </XStack>
      </YStack>
    </ScreenBase>
  );
}
