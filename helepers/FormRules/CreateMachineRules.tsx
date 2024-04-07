import { FormRulesType } from './FormRulesType';
import { CreateMachineReqI } from '../../FarmServiceApiTypes/Machine/Requests';

export const CreateMachineRules: FormRulesType<CreateMachineReqI> = {
  name: {
    required: 'Name is required',
    maxLength: {
      value: 100,
      message: 'Name is too long',
    },
  },
  licensePlate: {
    required: 'License plate is required',
    maxLength: {
      value: 10,
      message: 'License plate is too long',
    },
  },
};
