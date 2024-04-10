import { t } from 'i18next';
import { TranslationNames } from '../../locales/TranslationNames';
import { apiHandler } from '../services/User';
import { Api } from '../Api';
import {
  CreateMachineReqI,
  UpdateMachineReqI,
} from '../../FarmServiceApiTypes/Machine/Requests';
import { MachineResponseBase } from '../../FarmServiceApiTypes/Machine/Responses';

export async function createMachine(data: CreateMachineReqI) {
  const UNAUTHORIZED_MSG = t(TranslationNames.serviceDefaults.unauthorised);
  const DEFAULT_MSG = t(TranslationNames.serviceDefaults.default);
  return apiHandler<CreateMachineReqI>(
    UNAUTHORIZED_MSG,
    DEFAULT_MSG,
    Api.createMachine,
    data,
  ) as unknown as MachineResponseBase | undefined;
}

export async function updateMachine(data: UpdateMachineReqI) {
  const UNAUTHORIZED_MSG = t(TranslationNames.serviceDefaults.unauthorised);
  const DEFAULT_MSG = t(TranslationNames.serviceDefaults.default);
  return apiHandler<UpdateMachineReqI>(
    UNAUTHORIZED_MSG,
    DEFAULT_MSG,
    Api.updateMachine,
    data,
  ) as unknown as MachineResponseBase | undefined;
}

export async function safelyDeleteMachine(data: UpdateMachineReqI) {
  const UNAUTHORIZED_MSG = t(TranslationNames.serviceDefaults.unauthorised);
  const DEFAULT_MSG = t(TranslationNames.serviceDefaults.default);
  return apiHandler<UpdateMachineReqI>(
    UNAUTHORIZED_MSG,
    DEFAULT_MSG,
    Api.safelyDeleteMachine,
    data,
  ) as unknown as MachineResponseBase | undefined;
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
