import { useForm } from 'react-hook-form';
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { useEffect } from 'react';
import { t } from 'i18next';
import { ScreenBase } from '../common/ScreenBase';
import { CreateClientsCompanyReqI } from '../../../../../FarmServiceApiTypes/ClientsCompany/Requests';
import { TranslationNames } from '../../../../../locales/TranslationNames';
import { ClientsCompanyResponseBase } from '../../../../../FarmServiceApiTypes/ClientsCompany/Responses';
import { ClientResponseBase } from '../../../../../FarmServiceApiTypes/Clients/Responses';
import { ClientsDriverScreenProps } from '../../../../../types/self/navigation/Owner/props/clients/ClientsDriverProps';
import {
  assignCompanyToClient,
  createClient,
  updateClientsCompany,
} from '../../../../../api/clients/Client';
import { CreateCompanyForm } from '../AuthDriver/CreateCompany';
import { FormStatusPanel } from '../../../../molecules/FormStatusPanel';
import { FormCreator } from '../../../../atoms/FormCreator';
import { createClientCompanySetup } from '../../../../../helepers/FormSetups/CreateCompanySetup';
import { AppButton } from '../../../../atoms/AppButton';

export type CreateClientsCompanyForm = CreateClientsCompanyReqI['address'] &
  Omit<CreateClientsCompanyReqI, 'address'>;

const SCREEN_TITLE = t(
  TranslationNames.screens.clientDriver.assignCompanyToClient.screenTitle,
);
const WHEN_ASSIGNATION_BUTTON_TITLE = t(
  TranslationNames.screens.clientDriver.assignCompanyToClient
    .assignationSubmitButton,
);
const WHEN_CREATE_BUTTON_TITLE = t(
  TranslationNames.screens.clientDriver.assignCompanyToClient
    .createSubmitButton,
);
const WHEN_EDIT_BUTTON_TITLE = t(
  TranslationNames.screens.clientDriver.assignCompanyToClient.editSubmitButton,
);

const cachingAssignationResponse = (
  response: ClientsCompanyResponseBase | undefined,
  queryClient: QueryClient,
  givenScreenClient: ClientResponseBase | undefined,
) => {
  queryClient.setQueryData(
    ['clients'],
    (oldData: Array<ClientResponseBase>) => {
      // eslint-disable-next-line no-param-reassign
      if (givenScreenClient) givenScreenClient.company = response;
      return oldData
        ? [
            ...oldData.filter(c => c.id !== givenScreenClient?.id),
            givenScreenClient,
          ]
        : [givenScreenClient];
    },
  );
};

const cachingCreateResponse = (
  response: ClientResponseBase | undefined,
  queryClient: QueryClient,
) => {
  queryClient.setQueryData(
    ['clients'],
    (oldData: Array<ClientResponseBase>) => {
      return oldData ? [...oldData, response] : [response];
    },
  );
};

const cachingEditResponse = (
  response: ClientsCompanyResponseBase | undefined,
  queryClient: QueryClient,
  onEdit:
    | { client: ClientResponseBase; company: ClientsCompanyResponseBase }
    | undefined,
) => {
  queryClient.setQueryData(
    ['clients'],
    (oldData: Array<ClientResponseBase>) => {
      // eslint-disable-next-line no-param-reassign
      if (onEdit) onEdit.client.company = response;
      return oldData
        ? [...oldData.filter(c => c.id !== onEdit?.client?.id), onEdit?.client]
        : [onEdit?.client];
    },
  );
};

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
    onCreateClient?.user.personalData || afterCreateClient?.user?.personalData;
  const address =
    onCreateClient?.user.address ||
    afterCreateClient?.user?.address ||
    onEdit?.company?.address;

  const defaultValues = {
    email: onEdit?.company?.email || '',
    name: onEdit?.company?.name || '',
    NIP: onEdit?.company?.NIP || '',
    phoneNumber:
      personalData?.phoneNumber || onEdit?.company?.phoneNumber || '',
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
    onSuccess: res => cachingCreateResponse(res, queryClient),
  });

  const {
    mutate: afterCreateMutate,
    data: afterCreateData,
    isPending: isAfterCreatePending,
    error: afterCreateError,
    isSuccess: isAfterCreateSuccess,
  } = useMutation({
    mutationFn: assignCompanyToClient,
    onSuccess: res =>
      cachingAssignationResponse(res, queryClient, afterCreateClient),
  });

  const {
    mutate: onEditMutate,
    data: onEditData,
    isPending: isOnEditPending,
    error: onEditError,
    isSuccess: isOnEditSuccess,
  } = useMutation({
    mutationFn: updateClientsCompany,
    onSuccess: res => cachingEditResponse(res, queryClient, onEdit),
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
        controllerSetups={createClientCompanySetup(control)}
        errors={errors}
      />
      <AppButton
        className="flex-none max-h-10 mb-4"
        title={
          (onEdit && WHEN_EDIT_BUTTON_TITLE) ||
          (afterCreateClient && WHEN_ASSIGNATION_BUTTON_TITLE) ||
          (onCreateClient && WHEN_CREATE_BUTTON_TITLE) ||
          ''
        }
        onPress={handleSubmit(onSubmit)}
      />
    </ScreenBase>
  );
}
