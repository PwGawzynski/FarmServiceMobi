import {
  CreateWorkerReqI,
  UpdateWorkerStatusOrPositionReqI,
} from '../../FarmServiceApiTypes/Worker/Requests';
import { WorkerResponseBase } from '../../FarmServiceApiTypes/Worker/Responses';
import { query } from '../../helepers/Api/QueryDriver';

export async function workerData() {
  return query<undefined, WorkerResponseBase[]>({
    type: 'GET',
    path: '/worker',
  });
}
export async function assignWorker(data: CreateWorkerReqI) {
  return query<CreateWorkerReqI, WorkerResponseBase>({
    type: 'POST',
    path: '/worker',
    data,
  });
}

export async function updateWorkerStatusOrPosition(
  data: UpdateWorkerStatusOrPositionReqI,
) {
  return query<UpdateWorkerStatusOrPositionReqI, WorkerResponseBase>({
    type: 'PUT',
    path: '/worker/update-status-or-position',
    data,
  });
}

export async function allWorkers() {
  return query<undefined, WorkerResponseBase[]>({
    type: 'GET',
    path: '/worker/all',
  });
}
