import {
  CreateMachineReqI,
  UpdateMachineReqI,
} from '../../FarmServiceApiTypes/Machine/Requests';
import { MachineResponseBase } from '../../FarmServiceApiTypes/Machine/Responses';
import { query } from '../../helepers/Api/QueryDriver';

export async function createMachine(data: CreateMachineReqI) {
  return query<CreateMachineReqI, MachineResponseBase>({
    type: 'POST',
    path: '/machine',
    data,
  });
}

export async function updateMachine(data: UpdateMachineReqI) {
  return query<UpdateMachineReqI, MachineResponseBase>({
    type: 'PUT',
    path: '/machine',
    data,
  });
}

export async function safelyDeleteMachine(data: UpdateMachineReqI) {
  return query<UpdateMachineReqI, MachineResponseBase>({
    type: 'POST',
    path: '/machine/safely-delete',
    data,
  });
}

export async function getAllMachines() {
  return query<undefined, MachineResponseBase[]>({
    type: 'GET',
    path: '/machine/all',
  });
}
