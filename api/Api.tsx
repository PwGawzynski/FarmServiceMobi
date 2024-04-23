import Constants from 'expo-constants';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import * as SecureStore from 'expo-secure-store';
import EventSource, {
  ExceptionEvent,
  MessageEvent,
  OpenEvent,
  TimeoutEvent,
} from 'react-native-sse';
import {
  IdentityAuthTokenLoginRaw,
  IdentityAuthTokenLoginStored,
  LoginUser,
} from '../FarmServiceApiTypes/User/LoginUser';
import { ResponseObject } from '../FarmServiceApiTypes/Respnse/responseGeneric';
import { UserResponseBase } from '../FarmServiceApiTypes/User/Responses';
import { Theme } from '../FarmServiceApiTypes/Account/Constants';
import {
  CreateUserReqI,
  UserResetPasswordReqI,
} from '../FarmServiceApiTypes/User/Requests';
import { CreateCompanyReqI } from '../FarmServiceApiTypes/Company/Requests';
import {
  CreateClientReqI,
  UpdateClientReqI,
} from '../FarmServiceApiTypes/Clients/Requests';
import { ClientResponseBase } from '../FarmServiceApiTypes/Clients/Responses';
import {
  CreateClientsCompanyReqI,
  UpdateClientsCompanyReqI,
} from '../FarmServiceApiTypes/ClientsCompany/Requests';
import { ClientsCompanyResponseBase } from '../FarmServiceApiTypes/ClientsCompany/Responses';
import {
  WorkerIdResponseBase,
  WorkerResponseBase,
} from '../FarmServiceApiTypes/Worker/Responses';
import {
  CreateWorkerReqI,
  UpdateWorkerStatusOrPositionReqI,
} from '../FarmServiceApiTypes/Worker/Requests';
import {
  CreateFieldReqI,
  updateFieldReqI,
} from '../FarmServiceApiTypes/Field/Requests';
import { FieldResponseBase } from '../FarmServiceApiTypes/Field/Ressponses';
import {
  CreateOrderReqI,
  UpdateOrder,
} from '../FarmServiceApiTypes/Order/Requests';
import { OrderResponseBase } from '../FarmServiceApiTypes/Order/Ressponses';
import { MachineResponseBase } from '../FarmServiceApiTypes/Machine/Responses';
import { UpdateMachineReqI } from '../FarmServiceApiTypes/Machine/Requests';
import { CreateTaskCollection } from '../FarmServiceApiTypes/Task/Requests';
import {
  TaskResponseBase,
  TaskResponseCollection,
} from '../FarmServiceApiTypes/Task/Responses';
/* ---------------------------------------DECORATOR_USED_TO_DELAY_RES--------------------------------------- */

const IsDelayed = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    // eslint-disable-next-line no-param-reassign,@typescript-eslint/no-explicit-any,func-names
    descriptor.value = async function (...args: any[]) {
      const delayStart = Date.now();
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      await ApiSelf.delayRes();
      const delayEnd = Date.now();
      console.log(
        `\n \n Method ${key} has been delayed about ~ ${
          delayEnd - delayStart
        } ms \n \n `,
      );
      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
};
/* ---------------------------------------API_CLASS--------------------------------------- */

const WORKER_ASSIGNATION_SSE_TIMEOUT = 65000;

export interface sseAsyncListenerParams {
  open?: (data?: OpenEvent) => void;
  message: (data?: MessageEvent) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: (data?: ErrorEvent | TimeoutEvent | ExceptionEvent | any) => void;
  sseUrl: string;
}
export class ApiSelf {
  /**
   * This var is used to store access token and use it in axios instance
   * @private
   */
  private static access_token: string;

  /**
   * This variable is used to store refresh token and use it in axios instance
   * @private
   */
  private static refresh_token: string;

  /**
   * This variable stores axios instance used to connect with BE
   * @private
   */

  /**
   * This variable is used to store axios instance used to connect with Identity
   * @private
   */
  private static axiosInstance: AxiosInstance;

  private static restoreFlag = false;

  /* ----------------------------------------SETTINGS---------------------------------------------*/

