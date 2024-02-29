import { assign, setup } from 'xstate';
import { UserRole } from '../../FarmServiceApiTypes/User/Enums';
import { LANDING_ANIMATION_DURATION } from '../../components/atoms/LandingLogo';

export const LandingMachine = setup({
  types: {} as {
    events:
      | { type: 'ready'; userRole: UserRole | undefined }
      | { type: 'unreachable' };
    context: {
      animationPlayed: boolean;
      userRole: UserRole | undefined;
    };
  },
  guards: {
    isOwner: machine => machine.context.userRole === UserRole.Owner,
    isWorker: machine => machine.context.userRole === UserRole.Worker,
  },
}).createMachine({
  id: 'Landing',
  initial: 'animating',
  context: {
    userRole: undefined,
    animationPlayed: false,
  },
  states: {
    animating: {
      always: {
        actions: assign({
          animationPlayed: true,
        }),
        target: '#Landing.animated',
      },
    },
    animated: {
      after: {
        [LANDING_ANIMATION_DURATION]: {
          target: 'checkUserContextReady',
        },
      },
    },
    checkUserContextReady: {
      on: {
        ready: {
          actions: assign({
            userRole: incoming => {
              return incoming.event.userRole;
            },
          }),
          target: 'contextReady',
        },
        unreachable: {
          target: 'unreachable',
        },
      },
    },
    contextReady: {
      always: [
        {
          guard: 'isOwner',
          target: 'userIsOwner',
        },
        {
          guard: 'isWorker',
          target: 'userIsWorker',
        },
      ],
    },
    userIsOwner: {},
    userIsWorker: {},
    unreachable: {},
  },
});
