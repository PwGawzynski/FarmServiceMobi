import { CreateTaskCollection } from '../../FarmServiceApiTypes/Task/Requests';
import { TaskResponseBase } from '../../FarmServiceApiTypes/Task/Responses';
import { TaskSessionCreateRequest } from '../../FarmServiceApiTypes/TaskSession/Requests';
import { query } from '../../helepers/Api/QueryDriver';

export async function createTask(data: CreateTaskCollection) {
  return query<CreateTaskCollection, TaskResponseBase>({
    type: 'POST',
    path: '/task',
    data,
  });
}

export async function getTaskByOrder(orderId: string) {
  return query<undefined, TaskResponseBase[]>({
    type: 'GET',
    path: '/task',
    config: {
      params: { 'order-id': orderId },
    },
  });
}

export type OpenTaskData = {
  taskId: string;
  taskSession?: TaskSessionCreateRequest;
};

export async function openTask({ taskId, taskSession }: OpenTaskData) {
  return query<TaskSessionCreateRequest, TaskResponseBase>({
    type: 'PUT',
    path: '/task/open',
    data: taskSession,
    config: {
      params: { 'task-id': taskId },
    },
  });
}

export async function closeTask({ taskId, taskSession }: OpenTaskData) {
  return query<TaskSessionCreateRequest, TaskResponseBase>({
    type: 'PUT',
    path: '/task/close',
    data: taskSession,
    config: {
      params: { 'task-id': taskId },
    },
  });
}
export async function closeTaskByOwner(taskId: string) {
  return query<undefined, TaskResponseBase>({
    type: 'PUT',
    path: '/task/close-by-owner',
    config: {
      params: { 'task-id': taskId },
    },
  });
}

export async function pauseTask({ taskId, taskSession }: OpenTaskData) {
  return query<TaskSessionCreateRequest, TaskResponseBase>({
    type: 'PUT',
    path: '/task/pause',
    data: taskSession,
    config: {
      params: { 'task-id': taskId },
    },
  });
}

export async function deleteTask(taskId: string) {
  return query<undefined, TaskResponseBase>({
    type: 'DELETE',
    path: '/task',
    config: {
      params: { 'task-id': taskId },
    },
  });
}
