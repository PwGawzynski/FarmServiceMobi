import { t } from 'i18next';
import { TranslationNames } from '../../locales/TranslationNames';
import { apiHandler } from '../services/User';
import { Api } from '../Api';
import { CreateMachineReqI } from '../../FarmServiceApiTypes/Machine/Requests';
import { MachineResponseBase } from '../../FarmServiceApiTypes/Machine/Responses';

export async function createMachine(data: CreateMachineReqI) {
  const UNAUTHORIZED_MSG = t(TranslationNames.serviceDefaults.unauthorised);
  const DEFAULT_MSG = t(TranslationNames.serviceDefaults.default);
  return apiHandler<CreateMachineReqI>(
    UNAUTHORIZED_MSG,
    DEFAULT_MSG,
    Api.createMachine,
    data,
  ) as unknown as CreateMachineReqI | undefined;
}

export async function getAllMachines() {
  const UNAUTHORIZED_MSG = t(TranslationNames.serviceDefaults.unauthorised);
  const DEFAULT_MSG = t(TranslationNames.serviceDefaults.default);
  return apiHandler(
    UNAUTHORIZED_MSG,
    DEFAULT_MSG,
    Api.getAllMachines,
  ) as unknown as MachineResponseBase[] | undefined;
}
