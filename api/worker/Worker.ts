import { t } from 'i18next';
import { Api } from '../Api';
import { TranslationNames } from '../../locales/TranslationNames';
import { apiHandler } from '../services/User';
import { ResponseObject } from '../../FarmServiceApiTypes/Respnse/responseGeneric';
import { CreateWorkerReqI } from '../../FarmServiceApiTypes/Worker/Requests';
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
