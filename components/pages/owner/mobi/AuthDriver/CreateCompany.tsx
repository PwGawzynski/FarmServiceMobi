import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ScreenBase } from '../common/ScreenBase';
import { CreateCompanyReqI } from '../../../../../FarmServiceApiTypes/Company/Requests';
import { AuthDriverProps } from '../../../../../types/self/navigation/Owner/props/AuthDriverProps';
import {
  selectUserAddress,
  selectUserPersonalData,
  setCompany,
} from '../../../../../src/redux/feature/userSlice';
import { AppDispatch } from '../../../../../src/redux/app/Store';
import { createCompany } from '../../../../../api/company/Company';
import { TranslationNames } from '../../../../../locales/TranslationNames';
import { FormStatusPanel } from '../../../../molecules/FormStatusPanel';
import { FormCreator } from '../../../../atoms/FormCreator';
import { createCompanySetup } from '../../../../../helepers/FormSetups/CreateCompanySetup';
import { ButtonTamagui } from '../../../../atoms/ButtonTamagui';

export type CreateCompanyForm = CreateCompanyReqI['address'] &
  Omit<CreateCompanyReqI, 'address'>;

export function CreateCompany({
  navigation,
}: AuthDriverProps<'createCompany'>) {
  const userAddress = useSelector(selectUserAddress);
  const userPersonalData = useSelector(selectUserPersonalData);
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const defaultValues = useMemo(
    () =>
      ({
        email: '',
        name: '',
        NIP: '',
        phoneNumber: userPersonalData?.phoneNumber ?? '',
        city: userAddress?.city ?? '',
        county: userAddress?.county ?? '',
        apartmentNumber: userAddress?.apartmentNumber ?? '',
        houseNumber: userAddress?.houseNumber ?? '',
        postalCode: userAddress?.postalCode ?? '',
        street: userAddress?.street ?? '',
        voivodeship: userAddress?.voivodeship ?? '',
      }) as CreateCompanyForm,
    [userAddress, userPersonalData],
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateCompanyForm>({
    defaultValues,
  });
  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);
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

  const SCREEN_TITLE = t(
    TranslationNames.screens.authDriver.createCompany.screenTitle,
  );
  const BUTTON_TITLE = t(
    TranslationNames.screens.authDriver.createCompany.submitButton,
  );

  return (
    <ScreenBase name={SCREEN_TITLE}>
      <FormStatusPanel isVisible={isPending} error={error?.message} />
      <FormCreator
        controllerSetups={createCompanySetup(control)}
        errors={errors}
        onSubmit={onSubmit}
      />
      <ButtonTamagui
        text={BUTTON_TITLE}
        buttonProps={{ onPress: handleSubmit(onSubmit), mt: '$4' }}
      />
    </ScreenBase>
  );
}
