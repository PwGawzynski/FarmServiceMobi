import { t } from 'i18next';
import { FormRulesType } from './FormRulesType';
import { TranslationNames } from '../../locales/TranslationNames';
import {
  creteMaxMessage,
  creteMinLenMessage,
  creteMinMessage,
} from './FormRulesHelper';
import { FieldAddressRules } from './CommonRules';
import { ExtendedFormData } from '../../components/organisms/AddFieldForm';
import FieldConstants from '../../FarmServiceApiTypes/Field/Constants';

export const rules: FormRulesType<ExtendedFormData> = {
  area: {
    required: t(TranslationNames.createFieldForm.validation.area),
    min: {
      value: FieldConstants.AREA_MIN_VALUE,
      message: creteMinMessage<ExtendedFormData>(
        FieldConstants.AREA_MIN_VALUE,
        'area',
      ),
    },
    max: {
      value: FieldConstants.AREA_MAX_VALUE,
      message: creteMaxMessage<ExtendedFormData>(
        FieldConstants.AREA_MAX_VALUE,
        'area',
      ),
    },
  },
  polishSystemId: {
    required: t(TranslationNames.createFieldForm.validation.polishSystemId),
    pattern: {
      value: /^\d{5,8}_\d+\.\d{4}\.\d{1,4}(\/\d+_BUD)?$/,
      message: t(
        TranslationNames.createFieldForm.validation.polishSystemIdPattern,
      ),
    },
  },
  nameLabel: {
    required: t(TranslationNames.createFieldForm.validation.nameLabel),
    minLength: {
      value: FieldConstants.NAME_MIN_LEN,
      message: creteMinLenMessage<ExtendedFormData>(
        FieldConstants.NAME_MIN_LEN,
        'nameLabel',
      ),
    },
    maxLength: {
      value: FieldConstants.NAME_MAX_LEN,
      message: creteMinLenMessage<ExtendedFormData>(
        FieldConstants.NAME_MAX_LEN,
        'nameLabel',
      ),
    },
  },
  ...FieldAddressRules,
};
