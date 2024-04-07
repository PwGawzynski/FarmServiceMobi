import { Control } from 'react-hook-form/dist/types/form';
import { t } from 'i18next';
import { FormControllerSetup } from '../../components/atoms/FormCreator';
import { CreateMachineReqI } from '../../FarmServiceApiTypes/Machine/Requests';
import { CreateMachineRules } from '../FormRules/CreateMachineRules';
import { TranslationNames } from '../../locales/TranslationNames';

export const createMachineSetup = (
  control: Control<CreateMachineReqI>,
): FormControllerSetup<CreateMachineReqI> => [
  {
    control,
    rules: CreateMachineRules.name,
    name: 'name',
    placeholderName: t(TranslationNames.createMachineForm.formPlaceholder.name),
    textInputProp: {
      keyboardType: 'default',
    },
  },
  {
    control,
    rules: CreateMachineRules.licensePlate,
    name: 'licensePlate',
    placeholderName: t(
      TranslationNames.createMachineForm.formPlaceholder.licensePlate,
    ),
    valuePreprocessor: value => value.toUpperCase(),
    textInputProp: {
      keyboardType: 'default',
    },
  },
];
