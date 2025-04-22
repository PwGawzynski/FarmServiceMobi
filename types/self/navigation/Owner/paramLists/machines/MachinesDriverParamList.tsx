import { NavigatorScreenParams } from '@react-navigation/native';
import { MachinesDesktopDriverParamList } from './MachinesDesktopDriverParamList';
import { MachineResponseBase } from '../../../../../../FarmServiceApiTypes/Machine/Responses';

export type MachinesDriverParamList = {
  machinesDesktopRoot: NavigatorScreenParams<MachinesDesktopDriverParamList>;
  machineDetails: {
    machine: MachineResponseBase;
  };
};
