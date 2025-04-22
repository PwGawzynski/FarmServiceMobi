import { setup } from 'xstate';
import { ClientResponseBase } from '../../FarmServiceApiTypes/Clients/Responses';

export const addOrderMachine = setup({
  types: {} as {
    events:
      | { type: 'setClient'; data: ClientResponseBase | undefined }
      | { type: 'init'; data: ClientResponseBase | undefined }
      | { type: 'reset'; data: ClientResponseBase | undefined };
    context: {
      client: ClientResponseBase | undefined;
    };
  },
  guards: {
    client: ({ context, event }) => {
      context.client = event.data;
      return !!context.client;
    },
  },
}).createMachine({
  context: {
    client: undefined,
  },
  id: 'AddOrderMachine',
  initial: 'Idle',
  states: {
    Idle: {
      on: {
        init: [
          {
            target: 'ClientGiven',
            guard: {
              type: 'client',
            },
          },
          {
            target: 'WaitingTillClientIsGiven',
          },
        ],
      },
    },
    ClientGiven: {
      on: {
        reset: {
          target: 'WaitingTillClientIsGiven',
        },
      },
    },
    WaitingTillClientIsGiven: {
      on: {
        setClient: [
          {
            target: 'ChangeStates',
            guard: {
              type: 'client',
            },
          },
          {
            target: 'WaitingTillClientIsGiven',
          },
        ],
      },
    },
    ChangeStates: {
      after: {
        '1001': {
          target: 'ClientGiven',
        },
      },
    },
  },
});
