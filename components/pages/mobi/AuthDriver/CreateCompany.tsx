import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { View } from 'react-native';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ScreenBase } from '../common/ScreenBase';
import { CreateCompanyReqI } from '../../../../FarmServiceApiTypes/Company/Requests';
import {
  selectUserAddress,
  selectUserPersonalData,
  setCompany,
} from '../../../../src/redux/feature/userSlice';
import { AppButton } from '../../../atoms/AppButton';
import { FormControllerSetup, FormCreator } from '../../../atoms/FormCreator';
import { createCompany } from '../../../../api/company/Company';
import { PendingInfo } from '../../../atoms/PendingInfo';
import { FormErrorInfo } from '../../../atoms/FormErrorInfo';
import { AuthDriverProps } from '../../../../types/self/navigation/props/AuthDriverProps';
import { AppDispatch } from '../../../../src/redux/app/Store';
import { TranslationNames } from '../../../../locales/TranslationNames';
import { rules } from '../../../../helepers/FormRules/CreateCompanyFormRules';

export type CreateCompanyForm = CreateCompanyReqI['address'] &
  Omit<CreateCompanyReqI, 'address'>;

export function CreateCompany({
  navigation,
}: AuthDriverProps<'createCompany'>) {
  const userAddress = useSelector(selectUserAddress);
  const userPersonalData = useSelector(selectUserPersonalData);
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();

  const defaultValues = {
    email: '',
    name: '',
    NIP: '',
    phoneNumber: userPersonalData?.phone_number ?? '',
    city: userAddress?.city ?? '',
    county: userAddress?.county ?? '',
    apartmentNumber: userAddress?.apartmentNumber ?? '',
    houseNumber: userAddress?.houseNumber ?? '',
    postalCode: userAddress?.postalCode ?? '',
    street: userAddress?.street ?? '',
    voivodeship: userAddress?.voivodeship ?? '',
  } as CreateCompanyForm;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCompanyForm>({
    defaultValues,
  });

  const { mutate, data, isPending, error, isSuccess } = useMutation({
    mutationFn: createCompany,
  });

  useEffect(() => {
    if (data && isSuccess) {
      dispatch(setCompany(data));
      navigation.navigate('OperationConfirmed', {
        shownMessage: 'Company created successfully',
        redirectScreenName: 'ownerRootDriver',
      });
    }
  }, [data, isSuccess]);

  const onSubmit = (formData: CreateCompanyForm) =>
    mutate({
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
    });

  const setup: FormControllerSetup<CreateCompanyForm> = [
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
      rules: rules.NIP,
      name: 'NIP',
      textInputProp: {
        keyboardType: 'number-pad',
        placeholder: t(TranslationNames.createCompanyForm.formPlaceholder.NIP),
      },
    },
    {
      control,
      rules: rules.name,
      name: 'name',
      textInputProp: {
        placeholder: t(TranslationNames.createCompanyForm.formPlaceholder.name),
      },
    },
    {
      control,
      rules: rules.phoneNumber,
      name: 'phoneNumber',
      textInputProp: {
        keyboardType: 'phone-pad',
        placeholder: t(
          TranslationNames.createCompanyForm.formPlaceholder.phoneNumber,
        ),
      },
    },
    {
      control,
      rules: rules.city,
      name: 'city',
      textInputProp: {
        placeholder: t(TranslationNames.createCompanyForm.formPlaceholder.city),
      },
    },
    {
      control,
      rules: rules.county,
      name: 'county',
      textInputProp: {
        autoComplete: 'country',
        placeholder: t(
          TranslationNames.createCompanyForm.formPlaceholder.county,
        ),
      },
    },
    {
      control,
      rules: rules.apartmentNumber,
      name: 'apartmentNumber',
      textInputProp: {
        placeholder: t(
          TranslationNames.createCompanyForm.formPlaceholder.apartmentNumber,
        ),
      },
    },
    {
      control,
      rules: rules.houseNumber,
      name: 'houseNumber',
      textInputProp: {
        placeholder: t(
          TranslationNames.createCompanyForm.formPlaceholder.houseNumber,
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
        placeholder: t(
          TranslationNames.createCompanyForm.formPlaceholder.postalCode,
        ),
      },
    },
    {
      control,
      rules: rules.street,
      name: 'street',
      textInputProp: {
        autoComplete: 'street-address',
        placeholder: t(
          TranslationNames.createCompanyForm.formPlaceholder.street,
        ),
      },
    },
    {
      control,
      rules: rules.voivodeship,
      name: 'voivodeship',
    },
  ];
  const SCREEN_TITLE = t(
    TranslationNames.screens.authDriver.createCompany.screenTitle,
  );
  const BUTTON_TITLE = t(
    TranslationNames.screens.authDriver.createCompany.submitButton,
  );

  return (
    <ScreenBase name={SCREEN_TITLE}>
      <View className="w-full h-6 mt-2 overflow-hidden flex-row justify-center items-center">
        <PendingInfo isVisible={isPending} infoText="Creating company..." />
        {error && <FormErrorInfo error={error.message} />}
      </View>
      <FormCreator
        controllerSetups={setup}
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
