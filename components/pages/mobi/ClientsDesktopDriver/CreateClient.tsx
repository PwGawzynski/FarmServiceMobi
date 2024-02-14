import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { t } from 'i18next';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ScreenBase } from '../common/ScreenBase';
import {
  CreateClientReqI,
  UpdateClientReqI,
} from '../../../../FarmServiceApiTypes/Clients/Requests';
import { FormCreator } from '../../../atoms/FormCreator';
import { AppButton } from '../../../atoms/AppButton';
import { PendingInfo } from '../../../atoms/PendingInfo';
import { FormErrorInfo } from '../../../atoms/FormErrorInfo';
import { createClient, updateClient } from '../../../../api/clients/Client';
import { CreateUserReqI } from '../../../../FarmServiceApiTypes/User/Requests';
import { TranslationNames } from '../../../../locales/TranslationNames';
import { ClientsDesktopDriverScreenProps } from '../../../../types/self/navigation/props/clients/ClientsDesktopDriverProps';
import { ClientResponseBase } from '../../../../FarmServiceApiTypes/Clients/Responses';
import { TwoOptionAlert } from '../../../molecules/TwoOptionAlert';
import { createClientSetup } from '../../../../helepers/FormSetups/CreateClientSetup';

interface AlertI {
  status: boolean;
  title: string | undefined;
  description: string | undefined;
  leftButtonText: string | undefined;
  rightButtonText: string | undefined;
  onLeftButtonClick?: () => void;
  onRightButtonClick?: () => void;
}

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
const EDIT_BUTTON_VALUE = t(
  TranslationNames.screens.clientDesktopDriver.createClient.editSubmitButton,
);

