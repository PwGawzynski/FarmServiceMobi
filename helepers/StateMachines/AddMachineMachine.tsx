import { setup } from 'xstate';
import { CreateMachineReqI } from '../../FarmServiceApiTypes/Machine/Requests';

export const AddMachineMachine = setup({
  types: {} as {
    events:
      | { type: 'init'; data: CreateMachineReqI | undefined }
      | { type: 'reset'; data: CreateMachineReqI | undefined };
    context: {
      machine: CreateMachineReqI | undefined;
    };
    input: {
      data: CreateMachineReqI | undefined;
    };
  },
  guards: {
    machine({ context }) {
      return context.machine !== undefined;
    },
  },
}).createMachine({
  context: ({ input }) => ({
    machine: input.data,
  }),
  id: 'AddMachineMachine',
  initial: 'Idle',
  states: {
    Idle: {
      always: [
        {
          target: 'Edit',
          guard: {
            type: 'machine',
          },
        },
        {
          target: 'Creating',
        },
      ],
    },
    Creating: {
      on: {
        reset: 'ClearData',
      },
    },
    Edit: {},
    ClearData: {
      always: {
        target: 'Idle',
      },
    },
  },
});
