import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { useMutation } from '@tanstack/react-query';
import { t } from 'i18next';
import { useEffect } from 'react';
import { ScreenBase } from '../common/ScreenBase';
import { CreateClientReqI } from '../../../../FarmServiceApiTypes/Clients/Requests';
import { FormControllerSetup, FormCreator } from '../../../atoms/FormCreator';
import { AppButton } from '../../../atoms/AppButton';
import { PendingInfo } from '../../../atoms/PendingInfo';
import { FormErrorInfo } from '../../../atoms/FormErrorInfo';
import { createCompany } from '../../../../api/clients/Client';
import { CreateUserReqI } from '../../../../FarmServiceApiTypes/User/Requests';
import { rules } from '../../../../helepers/FormRules/CreateClientFormRules';
import { TranslationNames } from '../../../../locales/TranslationNames';
import { ClientsDesktopDriverScreenProps } from '../../../../types/self/navigation/props/clients/ClientsDesktopDriverProps';

export type CreateClientForm = Pick<CreateClientReqI['user'], 'email'> &
  CreateUserReqI['personal_data'] &
  CreateClientReqI['user']['address'];

const CLEAR_TIMEOUT = 500;
const SCREEN_NAME = t(
  TranslationNames.screens.authDriver.createClient.screenTitle,
);
const SUCCESS_MESSAGE = t(
  TranslationNames.screens.authDriver.createClient.successMessage,
);
const BUTTON_VALUE = t(
  TranslationNames.screens.authDriver.createClient.submitButton,
);

const defaultValues: CreateClientForm = {
  email: '',
  name: '',
  surname: '',
  phone_number: '',
  city: '',
  county: '',
  apartmentNumber: '',
  houseNumber: '',
  postalCode: '',
  street: '',
  voivodeship: '',
};

// TODO -> addres data based on location
export function NewClient({
  navigation,
}: ClientsDesktopDriverScreenProps<
  'newClient',
  'clientsDesktopRoot',
  'clientsDriver',
  'ownerRootDriver'
>) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateClientForm>({
    defaultValues,
  });

  const { mutate, data, isPending, error, isSuccess } = useMutation({
    mutationFn: createCompany,
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

  const onSubmit = (clientData: CreateClientForm) =>
    mutate({
      user: {
        email: clientData.email,
        personal_data: {
          name: clientData.name,
          surname: clientData.surname,
          phone_number: clientData.phone_number,
        },
        address: {
          city: clientData.city,
          county: clientData.county,
          street: clientData.street?.length ? clientData.street : undefined,
          apartmentNumber: clientData.apartmentNumber,
          voivodeship: clientData.voivodeship,
          houseNumber: clientData.houseNumber,
          postalCode: clientData.postalCode,
        },
      },
    });

  const setup: FormControllerSetup<CreateClientForm> = [
    {
      control,
      rules: rules.email,
      name: 'email',
      textInputProp: {
        keyboardType: 'email-address',
        placeholder: t(
          TranslationNames.createCompanyForm.formPlaceholder.email,
        ),
      },
    },
    {
      control,
      rules: rules.name,
      name: 'name',
      textInputProp: {
        placeholder: t(TranslationNames.createClientForm.formPlaceholder.name),
      },
    },
    {
      control,
      rules: rules.surname,
      name: 'surname',
      textInputProp: {
        placeholder: t(
          TranslationNames.createClientForm.formPlaceholder.surname,
        ),
      },
    },
    {
      control,
      rules: rules.phone_number,
      name: 'phone_number',
      textInputProp: {
        keyboardType: 'phone-pad',
        placeholder: t(
          TranslationNames.createClientForm.formPlaceholder.phoneNumber,
        ),
      },
    },
    {
      control,
      rules: rules.city,
      name: 'city',
      textInputProp: {
        placeholder: t(TranslationNames.addressForm.formPlaceholder.city),
      },
    },
    {
      control,
      rules: rules.county,
      name: 'county',
      textInputProp: {
        autoComplete: 'country',
        placeholder: t(TranslationNames.addressForm.formPlaceholder.county),
      },
    },
    {
      control,
      rules: rules.apartmentNumber,
      name: 'apartmentNumber',
      textInputProp: {
        placeholder: t(
          TranslationNames.addressForm.formPlaceholder.apartmentNumber,
        ),
      },
    },
    {
      control,
      rules: rules.houseNumber,
      name: 'houseNumber',
      textInputProp: {
        placeholder: t(
          TranslationNames.addressForm.formPlaceholder.houseNumber,
        ),
      },
    },
    {
      control,
      rules: rules.postalCode,
      name: 'postalCode',
      textInputProp: {
        keyboardType: 'number-pad',
        autoComplete: 'postal-code',
        placeholder: t(TranslationNames.addressForm.formPlaceholder.postalCode),
      },
    },
    {
      control,
      rules: rules.street,
      name: 'street',
      textInputProp: {
        autoComplete: 'street-address',
        placeholder: t(TranslationNames.addressForm.formPlaceholder.street),
      },
    },
    {
      control,
      rules: rules.voivodeship,
      name: 'voivodeship',
      textInputProp: {
        placeholder: t(
          TranslationNames.addressForm.formPlaceholder.voivodeship,
        ),
      },
    },
  ];
  return (
    <ScreenBase name={SCREEN_NAME}>
      <View className="w-full h-6 mt-2 overflow-hidden flex-row justify-center items-center">
        <PendingInfo isVisible={isPending} infoText="Creating company..." />
        {error && <FormErrorInfo error={error.message} />}
      </View>
      <FormCreator controllerSetups={setup} errors={errors} />
      <AppButton
        className="max-h-10"
        title={BUTTON_VALUE}
        onPress={handleSubmit(onSubmit)}
      />
    </ScreenBase>
  );
}