function prepareDefaultValues(client?: ClientResponseBase): CreateClientForm {
  return {
    email: client?.email || '',
    name: client?.user.personal_data.name || '',
    surname: client?.user.personal_data.surname || '',
    phoneNumber: client?.user.personal_data.phoneNumber || '',
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
      phoneNumber: data.phoneNumber,
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
const convertFormDataToEditRequestType = (
  data: CreateClientForm,
  client: ClientResponseBase,
): UpdateClientReqI => ({
  client: client.id,
  email: data.email,
  personal_data: {
    name: data.name,
    surname: data.surname,
    phoneNumber: data.phoneNumber,
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
});

const initCompanyAskAlert: AlertI = {
  status: false,
  title: t(
    TranslationNames.screens.clientDesktopDriver.createClient.alertTitle,
  ),
  description: t(
    TranslationNames.screens.clientDesktopDriver.createClient.alertDescription,
  ),
  leftButtonText: t(
    TranslationNames.screens.clientDesktopDriver.createClient
      .alertGoWithoutButton,
  ),
  rightButtonText: t(
    TranslationNames.screens.clientDesktopDriver.createClient.alertCreateButton,
  ),
  onLeftButtonClick: undefined,
  onRightButtonClick: undefined,
};

const screeBlurAlert: AlertI = {
  status: false,
  title: t(
    TranslationNames.screens.clientDesktopDriver.createClient
      .alertOnScreenBlurTitle,
  ),
  description: t(
    TranslationNames.screens.clientDesktopDriver.createClient
      .alertOnScreenBlurDescription,
  ),
  leftButtonText: t(
    TranslationNames.screens.clientDesktopDriver.createClient
      .alertOnScreenBlurLeaveButton,
  ),
  rightButtonText: t(
    TranslationNames.screens.clientDesktopDriver.createClient
      .alertOnScreenBlurStayButton,
  ),
};

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
    formState: { errors, isDirty },
  } = useForm<CreateClientForm>({
    defaultValues: useMemo(
      () => prepareDefaultValues(client),
      [params?.client],
    ),
  });
  useEffect(
    () => reset(prepareDefaultValues(params?.client)),
    [params?.client],
  );

  /**
   * @description this query is used when creating a new client
   */
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

  /**
   * @description this query is used when editing an existing client
   */
  const {
    mutate: onEditMutate,
    data: onEditData,
    isPending: isEditPending,
    error: editError,
    isSuccess: isEditSuccess,
  } = useMutation({
    mutationFn: updateClient,
    onSuccess: (sth, variables) => {
      queryClient.setQueryData(
        ['clients'],
        (oldData: Array<ClientResponseBase>) => {
          console.log(variables);
          return oldData ? [...oldData, sth] : [sth];
        },
      );
    },
  });

  /**
   * @description navigation driver
   */
  useEffect(() => {
    if (data && isSuccess) {
      navigation.navigate('OperationConfirmed', {
        shownMessage: SUCCESS_MESSAGE,
        redirectScreenName: 'clientsDesktop',
      });
      const timeOutId = setTimeout(
        () => reset(prepareDefaultValues()),
        CLEAR_TIMEOUT,
      );
      return () => clearTimeout(timeOutId);
    }
    if (onEditData && isEditSuccess) {
      // to prevent showing the add customer screen after goBack action in redirected screen
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      navigation.push('clientsDesktopRoot' as any);
      navigation.navigate('clientDetails', { client: onEditData });
      const timeOutId = setTimeout(
        () => reset(prepareDefaultValues()),
        CLEAR_TIMEOUT,
      );
      return () => clearTimeout(timeOutId);
    }
    return undefined;
  }, [data, isSuccess, client, onEditData, isEditSuccess]);

  const [alert, setAlert] = useState<AlertI>({
    ...initCompanyAskAlert,
    onLeftButtonClick: async () => {
      setAlert(prevState => ({ ...prevState, status: false }));
      mutate(convertFormDataToRequestType(getValues()));
    },
    onRightButtonClick: async () => {
      setAlert(prevState => ({ ...prevState, status: false }));
      navigation.navigate('assignCompanyToClient', {
        onCreateClient: convertFormDataToRequestType(getValues()),
      });
    },
  });

  /**
   * @description this ref is used to check if the form is dirty, because we must use ref in listener
   */
  const isDirtyRef = useRef<boolean>();
  useEffect(() => {
    isDirtyRef.current = isDirty;
  }, [isDirty]);

  /**
   * @description this listener is used to show the alert when the screen is blurred
   */
  useEffect(() => {
    navigation.addListener('blur', () => {
      if (isDirtyRef.current)
        setAlert({
          ...screeBlurAlert,
          status: true,
          onLeftButtonClick: () => {
            reset(prepareDefaultValues());
            setAlert(prevState => ({ ...prevState, status: false }));
          },
          onRightButtonClick: () => {
            navigation.goBack();
            setAlert(prevState => ({ ...prevState, status: false }));
          },
        });
    });
    navigation.removeListener('blur', () => {});
  }, []);

  const onSubmit = () => {
    if (!client) setAlert(prevState => ({ ...prevState, status: true }));
    else onEditMutate(convertFormDataToEditRequestType(getValues(), client));
  };

  return (
    <ScreenBase name={SCREEN_NAME}>
      <TwoOptionAlert
        open={alert.status}
        title={alert.title}
        description={alert.description}
        leftButtonText={alert.leftButtonText}
        rightButtonText={alert.rightButtonText}
        onLeftButtonClick={alert.onLeftButtonClick}
        onRightButtonClick={alert.onRightButtonClick}
      />
      <View className="w-full h-6 mt-2 overflow-hidden flex-row justify-center items-center">
        <PendingInfo
          isVisible={isPending || isEditPending}
          infoText={t(
            TranslationNames.screens.clientDesktopDriver.createClient
              .pendingStatus,
          )}
        />
        <FormErrorInfo error={error?.message || editError?.message} />
      </View>
      <FormCreator
        controllerSetups={createClientSetup(control, () => {
          setValue('phoneNumber', '+48 ');
        })}
        errors={errors}
      />
      <AppButton
        className="max-h-10"
        title={client ? EDIT_BUTTON_VALUE : BUTTON_VALUE}
        onPress={handleSubmit(onSubmit)}
      />
    </ScreenBase>
  );
}
