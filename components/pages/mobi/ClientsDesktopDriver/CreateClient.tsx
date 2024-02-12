import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { ScreenBase } from '../common/ScreenBase';
import { CreateClientReqI } from '../../../../FarmServiceApiTypes/Clients/Requests';
import { FormCreator } from '../../../atoms/FormCreator';
import { AppButton } from '../../../atoms/AppButton';
import { PendingInfo } from '../../../atoms/PendingInfo';
import { FormErrorInfo } from '../../../atoms/FormErrorInfo';
import { createClient } from '../../../../api/clients/Client';
import { CreateUserReqI } from '../../../../FarmServiceApiTypes/User/Requests';
import { TranslationNames } from '../../../../locales/TranslationNames';
import { ClientsDesktopDriverScreenProps } from '../../../../types/self/navigation/props/clients/ClientsDesktopDriverProps';
import { ClientResponseBase } from '../../../../FarmServiceApiTypes/Clients/Responses';
import { TwoOptionAlert } from '../../../molecules/TwoOptionAlert';
import { createClientSetup } from '../../../../helepers/FormSetups/CreateClientSetup';

export type CreateClientForm = Pick<CreateClientReqI['user'], 'email'> &
  CreateUserReqI['personal_data'] &
  CreateClientReqI['user']['address'];

const CLEAR_TIMEOUT = 500;
const SCREEN_NAME = t(
  TranslationNames.screens.clientDesktopDriver.createClient.screenTitle,
);
const SUCCESS_MESSAGE = t(
  TranslationNames.screens.clientDesktopDriver.createClient.successMessage,
);
const BUTTON_VALUE = t(
  TranslationNames.screens.clientDesktopDriver.createClient.submitButton,
);

function prepeareDefaultValues(client?: ClientResponseBase): CreateClientForm {
  return {
    email: client?.email || '',
    name: client?.user.personal_data.name || '',
    surname: client?.user.personal_data.surname || '',
    phone_number: client?.user.personal_data.phone_number || '',
    city: client?.user.address.city || '',
    county: client?.user.address.county || '',
    apartmentNumber: client?.user.address.apartmentNumber || '',
    houseNumber: client?.user.address.houseNumber || '',
    postalCode: client?.user.address.postalCode || '',
    street: client?.user.address.street || '',
    voivodeship: client?.user.address.voivodeship || '',
  } as CreateClientForm;
}

const convertFormDataToRequestType = (
  data: CreateClientForm,
): CreateClientReqI => ({
  user: {
    email: data.email,
    personal_data: {
      name: data.name,
      surname: data.surname,
      phone_number: data.phone_number,
    },
    address: {
      city: data.city,
      county: data.county,
      street: data.street?.length ? data.street : undefined,
      apartmentNumber: data.apartmentNumber?.length
        ? data.apartmentNumber
        : undefined,
      voivodeship: data.voivodeship,
      houseNumber: data.houseNumber,
      postalCode: data.postalCode,
    },
  },
});

// TODO -> addres data based on location
export function CreateClient({
  navigation,
  route: { params },
}: ClientsDesktopDriverScreenProps<
  'createClient',
  'clientsDesktopRoot',
  'clientsDriver',
  'ownerRootDriver'
>) {
  const client = params?.client;

  const {
    control,
    reset,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<CreateClientForm>({
    defaultValues: prepeareDefaultValues(client),
  });
  const queryClient = useQueryClient();
  const { mutate, data, isPending, error, isSuccess } = useMutation({
    mutationFn: createClient,
    onSuccess: (sth, variables) => {
      queryClient.setQueryData(
        ['clients'],
        (oldData: Array<ClientResponseBase>) => {
          return oldData ? [...oldData, variables] : [variables];
        },
      );
    },
  });
  useEffect(() => {
    if (data && isSuccess) {
      navigation.navigate('OperationConfirmed', {
        shownMessage: SUCCESS_MESSAGE,
        redirectScreenName: 'clientsDesktop',
      });
      const timeOutId = setTimeout(() => reset(), CLEAR_TIMEOUT);
      return () => clearTimeout(timeOutId);
    }
    return undefined;
  }, [data, isSuccess]);

  const [alert, setAlert] = useState(false);

  const onSubmit = () => {
    setAlert(true);
  };

  return (
    <ScreenBase name={SCREEN_NAME}>
      <TwoOptionAlert
        open={alert}
        title={t(
          TranslationNames.screens.clientDesktopDriver.createClient.alertTitle,
        )}
        description={t(
          TranslationNames.screens.clientDesktopDriver.createClient
            .alertDescription,
        )}
        leftButtonText={t(
          TranslationNames.screens.clientDesktopDriver.createClient
            .alertGoWithoutButton,
        )}
        rightButtonText={t(
          TranslationNames.screens.clientDesktopDriver.createClient
            .alertCreateButton,
        )}
        onLeftButtonClick={async () => {
          setAlert(false);
          mutate(convertFormDataToRequestType(getValues()));
        }}
        onRightButtonClick={async () => {
          setAlert(false);
          navigation.navigate('assignCompanyToClient', {
            onCreateClient: convertFormDataToRequestType(getValues()),
          });
        }}
      />
      <View className="w-full h-6 mt-2 overflow-hidden flex-row justify-center items-center">
        <PendingInfo
          isVisible={isPending}
          infoText={t(
            TranslationNames.screens.clientDesktopDriver.createClient
              .pendingStatus,
          )}
        />
        {error && <FormErrorInfo error={error.message} />}
      </View>
      <FormCreator
        controllerSetups={createClientSetup(control, () => {
          setValue('phone_number', '+48 ');
        })}
        errors={errors}
      />
      <AppButton
        className="max-h-10"
        title={BUTTON_VALUE}
        onPress={handleSubmit(onSubmit)}
      />
    </ScreenBase>
  );
}
