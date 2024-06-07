import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { t } from 'i18next';
import { ScreenBase } from '../common/ScreenBase';
import { AuthDriverProps } from '../../../../../types/self/navigation/Owner/props/AuthDriverProps';
import { createUserSetup } from '../../../../../helepers/FormSetups/CreateUserSetup';
import { FormCreator } from '../../../../atoms/FormCreator';
import { CreateUserForm } from '../ClientsDesktopDriver/CreateClient';
import { ButtonTamagui } from '../../../../atoms/ButtonTamagui';
import { registerUser } from '../../../../../api/services/User';
import { CreateUserReqI } from '../../../../../FarmServiceApiTypes/User/Requests';
import { TranslationNames } from '../../../../../locales/TranslationNames';
import { DefaultQueryErrorHandler } from '../../../../../helepers/Api/DefaultQueryErrorHandler';

const TRANSLATIONS = {
  title: t(TranslationNames.screens.authDriver.register.title),
  confirmation: t(TranslationNames.screens.authDriver.register.confirmation),
  registerButton: t(
    TranslationNames.screens.authDriver.register.registerButton,
  ),
};

export function Register({
  navigation,
  route: { params },
}: AuthDriverProps<'register'>) {
  const { mutate, isPending } = useMutation({
    mutationKey: ['register'],
    mutationFn: registerUser,
    onSuccess: () => {
      navigation.navigate('OperationConfirmed', {
        shownMessage: TRANSLATIONS.confirmation,
        redirectScreenName: 'chooseLoginType',
      });
    },
    onError: DefaultQueryErrorHandler,
  });
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateUserForm>();
  const onSubmit = (d: CreateUserForm) => {
    if (params && (params.byGoogle || params.byMail))
      mutate({
        address: {
          city: d.city,
          county: d.county,
          street: d.street,
          apartmentNumber: d.apartmentNumber?.length
            ? d.apartmentNumber
            : undefined,
          voivodeship: d.voivodeship,
          houseNumber: d.houseNumber,
          postalCode: d.postalCode,
        },
        role: params.role,
        email: params.byGoogle?.email || params.byMail?.email || d.email,
        password: params.byMail?.password,
        personalData: {
          name: d.name,
          surname: d.surname,
          phoneNumber: d.phoneNumber,
        },
      } as CreateUserReqI);
  };
  return (
    <ScreenBase titleBoxStyles="justify-center">
      <FormCreator
        controllerSetups={createUserSetup(control, () => {
          setValue('phoneNumber', '+48 ');
        })}
        errors={errors}
      />
      <ButtonTamagui
        text={TRANSLATIONS.registerButton}
        isPending={isPending}
        buttonProps={{
          onPress: handleSubmit(onSubmit),
        }}
      />
    </ScreenBase>
  );
}
