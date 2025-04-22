import { Handlers } from '../../helepers/Api/QueryDriver';
import { InvalidRequestCodes } from '../../FarmServiceApiTypes/InvalidRequestCodes';

// TODO add translations

export const QueryErrors: Handlers<InvalidRequestCodes> = {
  [InvalidRequestCodes.machine_licencePlateTaken]: {
    header: 'Machine already exists',
    description: 'License plate already taken',
  },
  [InvalidRequestCodes.machine_doesNotBelongToCompany]: {
    header: 'Machine does not belong to company',
    description: 'Machine does not belong to company',
  },
  [InvalidRequestCodes.client_userNotCreated]: {
    header: 'User not created',
    description: 'User not created',
  },
  [InvalidRequestCodes.account_emailTaken]: {
    header: 'Account already exists',
    description: 'Email already taken',
  },
  [InvalidRequestCodes.personalData_phoneTaken]: {
    header: 'Personal data already exists',
    description: 'Phone number already taken',
  },
  [InvalidRequestCodes.company_alreadyExists]: {
    header: 'Company already exists',
    description: 'Company already exists',
  },
  [InvalidRequestCodes.company_emailTaken]: {
    header: 'Company already exists',
    description: 'Email already taken',
  },
  [InvalidRequestCodes.company_nameTaken]: {
    header: 'Company already exists',
    description: 'Name already taken',
  },
  [InvalidRequestCodes.company_phoneTaken]: {
    header: 'Company already exists',
    description: 'Phone already taken',
  },
  [InvalidRequestCodes.company_NIPTaken]: {
    header: 'Company already exists',
    description: 'NIP already taken',
  },
  [InvalidRequestCodes.unauthorized]: {
    header: 'Unauthorized',
    description: 'Unauthorized',
  },
  [InvalidRequestCodes.account_notActivated]: {
    header: 'Account not activated',
    description: 'Account not activated',
  },
  [InvalidRequestCodes.invalidToken]: {
    header: 'Invalid token',
    description: 'Invalid token',
  },
  [InvalidRequestCodes.personalData_notFound]: {
    header: 'Personal data not found',
    description: 'Personal data not found',
  },
  [InvalidRequestCodes.address_notFound]: {
    header: 'Address not found',
    description: 'Address not found',
  },
  [InvalidRequestCodes.order_notFound]: {
    header: 'Order not found',
    description: 'Order not found',
  },
  [InvalidRequestCodes.order_unclosedTasks]: {
    header: 'Order has unclosed tasks',
    description: 'Order has unclosed tasks',
  },
  [InvalidRequestCodes.order_idRequired]: {
    header: 'Order id required',
    description: 'Order id required',
  },
  [InvalidRequestCodes.order_clientNotInCompany]: {
    header: 'Client not in company',
    description: 'Client not in company',
  },
  [InvalidRequestCodes.order_notInCompany]: {
    header: 'Order not in company',
    description: 'Order not in company',
  },
  [InvalidRequestCodes.orderPricing_priceTooLow]: {
    header: 'Price too low',
    description: 'Price too low',
  },
  [InvalidRequestCodes.orderPricing_taxOutOfRange]: {
    header: 'Tax out of range',
    description: 'Tax out of range',
  },
  [InvalidRequestCodes.task_notFound]: {
    header: 'Task not found',
    description: 'Task not found',
  },
  [InvalidRequestCodes.task_taskAlreadyExist]: {
    header: 'Task already exists',
    description: 'Task already exists',
  },
  [InvalidRequestCodes.task_workerNotInCompany]: {
    header: 'Worker not in company',
    description: 'Worker not in company',
  },
  [InvalidRequestCodes.task_fieldNotInCompany]: {
    header: 'Field not in company',
    description: 'Field not in company',
  },
  [InvalidRequestCodes.task_notInCompany]: {
    header: 'Task not in company',
    description: 'Task not in company',
  },
  [InvalidRequestCodes.task_workerLocationRequired]: {
    header: 'Worker location required',
    description: 'Worker location required',
  },
  [InvalidRequestCodes.task_taskNotOpened]: {
    header: 'Task not opened',
    description: 'Task not opened',
  },
  [InvalidRequestCodes.order_invalidStatus]: {
    header: 'Invalid status',
    description: 'Invalid status',
  },
  [InvalidRequestCodes.task_taskAlreadyStarted]: {
    header: 'Task already started',
    description: 'Task already started',
  },
  [InvalidRequestCodes.task_orderNotInCompany]: {
    header: 'Order not in company',
    description: 'Order not in company',
  },

  [InvalidRequestCodes.taskSession_anotherTaskOpened]: {
    header: 'Another task opened',
    description: 'Another task opened',
  },
  [InvalidRequestCodes.taskSession_notFound]: {
    header: 'Task session not found',
    description: 'Task session not found',
  },
  [InvalidRequestCodes.worker_alreadyExist]: {
    header: 'Worker already exists',
    description: 'Worker already exists',
  },
  [InvalidRequestCodes.worker_infoTimeout]: {
    header: 'Worker info timeout',
    description: 'Worker info timeout',
  },
  [InvalidRequestCodes.field_noClientData]: {
    header: 'No client data',
    description: 'No client data',
  },
  [InvalidRequestCodes.field_clientNotExist]: {
    header: 'Client does not exist',
    description: 'Client does not exist',
  },
  [InvalidRequestCodes.field_fieldNotExist]: {
    header: 'Field does not exist',
    description: 'Field does not exist',
  },
  [InvalidRequestCodes.account_badOperationOnAccount]: {
    header: 'Bad operation on account',
    description: 'Bad operation on account',
  },
  [InvalidRequestCodes.account_passwordsDoNotMatch]: {
    header: 'Passwords do not match',
    description: 'Passwords do not match',
  },
  [InvalidRequestCodes.account_badActivationCode]: {
    header: 'Bad activation code',
    description: 'Bad activation code',
  },
  [InvalidRequestCodes.user_userAlreadyExist]: {
    header: 'User already exists',
    description: 'User already exists',
  },
  [InvalidRequestCodes.account_emailRequired]: {
    header: 'Email required',
    description: 'Email required',
  },
};
