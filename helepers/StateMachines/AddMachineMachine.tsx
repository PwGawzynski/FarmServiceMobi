import { assign, setup } from 'xstate';
import { CreateMachineReqI } from '../../FarmServiceApiTypes/Machine/Requests';

export const AddMachineMachine = setup({
  types: {} as {
    events:
      | { type: 'init'; data: CreateMachineReqI | undefined }
      | { type: 'reset'; data: CreateMachineReqI | undefined }
      | { type: 'done'; data: CreateMachineReqI | undefined }
      | { type: 'edit'; data: CreateMachineReqI | undefined };
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
  context: ({ input }) => {
    return {
      machine: input.data,
    };
  },
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
        reset: {
          target: 'ClearData',
          actions: assign({
            machine: incoming => {
              return incoming.event.data;
            },
          }),
        },
        edit: {
          target: 'Edit',
          actions: assign({
            machine: incoming => {
              return incoming.event.data;
            },
          }),
        },
      },
    },
    Edit: {
      on: {
        reset: {
          target: 'ClearData',
          actions: assign({
            machine: incoming => {
              return incoming.event.data;
            },
          }),
        },
      },
    },
    ClearData: {
      on: {
        done: {
          target: 'Idle',
          actions: assign({
            machine: incoming => {
              return incoming.event.data;
            },
          }),
        },
      },
    },
  },
});
