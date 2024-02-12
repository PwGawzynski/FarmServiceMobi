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

import { createCompanySetup } from '../../../../helepers/FormSetups/CreateCompanySetup';
import { ClientResponseBase } from '../../../../FarmServiceApiTypes/Clients/Responses';
import {
  assignCompanyToClient,
  createClient,
  updateClientsCompany,
} from '../../../../api/clients/Client';

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
  const { onCreateClient, afterCreateClient, onEdit } = params;
  const personalData =
    onCreateClient?.user.personal_data ||
    afterCreateClient?.user?.personal_data;
  const address =
    onCreateClient?.user.address ||
    afterCreateClient?.user?.address ||
    onEdit?.company?.address;

  const defaultValues = {
    email: onEdit?.company?.email || '',
    name: onEdit?.company?.name || '',
    NIP: onEdit?.company?.NIP || '',
    phoneNumber:
      personalData?.phone_number || onEdit?.company?.phoneNumber || '',
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
    mutate: afterCreateMutate,
    data: afterCreateData,
    isPending: isAfterCreatePending,
    error: afterCreateError,
    isSuccess: isAfterCreateSuccess,
  } = useMutation({
    mutationFn: assignCompanyToClient,
    onSuccess: response => {
      queryClient.setQueryData(
        ['clients'],
        (oldData: Array<ClientResponseBase>) => {
          if (afterCreateClient) afterCreateClient.company = response;
          return oldData
            ? [
                ...oldData.filter(c => c.id !== afterCreateData?.id),
                afterCreateClient,
              ]
            : [afterCreateClient];
        },
      );
    },
  });

  const {
    mutate: onEditMutate,
    data: onEditData,
    isPending: isOnEditPending,
    error: onEditError,
    isSuccess: isOnEditSuccess,
  } = useMutation({
    mutationFn: updateClientsCompany,
    onSuccess: response => {
      queryClient.setQueryData(
        ['clients'],
        (oldData: Array<ClientResponseBase>) => {
          if (onEdit) onEdit.client.company = response;
          return oldData
            ? [
                ...oldData.filter(c => c.id !== onEdit?.client?.id),
                onEdit?.client,
              ]
            : [onEdit?.client];
        },
      );
    },
  });

  useEffect(() => {
    if (
      (data && isSuccess) ||
      (afterCreateData && isAfterCreateSuccess && afterCreateClient)
    ) {
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
    if (afterCreateData && isAfterCreateSuccess && afterCreateClient)
      navigation.navigate('clientDetails', {
        client: {
          id: afterCreateClient.id,
          user: afterCreateClient.user,
          email: afterCreateData.email,
          company: afterCreateData,
        },
      });
    if (onEditData && isOnEditSuccess && onEdit)
      navigation.navigate('clientDetails', {
        client: {
          id: onEdit.client.id,
          user: onEdit.client.user,
          email: onEditData.email,
          company: onEditData,
        },
      });
  }, [
    data,
    isSuccess,
    isAfterCreateSuccess,
    afterCreateData,
    afterCreateClient,
    onEditData,
    isOnEditSuccess,
    onEdit,
  ]);

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
    if (afterCreateClient) {
      afterCreateMutate({ client: afterCreateClient.id, ...company });
    } else if (onCreateClient) {
      mutate({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        user: { ...(onCreateClient?.user as any) },
        company,
      });
    } else if (onEdit) {
      onEditMutate({ ...company, company: onEdit.company.id });
    }
  };

  return (
    <ScreenBase name={SCREEN_TITLE}>
      <FormStatusPanel
        infoText={t(
          TranslationNames.screens.clientDriver.assignCompanyToClient
            .pendingStatus,
        )}
        isVisible={isPending || isAfterCreatePending || isOnEditPending}
        error={
          error?.message || afterCreateError?.message || onEditError?.message
        }
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
