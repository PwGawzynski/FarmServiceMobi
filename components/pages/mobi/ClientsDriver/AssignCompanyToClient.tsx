import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { t } from 'i18next';
import { ScreenBase } from '../common/ScreenBase';
import { ClientsDriverScreenProps } from '../../../../types/self/navigation/props/clients/ClientsDriverProps';
import { FormStatusPanel } from '../../../molecules/FormStatusPanel';
import { FormCreator } from '../../../atoms/FormCreator';
import { AppButton } from '../../../atoms/AppButton';
import { TranslationNames } from '../../../../locales/TranslationNames';
import { CreateCompanyForm } from '../AuthDriver/CreateCompany';
import { CreateClientsCompanyReqI } from '../../../../FarmServiceApiTypes/ClientsCompany/Requests';
import {
  assignCompanyToClient,
  createClient,
} from '../../../../api/clients/Client';
import { createCompanySetup } from '../../../../helepers/FormSetups/CreateCompanySetup';
import { ClientResponseBase } from '../../../../FarmServiceApiTypes/Clients/Responses';

export type CreateClientsCompanyForm = CreateClientsCompanyReqI['address'] &
  Omit<CreateClientsCompanyReqI, 'address'>;

const SCREEN_TITLE = t(
  TranslationNames.screens.clientDriver.assignCompanyToClient.screenTitle,
);
const BUTTON_TITLE = t(
  TranslationNames.screens.clientDriver.assignCompanyToClient.submitButton,
);

export function AssignCompanyToClient({
  route: { params },
  navigation,
}: ClientsDriverScreenProps<
  'assignCompanyToClient',
  'clientsDriver',
  'ownerRootDriver'
>) {
  const { client, editClient } = params;
  const personalData =
    client?.user.personal_data || editClient?.user.personal_data;
  const address = client?.user.address || editClient?.user.address;

  const defaultValues = {
    email: '',
    name: '',
    NIP: '',
    phoneNumber: personalData?.phone_number ?? '',
    city: address?.city ?? '',
    county: address?.county ?? '',
    apartmentNumber: address?.apartmentNumber ?? '',
    houseNumber: address?.houseNumber ?? '',
    postalCode: address?.postalCode ?? '',
    street: address?.street ?? '',
    voivodeship: address?.voivodeship ?? '',
  } as CreateClientsCompanyForm;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateClientsCompanyForm>({
    defaultValues,
  });
  const queryClient = useQueryClient();

  const { mutate, data, isPending, error, isSuccess } = useMutation({
    mutationFn: createClient,
    onSuccess: response => {
      queryClient.setQueryData(
        ['clients'],
        (oldData: Array<ClientResponseBase>) => {
          return oldData ? [...oldData, response] : [response];
        },
      );
    },
  });
  const {
    mutate: edit,
    data: editedData,
    isPending: isEditPending,
    error: editError,
    isSuccess: isEditSuccess,
  } = useMutation({
    mutationFn: assignCompanyToClient,
    onSuccess: response => {
      queryClient.setQueryData(
        ['clients'],
        (oldData: Array<ClientResponseBase>) => {
          if (editClient) editClient.company = response;
          return oldData
            ? [...oldData.filter(c => c.id !== editClient?.id), editClient]
            : [editClient];
        },
      );
    },
  });

  useEffect(() => {
    if (data && isSuccess) {
      navigation.navigate('OperationConfirmed', {
        shownMessage: `${t(
          TranslationNames.screens.clientDriver.assignCompanyToClient
            .successMessageStart,
        )} ${personalData?.name} ${personalData?.surname} ${t(
          TranslationNames.screens.clientDriver.assignCompanyToClient
            .successMessageEnd,
        )}`,
        redirectScreenName: 'clientsDesktop',
      });
    }
    if (editedData && isEditSuccess && editClient)
      navigation.navigate('clientDetails', {
        client: {
          ...editClient,
          company: editedData,
        },
      });
  }, [data, isSuccess, isEditSuccess, editedData, editClient]);

  const onSubmit = (formData: CreateCompanyForm) => {
    const company = {
      email: formData.email,
      name: formData.name,
      NIP: formData.NIP,
      phoneNumber: formData.phoneNumber,
      address: {
        city: formData.city,
        county: formData.county,
        street: formData.street?.length ? formData.street : undefined,
        apartmentNumber: formData.apartmentNumber?.length
          ? formData.apartmentNumber
          : undefined,
        voivodeship: formData.voivodeship,
        houseNumber: formData.houseNumber,
        postalCode: formData.postalCode,
      },
    };
    if (editClient) {
      edit({ client: editClient.id, ...company });
    } else {
      mutate({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        user: { ...(client?.user as any) },
        company,
      });
    }
  };

  return (
    <ScreenBase name={SCREEN_TITLE}>
      <FormStatusPanel
        infoText={t(
          TranslationNames.screens.clientDriver.assignCompanyToClient
            .pendingStatus,
        )}
        isVisible={isPending || isEditPending}
        error={error?.message || editError?.message}
      />
      <FormCreator
        controllerSetups={createCompanySetup(control)}
        errors={errors}
      />
      <AppButton
        className="flex-none max-h-10 mb-4"
        title={BUTTON_TITLE}
        onPress={handleSubmit(onSubmit)}
      />
    </ScreenBase>
  );
}