  /**
   * Method is  used to initialize axios instance, this instances must be initialized in method to make sure
   * that Token has been restored before initialize
   * @private
   */
  private static async initAxios() {
    ApiSelf.axiosInstance = axios.create({
      baseURL: `http://${Constants.expoConfig?.extra?.apiUrl}:3006`,
      timeout: 5000,
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${ApiSelf.access_token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
  }

  /**
   * Method used to check if current session is valid
   * @return TRUE if session is valid, FALSE if session is invalid
   * @throws Error when can't get tokens from store
   */
  static async checkCurrentSession(): Promise<boolean> {
    const ACCESS_TOKEN_LIVE_TIME = 850_000;
    try {
      const session = await SecureStore.getItemAsync('Tokens');
      if (!session) return false;
      const token: IdentityAuthTokenLoginStored = await JSON.parse(session);
      const now = new Date();
      const tokenDate = new Date(token.last_updated_access_token_at);
      // time is minute reduced to prevent logout after loading desktop and to give time to restore tokens
      return now.getTime() - tokenDate.getTime() < ACCESS_TOKEN_LIVE_TIME;
    } catch (e) {
      return false;
    }
  }

  /**
   * Driver to init ApiSelf instance, init tokens, init axios, restore sessions Tokens
   * @return TRUE if session has been correctly restored, FALSE if session expired and can't be restored
   */
  static async init() {
    try {
      await ApiSelf.initTokens();
      await ApiSelf.initAxios();
      return (
        (await ApiSelf.checkCurrentSession()) || (await ApiSelf.restoreTokens())
      );
    } catch (e) {
      await ApiSelf.initAxios();
      throw e;
    }
  }

  static async session() {
    return (await ApiSelf.checkCurrentSession()) || ApiSelf.restoreTokens();
  }

  /**
   * Method used to restore tokens from secure store
   * @throws Error when can't get tokens from store
   */
  private static async initTokens(): Promise<void> {
    const stored = await SecureStore.getItemAsync('Tokens');
    if (!stored) throw Error('Cannot get tokens [InitTokens]');
    const tokens: IdentityAuthTokenLoginStored = await JSON.parse(stored);
    ApiSelf.access_token = tokens.access_token;
    ApiSelf.refresh_token = tokens.refresh_token;
  }

  static async getUserData(): Promise<
    AxiosResponse<ResponseObject<UserResponseBase>>
  > {
    return ApiSelf.axiosInstance.get('/user/me');
  }

  /**
   * Refresh tokens stored in SecureStore
   * @return True if refresh went correct
   * @throws AxiosError when req went wrong, Error when saving operation went wrong
   */
  static async restoreTokens() {
    console.log('RESTORE CALL FLAG', ApiSelf.restoreFlag);
    await ApiSelf.initTokens();
    if (!ApiSelf.restoreFlag) {
      ApiSelf.restoreFlag = true;
      console.log('RESTORING_TOKENS_FLAG TRUE');
      const response = (
        await ApiSelf.axiosInstance.post('/auth/refresh', undefined, {
          headers: {
            Authorization: `Bearer ${ApiSelf.refresh_token}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        })
      ).data as ResponseObject<IdentityAuthTokenLoginRaw>;
      return ApiSelf.saveTokensToSecureStoreFromResPayload(response);
    }
    return undefined;
  }

  /**
   * Method used to save tokens in SecureStore, received in response from Identity
   * @param response ResponseObject<IdentityAuthTokenLoginRaw> data from Identity
   * @return true if tokens have been correctly saved
   * @throws Error when save or axios init went wrong
   */
  private static async saveTokensToSecureStoreFromResPayload(
    response: ResponseObject<IdentityAuthTokenLoginRaw>,
  ): Promise<boolean> {
    const { payload } = response;
    if (payload?.access_token && payload.access_token) {
      const storedData: IdentityAuthTokenLoginStored = {
        ...payload,
        last_updated_access_token_at: new Date(),
        last_updated_refresh_token_at: new Date(),
      };
      // updating tokens connected with ApiSelf instance
      ApiSelf.access_token = storedData.access_token;
      ApiSelf.refresh_token = storedData.refresh_token;
      await SecureStore.setItemAsync(
        'Tokens',
        await JSON.stringify(storedData),
      );
      /**
       * because after login token has been updated,
       * but in axios instances still, those are old tokens,
       * so we need to update axios instances
       */
      await ApiSelf.initAxios();
      ApiSelf.restoreFlag = false;
      console.log('TOKENS_RESTORED', ApiSelf.access_token);
      return true;
    }
    throw new Error('cannot access data payload from response');
  }

  /* ----------------------------------------API-CALS---------------------------------------------*/
  // TODO add types for user data
  /**
   * Register new user in ApiSelf
   * @param userData : userData
   * @returns ResponseObject when operation went correct
   * @throws AxiosError return by axios
   */
  static async registerNewUser(userData: CreateUserReqI) {
    const serializedData = {
      email: userData.email,
      password: userData.password,
      personalData: {
        name: userData.personalData.name,
        surname: userData.personalData.surname,
        phoneNumber: userData.personalData.phoneNumber,
      },
      address: {
        city: userData.address.city,
        county: userData.address.county,
        street: userData.address.street,
        apartmentNumber: userData.address.apartmentNumber,
        voivodeship: userData.address.voivodeship,
        houseNumber: userData.address.houseNumber,
        postalCode: userData.address.postalCode,
      },
      account: {
        theme: Theme.light,
      },
      role: userData.role,
    } as CreateUserReqI;
    return ApiSelf.axiosInstance.post('/user', serializedData);
  }

  static async me() {
    return (
      (await ApiSelf.axiosInstance.get('/user/me')) as AxiosResponse<
        ResponseObject<UserResponseBase>
      >
    ).data;
  }

  static async workerData() {
    return (
      (await ApiSelf.axiosInstance.get('/worker')) as AxiosResponse<
        ResponseObject<WorkerIdResponseBase>
      >
    ).data;
  }

  /**
   * Method used when user login ion app
   * @param loginData : LoginUser
   * @returns boolean to indicate that access is given or not
   * @throws Error when save went wrong
   */
  // eslint-disable-next-line consistent-return
  static async loginUser(
    loginData: LoginUser,
  ): Promise<ResponseObject<UserResponseBase> | undefined> {
    const response: ResponseObject<IdentityAuthTokenLoginRaw> = (
      await ApiSelf.axiosInstance.post('/auth/login', loginData)
    ).data;
    if (await ApiSelf.saveTokensToSecureStoreFromResPayload(response))
      return ApiSelf.me();
  }

  // eslint-disable-next-line no-underscore-dangle
  static async delayRes() {
    return process.env.EXPO_PUBLIC_IS_DEV
      ? new Promise(resolve => {
          setTimeout(() => {
            resolve(true);
          }, 2000);
        })
      : true;
  }

  static async resetPassword(data: UserResetPasswordReqI) {
    return (
      (await ApiSelf.axiosInstance.put('/user/reset-password', undefined, {
        params: { email: data?.email },
      })) as AxiosResponse<ResponseObject>
    ).data;
  }

  static async createCompany(data: CreateCompanyReqI) {
    return (
      (await ApiSelf.axiosInstance.post(
        '/company',
        data,
      )) as AxiosResponse<ResponseObject>
    ).data;
  }

  static async createClient(data: CreateClientReqI) {
    return (
      (await ApiSelf.axiosInstance.post(
        '/clients',
        data,
      )) as AxiosResponse<ResponseObject>
    ).data.payload as ClientResponseBase | undefined;
  }

  static async createField(data: CreateFieldReqI) {
    return (
      (await ApiSelf.axiosInstance.post(
        '/field',
        data,
      )) as AxiosResponse<ResponseObject>
    ).data.payload as FieldResponseBase | undefined;
  }

  static async createOrder(data: CreateOrderReqI) {
    /* throw new Error('kurewka'); */
    return (
      (await ApiSelf.axiosInstance.post(
        '/order',
        data,
      )) as AxiosResponse<ResponseObject>
    ).data.payload as OrderResponseBase | undefined;
  }

  @IsDelayed()
  static async updateMachine(data: UpdateMachineReqI) {
    /* throw new Error('kurewka'); */
    return (
      (await ApiSelf.axiosInstance.put(
        '/machine',
        data,
      )) as AxiosResponse<ResponseObject>
    ).data.payload as MachineResponseBase | undefined;
  }

  @IsDelayed()
  static async safelyDeleteMachine(data: UpdateMachineReqI) {
    /* throw new Error('kurewka'); */
    return (
      (await ApiSelf.axiosInstance.post(
        '/machine/safely-delete',
        data,
      )) as AxiosResponse<ResponseObject>
    ).data.payload as MachineResponseBase | undefined;
  }

  @IsDelayed()
  static async createMachine(data: CreateOrderReqI) {
    /* throw new Error('kurewka'); */
    return (
      (await ApiSelf.axiosInstance.post(
        '/machine',
        data,
      )) as AxiosResponse<ResponseObject>
    ).data.payload as MachineResponseBase | undefined;
  }

  static async getAllOrders() {
    /* throw new Error('kurewka'); */
    return (
      (await ApiSelf.axiosInstance.get(
        '/order/all',
      )) as AxiosResponse<ResponseObject>
    ).data.payload as Array<OrderResponseBase> | undefined;
  }

  static async getAllMachines() {
    /* throw new Error('kurewka'); */
    return (
      (await ApiSelf.axiosInstance.get(
        '/machine/all',
      )) as AxiosResponse<ResponseObject>
    ).data.payload as Array<MachineResponseBase> | undefined;
  }

  static async updateOrder(data: UpdateOrder) {
    return (
      (await ApiSelf.axiosInstance.put(
        '/order',
        data,
      )) as AxiosResponse<ResponseObject>
    ).data.payload;
  }

  static async editField(data: updateFieldReqI) {
    return (
      (await ApiSelf.axiosInstance.put(
        '/field/edit',
        data,
      )) as AxiosResponse<ResponseObject>
    ).data.payload as FieldResponseBase | undefined;
  }

  static async deleteField(data: FieldResponseBase) {
    return (
      (await ApiSelf.axiosInstance.delete('/field', {
        params: { id: data.id },
      })) as AxiosResponse<ResponseObject>
    ).data.code;
  }

  static async assignWorker(data: CreateWorkerReqI) {
    return (
      (await ApiSelf.axiosInstance.post(
        '/worker',
        data,
      )) as AxiosResponse<WorkerResponseBase>
    ).data as WorkerResponseBase | undefined;
  }

  static async updateClient(data: UpdateClientReqI) {
    return (
      (await ApiSelf.axiosInstance.put(
        '/clients',
        data,
      )) as AxiosResponse<ResponseObject>
    ).data.payload as ClientResponseBase | undefined;
  }

  static async createTasks(data: CreateTaskCollection) {
    return (
      (await ApiSelf.axiosInstance.post(
        '/task',
        data,
      )) as AxiosResponse<ResponseObject>
    ).data.payload as TaskResponseCollection | undefined;
  }

  static async getTaskByOrder(orderId: string) {
    return (
      (await ApiSelf.axiosInstance.get('/task', {
        params: { 'order-id': orderId },
      })) as AxiosResponse<ResponseObject>
    ).data.payload as TaskResponseBase | undefined;
  }

  @IsDelayed()
  static async openTask(taskId: string) {
    return (
      (await ApiSelf.axiosInstance.put('/task/open', undefined, {
        params: { 'task-id': taskId },
      })) as AxiosResponse<ResponseObject>
    ).data.payload as TaskResponseBase | undefined;
  }

  @IsDelayed()
  static async pauseTask(taskId: string) {
    return (
      (await ApiSelf.axiosInstance.put('/task/pause', undefined, {
        params: { 'task-id': taskId },
      })) as AxiosResponse<ResponseObject>
    ).data.payload as TaskResponseBase | undefined;
  }

  @IsDelayed()
  static async closeTask(taskId: string) {
    return (
      (await ApiSelf.axiosInstance.put('/task/close', undefined, {
        params: { 'task-id': taskId },
      })) as AxiosResponse<ResponseObject>
    ).data.payload as TaskResponseBase | undefined;
  }

  static async deleteTask(taskId: string) {
    return (
      (await ApiSelf.axiosInstance.delete('/task', {
        params: { 'task-id': taskId },
      })) as AxiosResponse<ResponseObject>
    ).data;
  }

  @IsDelayed()
  static async updateWorkerStatusOrPosition(
    data: UpdateWorkerStatusOrPositionReqI,
  ) {
    // throw new Error('kurewka');
    return (
      (await ApiSelf.axiosInstance.put(
        '/worker/update-status-or-position',
        data,
      )) as AxiosResponse<ResponseObject>
    ).data.payload as WorkerResponseBase | undefined;
  }

  static async assignCompanyToClient(data: CreateClientsCompanyReqI) {
    return (
      (await ApiSelf.axiosInstance.post(
        '/clients-company',
        data,
      )) as AxiosResponse<ResponseObject>
    ).data.payload as ClientsCompanyResponseBase | undefined;
  }

  @IsDelayed()
  static async updateClientsCompany(data: UpdateClientsCompanyReqI) {
    return (
      (await ApiSelf.axiosInstance.put(
        '/clients-company',
        data,
      )) as AxiosResponse<ResponseObject>
    ).data.payload as ClientsCompanyResponseBase | undefined;
  }

  @IsDelayed()
  static async getClients() {
    return (
      (await ApiSelf.axiosInstance.get(
        '/clients/all',
      )) as AxiosResponse<ResponseObject>
    ).data.payload as Array<ClientResponseBase> | undefined;
  }

  @IsDelayed()
  static async getWorkers() {
    return (
      (await ApiSelf.axiosInstance.get(
        '/worker/all',
      )) as AxiosResponse<ResponseObject>
    ).data.payload as Array<WorkerResponseBase> | undefined;
  }

  static async getClientFields(id: string) {
    return (
      (await ApiSelf.axiosInstance.get('/field/all', {
        params: { client: id },
      })) as AxiosResponse<ResponseObject>
    ).data.payload;
  }

  static async getDataFromXLM(data: string) {
    return ApiSelf.axiosInstance.post('field/xmlTranslate', { data });
  }

  static workerAssignedListener({
    open,
    message,
    error,
  }: sseAsyncListenerParams) {
    const eventSource = new EventSource(
      `http://${Constants.expoConfig?.extra?.apiUrl}:3006/worker/sse/info`,
      {
        headers: {
          Authorization: `Bearer ${ApiSelf.access_token}`,
          timeout: WORKER_ASSIGNATION_SSE_TIMEOUT,
        },
      },
    );
    eventSource.addEventListener('close', () => {
      console.info('WORKER_ASSIGNED_LISTENER_CLOSE');
    });

    eventSource.addEventListener('message', data => {
      message(data);
      eventSource.removeAllEventListeners();
      eventSource.close();
    });
    eventSource.addEventListener('error', data => {
      if (error) error(data);
      eventSource.removeAllEventListeners();
      eventSource.close();
    });
    eventSource.addEventListener('open', data => {
      if (open) open(data);
    });
  }

  @IsDelayed()
  static workerTasks({ open, message, error }: sseAsyncListenerParams) {
    const eventSource = new EventSource(
      `http://${Constants.expoConfig?.extra?.apiUrl}:3006/task/assigned`,
      {
        headers: {
          Authorization: `Bearer ${ApiSelf.access_token}`,
          timeout: 0,
        },
      },
    );
    eventSource.addEventListener('close', () => {
      console.info('WORKER_ASSIGNED_LISTENER_CLOSE');
    });

    eventSource.addEventListener('message', (data: MessageEvent) => {
      if (message) message(JSON.parse(data.data as string).payload);
    });
    eventSource.addEventListener('error', data => {
      if (error) error(data);
      eventSource.close();
    });
    eventSource.addEventListener('open', data => {
      if (open) open(data);
    });
    return eventSource;
  }
}
/* ---------------------------------------AUTO_REFRESH_TOKENS--------------------------------------- */
function methodDecorator(
  // eslint-disable-next-line no-param-reassign,@typescript-eslint/no-explicit-any
  target: any,
  key: string,
  descriptor: PropertyDescriptor,
) {
  const originalMethod = descriptor.value;

  // eslint-disable-next-line no-param-reassign,@typescript-eslint/no-explicit-any,func-names
  descriptor.value = async function (...args: any[]) {
    // to allow user login when tokens are stale or not exist
    if (['loginUser', 'init'].includes(key))
      return originalMethod.apply(this, args);
    const tokenRestorationStart = Date.now();
    const tokens = await ApiSelf.session();
    const tokenRestorationEnd = Date.now();
    console.log(
      ` \n \n During execution ${key}, determined tokens as ${
        tokens ? 'actual' : 'stale(system executed Api.restoreTokens)'
      }, operation has been processed in  ~ ${
        tokenRestorationEnd - tokenRestorationStart
      } ms \n \n `,
    );
    return originalMethod.apply(this, args);
  };

  return descriptor;
}

const handlers = {
  // eslint-disable-next-line no-param-reassign,@typescript-eslint/no-explicit-any
  get(target: any, property: string, receiver: any) {
    const descriptor = Object.getOwnPropertyDescriptor(target, property);
    if (descriptor && typeof descriptor.value === 'function') {
      return methodDecorator(target, property, descriptor).value;
    }
    return Reflect.get(target, property, receiver);
  },
};

export const Api = new Proxy(ApiSelf, handlers);
