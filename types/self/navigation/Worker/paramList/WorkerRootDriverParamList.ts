import { NavigatorScreenParams } from '@react-navigation/native';
import { WorkerActivityDriverParamList } from './activities/WorkerActivityDriverParamList';
import { TaskResponseBase } from '../../../../../FarmServiceApiTypes/Task/Responses';

export type WorkerRootDriverParamList = {
  workerActivityDriver: NavigatorScreenParams<WorkerActivityDriverParamList>;
  workerAssignationScreen: undefined;
  work: TaskResponseBase;
};
