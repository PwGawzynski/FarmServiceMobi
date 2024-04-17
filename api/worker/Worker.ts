import { t } from 'i18next';
import { Api } from '../Api';
import { TranslationNames } from '../../locales/TranslationNames';
import { apiHandler } from '../services/User';
import { ResponseObject } from '../../FarmServiceApiTypes/Respnse/responseGeneric';
import {
  CreateWorkerReqI,
  UpdateWorkerStatusOrPositionReqI,
} from '../../FarmServiceApiTypes/Worker/Requests';
import { WorkerResponseBase } from '../../FarmServiceApiTypes/Worker/Responses';

export async function workerData() {
  return (await Api.workerData()).payload;
}
export async function assignWorker(data: CreateWorkerReqI) {
  const UNAUTHORIZED_MSG = t(TranslationNames.serviceDefaults.unauthorised);
  const DEFAULT_MSG = t(TranslationNames.serviceDefaults.default);
  return (
    (await apiHandler<CreateWorkerReqI>(
      UNAUTHORIZED_MSG,
      DEFAULT_MSG,
      Api.assignWorker,
      data,
    )) as unknown as ResponseObject<WorkerResponseBase | undefined>
  )?.payload;
}

export async function updateWorkerStatusOrPosition(
  data: UpdateWorkerStatusOrPositionReqI,
) {
  const UNAUTHORIZED_MSG = t(TranslationNames.serviceDefaults.unauthorised);
  const DEFAULT_MSG = t(TranslationNames.serviceDefaults.default);
  return (await apiHandler<UpdateWorkerStatusOrPositionReqI>(
    UNAUTHORIZED_MSG,
    DEFAULT_MSG,
    Api.updateWorkerStatusOrPosition,
    data,
  )) as unknown as WorkerResponseBase | undefined;
}

export async function allWorkers() {
  const UNAUTHORIZED_MSG = t(TranslationNames.serviceDefaults.unauthorised);
  const DEFAULT_MSG = t(TranslationNames.serviceDefaults.default);
  return (await apiHandler<undefined>(
    UNAUTHORIZED_MSG,
    DEFAULT_MSG,
    Api.getWorkers,
  )) as unknown as Array<WorkerResponseBase> | undefined;
}
