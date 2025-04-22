import { assign, setup } from 'xstate';
import {
  WorkerIdResponseBase,
  WorkerResponseBase,
} from '../../FarmServiceApiTypes/Worker/Responses';

enum SseStatus {
  WAITING,
  OPEN,
  ERROR,
  MESSAGE,
}
export const SSE_TIMEOUT = 60000;
export const AFTER_ASSIGNATION_ANIMATION = 3000;

export const AssignationMachine = setup({
  types: {} as {
    events:
      | { type: 'sseOpening' }
      | { type: 'sseOpened' }
      | { type: 'sseError' }
      | { type: 'dataReady'; data: WorkerResponseBase }
      | { type: 'Fetched'; data: WorkerIdResponseBase }
      | { type: 'Pending' }
      | { type: 'MakeRetry' }
      | { type: 'Error' }
      | { type: 'retry' };
    context: {
      sseStatus: SseStatus;
      workerData: WorkerResponseBase | undefined;
      queryWorkerData: WorkerIdResponseBase | undefined;
    };
  },
  guards: {
    workerAssigned: machine => machine.context.workerData !== undefined,
    workerNotAssigned: machine => machine.context.workerData === undefined,
    queryWorkerAssigned: machine =>
      !!machine.context.queryWorkerData?.workerData,
    queryWorkerNotAssigned: machine =>
      !machine.context.queryWorkerData?.workerData,
  },
}).createMachine({
  id: 'AssignationMachine',
  initial: 'QueringWorkerData',
  context: {
    sseStatus: SseStatus.WAITING,
    workerData: undefined,
    queryWorkerData: undefined,
  },
  states: {
    QueringWorkerData: {
      on: {
        Pending: {
          target: 'WorkerQueryPending',
        },
      },
    },
    WorkerQueryPending: {
      on: {
        Fetched: {
          actions: assign({
            queryWorkerData: incoming => {
              return incoming.event.data;
            },
          }),
          target: 'DataReady',
        },
        Error: {
          target: 'FetchingError',
        },
      },
    },
    DataReady: {
      always: [
        {
          guard: 'queryWorkerAssigned',
          target: 'ready',
        },
        {
          guard: 'queryWorkerNotAssigned',
          target: 'sseOpening',
        },
      ],
    },
    FetchingError: {
      on: {
        MakeRetry: {
          target: 'QueringWorkerData',
        },
      },
    },
    workerAssigned: {
      after: {
        [AFTER_ASSIGNATION_ANIMATION]: {
          target: 'ready',
        },
      },
    },
    ready: {},
    sseOpening: {
      on: {
        sseOpened: {
          actions: assign({
            sseStatus: SseStatus.OPEN,
          }),
          target: 'sseOpened',
        },
        sseError: {
          actions: assign({
            sseStatus: SseStatus.ERROR,
          }),
          target: 'sseError',
        },
      },
    },
    sseOpened: {
      on: {
        dataReady: {
          actions: assign({
            workerData: incoming => {
              return incoming.event.data;
            },
          }),
          target: 'workerDataReady',
        },
      },
      after: {
        [SSE_TIMEOUT]: {
          target: 'connectionTimeOut',
        },
      },
    },
    sseError: {},
    workerDataReady: {
      always: [
        {
          guard: 'workerAssigned',
          target: 'workerAssigned',
        },
        {
          guard: 'workerNotAssigned',
          target: 'workerNotAssigned',
        },
      ],
    },
    connectionTimeOut: {
      on: {
        retry: {
          target: 'sseOpening',
        },
      },
    },
    workerNotAssigned: {},
  },
});
