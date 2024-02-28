import { NavigatorScreenParams } from '@react-navigation/native';
import { WorkerActivityDriverParamList } from './activities/WorkerActivityDriverParamList';

export type WorkerRootDriverParamList = {
  workerActivityDriver: NavigatorScreenParams<WorkerActivityDriverParamList>;
  workerAssignationScreen: undefined;
};
