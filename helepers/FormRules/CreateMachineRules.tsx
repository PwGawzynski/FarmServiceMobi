import { t } from 'i18next';
import { FormRulesType } from './FormRulesType';
import { CreateMachineReqI } from '../../FarmServiceApiTypes/Machine/Requests';
import { MachineConstants } from '../../FarmServiceApiTypes/Machine/Constants';
import { TranslationNames } from '../../locales/TranslationNames';

export const CreateMachineRules: FormRulesType<CreateMachineReqI> = {
  name: {
    required: t(TranslationNames.createMachineForm.validation.name),
    maxLength: {
      value: MachineConstants.NAME_MAX_LEN,
      message: t(TranslationNames.createMachineForm.validation.nameMaxLength),
    },
    minLength: {
      value: MachineConstants.NAME_MIN_LEN,
      message: t(TranslationNames.createMachineForm.validation.nameMinLength),
    },
  },
  licensePlate: {
    required: t(TranslationNames.createMachineForm.validation.licensePlate),
    maxLength: {
      value: MachineConstants.LICENCE_PLATE_MAX_LEN,
      message: t(
        TranslationNames.createMachineForm.validation.licensePlateMaxLength,
      ),
    },
    minLength: {
      value: MachineConstants.LICENCE_PLATE_MIN_LEN,
      message: t(
        TranslationNames.createMachineForm.validation.licensePlateMinLength,
      ),
    },
  },
};
