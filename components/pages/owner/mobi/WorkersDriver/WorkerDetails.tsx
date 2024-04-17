import { XStack, YStack } from 'tamagui';
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { useState } from 'react';
import { t } from 'i18next';
import Toast from 'react-native-toast-message';
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
import { ClientResponseBase } from '../../../../../FarmServiceApiTypes/Clients/Responses';
import { WorkerResponseBase } from '../../../../../FarmServiceApiTypes/Worker/Responses';
import { UpdateWorkerStatusOrPositionReqI } from '../../../../../FarmServiceApiTypes/Worker/Requests';
import { AddressResponseBase } from '../../../../../FarmServiceApiTypes/Address/Ressponses';
import { AsAny } from '../../../../../helepers/typing';
import { TranslationNames } from '../../../../../locales/TranslationNames';
import { PersonalDataBase } from '../../../../../FarmServiceApiTypes/UserPersonalData/Responses';
import { findEnumVal, makeArray } from '../../../../../helepers/MakeArray';

const cacheResponse = (
  response: WorkerResponseBase | undefined,
  queryClient: QueryClient,
) => {
  queryClient.setQueryData(
    ['workers'],
    (oldData: Array<ClientResponseBase>) => {
      // eslint-disable-next-line no-param-reassign
      return oldData
        ? [...oldData.filter(c => c.id !== response?.id), response]
        : [response];
    },
  );
};

const AddressTranslations = {
  street: t(TranslationNames.addressForm.formPlaceholder.street),
  city: t(TranslationNames.addressForm.formPlaceholder.city),
  county: t(TranslationNames.addressForm.formPlaceholder.county),
  postalCode: t(TranslationNames.addressForm.formPlaceholder.postalCode),
  houseNumber: t(TranslationNames.addressForm.formPlaceholder.houseNumber),
  apartmentNumber: t(
    TranslationNames.addressForm.formPlaceholder.apartmentNumber,
  ),
  voivodeship: t(TranslationNames.addressForm.formPlaceholder.voivodeship),
} as AsAny<AddressResponseBase>;

const PersonalDataTranslations = {
  name: t(TranslationNames.createClientForm.formPlaceholder.name),
  surname: t(TranslationNames.createClientForm.formPlaceholder.surname),
  phoneNumber: t(TranslationNames.createClientForm.formPlaceholder.phoneNumber),
} as AsAny<PersonalDataBase>;

const TRANSLATIONS = {
  personalData: t(
    TranslationNames.screens.ownerRootDriver.workerDetails.personalData,
  ),
  editButton: t(
    TranslationNames.screens.ownerRootDriver.workerDetails.editButton,
  ),
  address: t(TranslationNames.screens.ownerRootDriver.workerDetails.address),
  status: t(TranslationNames.screens.ownerRootDriver.workerDetails.status),
  choose: t(TranslationNames.screens.ownerRootDriver.workerDetails.choose),
  position: t(TranslationNames.screens.ownerRootDriver.workerDetails.position),
  sign: t(TranslationNames.components.CallAndMailPanel.sign),
};

export function WorkerDetails({
  route: {
    params: { worker: givenWorker },
  },
}: WorkersDriverScreenProps<
  'workerDetails',
  'workersDriver',
  'ownerRootDriver'
>) {
  const [worker, setWorker] = useState(givenWorker);
  const queryClient = useQueryClient();
  // used to store data used in mutation to determine with param has been updated
  const [mutationData, setMutationData] = useState<
    UpdateWorkerStatusOrPositionReqI | undefined
  >(undefined);
  const { mutate, isPending } = useMutation({
    mutationKey: ['updateWorkerStatusOrPosition', worker.id],
    mutationFn: (data: UpdateWorkerStatusOrPositionReqI) => {
      setMutationData(data);
      return updateWorkerStatusOrPosition(data);
    },
    onSuccess: res => {
      if (res) setWorker(res);
      cacheResponse(res, queryClient);
    },
    onError: () => {
      Toast.show({
        type: 'error',
        text1: t(TranslationNames.components.toast.workerUpdateErrorHeader),
        text2: t(TranslationNames.components.toast.workerUpdateErrorContext),
      });
    },
  });

  if (!worker) return null;
  return (
    <ScreenBase
      name={`${worker.personalData.name} ${worker.personalData.surname}`}
    >
      <YStack justifyContent="space-between" f={1}>
        <YStack>
          <EntityAsACard
            data={worker.personalData}
            names={{
              name: PersonalDataTranslations.name,
              surname: PersonalDataTranslations.surname,
              phoneNumber: PersonalDataTranslations.phoneNumber,
            }}
            cardName={TRANSLATIONS.personalData}
            topRightButtonName={TRANSLATIONS.editButton}
            omittedKeys={['name', 'surname']}
          />
          <EntityAsACard
            data={worker.address}
            names={{
              city: AddressTranslations.city,
              street: AddressTranslations.street,
              houseNumber: AddressTranslations.houseNumber,
              county: AddressTranslations.county,
              apartmentNumber: AddressTranslations.apartmentNumber,
              postalCode: AddressTranslations.postalCode,
              voivodeship: AddressTranslations.voivodeship,
            }}
            cardName={TRANSLATIONS.address}
            topRightButtonName={TRANSLATIONS.editButton}
          />
          <YStack className="mt-4 mb-4">
            <Selector
              value={
                worker.status !== undefined
                  ? Status[worker.status].toLowerCase()
                  : ''
              }
              pending={isPending && mutationData?.status !== undefined}
              items={makeArray(Status).map(e => ({ name: e }))}
              description={TRANSLATIONS.status}
              itemListLabel={`${TRANSLATIONS.choose} ${TRANSLATIONS.status}:`}
              onValueChange={v => {
                mutate({ status: findEnumVal(Status, v), worker: worker.id });
              }}
            />
          </YStack>
          <YStack className="mt-4 mb-4">
            <Selector
              pending={isPending && mutationData?.position !== undefined}
              value={
                worker.position !== undefined
                  ? Position[worker.position].toLowerCase()
                  : ''
              }
              items={makeArray(Position).map(e => ({ name: e }))}
              description={TRANSLATIONS.position}
              itemListLabel={`${TRANSLATIONS.choose} ${TRANSLATIONS.position}:`}
              onValueChange={v => {
                mutate({
                  position: findEnumVal(Position, v),
                  worker: worker.id,
                });
              }}
            />
          </YStack>
        </YStack>
        <XStack mt="$4">
          <CallAndMailPanel
            callButtonProps={{ phoneNumber: worker.personalData.phoneNumber }}
            mailButtonProps={{
              emailOptions: {
                body: TRANSLATIONS.sign,
                recipients: [worker.email],
              },
            }}
          />
        </XStack>
      </YStack>
    </ScreenBase>
  );
}
