import { t } from 'i18next';
import { TranslationNames } from '../../locales/TranslationNames';
import { apiHandler } from '../services/User';
import { Api } from '../Api';
import { CreateTaskCollection } from '../../FarmServiceApiTypes/Task/Requests';
import { TaskResponseBase } from '../../FarmServiceApiTypes/Task/Responses';
import { ResponseObject } from '../../FarmServiceApiTypes/Respnse/responseGeneric';

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

export async function openTask(taskId: string) {
  const UNAUTHORIZED_MSG = t(TranslationNames.serviceDefaults.unauthorised);
  const DEFAULT_MSG = t(TranslationNames.serviceDefaults.default);
  return apiHandler<string>(
    UNAUTHORIZED_MSG,
    DEFAULT_MSG,
    Api.openTask,
    taskId,
  ) as unknown as TaskResponseBase;
}

export async function closeTask(taskId: string) {
  const UNAUTHORIZED_MSG = t(TranslationNames.serviceDefaults.unauthorised);
  const DEFAULT_MSG = t(TranslationNames.serviceDefaults.default);
  return apiHandler<string>(
    UNAUTHORIZED_MSG,
    DEFAULT_MSG,
    Api.closeTask,
    taskId,
  ) as unknown as TaskResponseBase;
}

export async function pauseTask(taskId: string) {
  const UNAUTHORIZED_MSG = t(TranslationNames.serviceDefaults.unauthorised);
  const DEFAULT_MSG = t(TranslationNames.serviceDefaults.default);
  return apiHandler<string>(
    UNAUTHORIZED_MSG,
    DEFAULT_MSG,
    Api.pauseTask,
    taskId,
  ) as unknown as TaskResponseBase;
}

export async function deleteTask(taskId: string) {
  const UNAUTHORIZED_MSG = t(TranslationNames.serviceDefaults.unauthorised);
  const DEFAULT_MSG = t(TranslationNames.serviceDefaults.default);
  return apiHandler<string>(
    UNAUTHORIZED_MSG,
    DEFAULT_MSG,
    Api.deleteTask,
    taskId,
  ) as unknown as ResponseObject<undefined>;
}
