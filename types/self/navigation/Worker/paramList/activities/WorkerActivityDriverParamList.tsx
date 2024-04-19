import { NavigatorScreenParams } from '@react-navigation/native';
import { WorkerActivityDesktopDriverParamList } from './WorkerActivityDesktopDriverParamList';
import { TaskResponseBase } from '../../../../../../FarmServiceApiTypes/Task/Responses';

export type WorkerActivityDriverParamList = {
  workerActivityDesktopRoot: NavigatorScreenParams<WorkerActivityDesktopDriverParamList>;
  taskView: {
    task: TaskResponseBase;
  };
};
