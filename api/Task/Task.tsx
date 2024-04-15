import { t } from 'i18next';
import { TranslationNames } from '../../locales/TranslationNames';
import { apiHandler } from '../services/User';
import { Api } from '../Api';
import { CreateTaskCollection } from '../../FarmServiceApiTypes/Task/Requests';
import { TaskResponseBase } from '../../FarmServiceApiTypes/Task/Responses';

export async function createTask(data: CreateTaskCollection) {
  const UNAUTHORIZED_MSG = t(TranslationNames.serviceDefaults.unauthorised);
  const DEFAULT_MSG = t(TranslationNames.serviceDefaults.default);
  return apiHandler<CreateTaskCollection>(
    UNAUTHORIZED_MSG,
    DEFAULT_MSG,
    Api.createTasks,
    data,
  ) as unknown as Array<TaskResponseBase>;
}

export async function getTaskByOrder(orderId: string) {
  const UNAUTHORIZED_MSG = t(TranslationNames.serviceDefaults.unauthorised);
  const DEFAULT_MSG = t(TranslationNames.serviceDefaults.default);
  return apiHandler<string>(
    UNAUTHORIZED_MSG,
    DEFAULT_MSG,
    Api.getTaskByOrder,
    orderId,
  ) as unknown as Array<TaskResponseBase>;
}
