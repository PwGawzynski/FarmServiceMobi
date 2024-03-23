import { NavigatorScreenParams } from '@react-navigation/native';
import { WorkersDesktopDriverParamList } from './WorkersDesktopDriverParamList';
import { WorkerResponseBase } from '../../../../../../FarmServiceApiTypes/Worker/Responses';

export type WorkersDriverParamList = {
  workersDesktopRoot: NavigatorScreenParams<WorkersDesktopDriverParamList>;
  workerDetails: { worker: WorkerResponseBase };
};
