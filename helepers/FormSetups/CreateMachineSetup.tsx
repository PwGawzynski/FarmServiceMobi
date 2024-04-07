import { Control } from 'react-hook-form/dist/types/form';
import { FormControllerSetup } from '../../components/atoms/FormCreator';
import { CreateMachineReqI } from '../../FarmServiceApiTypes/Machine/Requests';
import { CreateMachineRules } from '../FormRules/CreateMachineRules';

export const createMachineSetup = (
  control: Control<CreateMachineReqI>,
): FormControllerSetup<CreateMachineReqI> => [
  {
    control,
    rules: CreateMachineRules.name,
    name: 'name',
    placeholderName: 'Name',
    textInputProp: {
      keyboardType: 'default',
      placeholder: 'Name',
    },
  },
  {
    control,
    rules: CreateMachineRules.licensePlate,
    name: 'licensePlate',
    placeholderName: 'License Plate',
    valuePreprocessor: value => value.toUpperCase(),
    textInputProp: {
      keyboardType: 'default',
      placeholder: 'License Plate',
    },
  },
];
