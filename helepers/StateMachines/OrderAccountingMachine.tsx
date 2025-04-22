import { assign, setup } from 'xstate';
import { TaskResponseBase } from '../../FarmServiceApiTypes/Task/Responses';

export const OrderAccountingMachine = setup({
  types: {} as {
    events:
      | { type: 'fetched'; data: TaskResponseBase[] | undefined }
      | { type: 'error'; data: TaskResponseBase[] | undefined }
      | { type: 'retry'; data: TaskResponseBase[] | undefined };
    context: {
      tasks: TaskResponseBase[] | undefined;
    };
  },
  guards: {
    taskFetched: ({ context, event }) => {
      context.tasks = event.data;
      return !!context.tasks;
    },
  },
}).createMachine({
  context: {
    tasks: undefined,
  },
  id: 'AccountingMachine',
  initial: 'TasksFetch',
  states: {
    TasksFetch: {
      on: {
        fetched: {
          actions: assign({
            tasks: incoming => {
              return incoming.event.data;
            },
          }),
          guard: 'taskFetched',
          target: 'AccountingEdit',
        },
        error: {
          target: 'RequestError',
        },
      },
    },
    AccountingEdit: {},
    RequestError: {
      on: {
        retry: {
          target: 'TasksFetch',
        },
      },
    },
  },
});
