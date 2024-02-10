import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
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
import { createClient } from '../../../../api/clients/Client';
import { createCompanySetup } from '../../../../helepers/FormSetups/CreateCompanySetup';

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
  const { client } = params;

  const {
    user: { address, personal_data: personalData },
  } = client;

  const defaultValues = {
    email: '',
    name: '',
    NIP: '',
    phoneNumber: personalData.phone_number ?? '',
    city: address.city ?? '',
    county: address.county ?? '',
    apartmentNumber: address.apartmentNumber ?? '',
    houseNumber: address.houseNumber ?? '',
    postalCode: address.postalCode ?? '',
    street: address.street ?? '',
    voivodeship: address.voivodeship ?? '',
  } as CreateClientsCompanyForm;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateClientsCompanyForm>({
    defaultValues,
  });

  const { mutate, data, isPending, error, isSuccess } = useMutation({
    mutationFn: createClient,
  });

  useEffect(() => {
    if (data && isSuccess) {
      navigation.navigate('OperationConfirmed', {
        shownMessage: `${t(
          TranslationNames.screens.clientDriver.assignCompanyToClient
            .successMessageStart,
        )} ${personalData.name} ${personalData.surname} ${t(
          TranslationNames.screens.clientDriver.assignCompanyToClient
            .successMessageEnd,
        )}`,
        redirectScreenName: 'clientsDesktop',
      });
    }
  }, [data, isSuccess]);

  const onSubmit = (formData: CreateCompanyForm) =>
    mutate({
      user: { ...client.user },
      company: {
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
      },
    });

  return (
    <ScreenBase name={SCREEN_TITLE}>
      <FormStatusPanel isVisible={isPending} error={error?.message} />
      <FormCreator
        controllerSetups={createCompanySetup(control)}
        errors={errors}
        onSubmit={onSubmit}
      />
      <AppButton
        className="flex-none max-h-10 mb-4"
        title={BUTTON_TITLE}
        onPress={handleSubmit(onSubmit)}
      />
    </ScreenBase>
  );
}
