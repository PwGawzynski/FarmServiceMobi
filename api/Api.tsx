import Constants from 'expo-constants';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import * as SecureStore from 'expo-secure-store';
import EventSource, {
  ExceptionEvent,
  MessageEvent,
  OpenEvent,
  TimeoutEvent,
} from 'react-native-sse';
import {
  GoogleAuthResponseI,
  IdentityAuthTokenLoginRaw,
  IdentityAuthTokenLoginStored,
  LoginUser,
} from '../FarmServiceApiTypes/User/LoginUser';
import {
  ResponseCode,
  ResponseObject,
} from '../FarmServiceApiTypes/Respnse/responseGeneric';
import { UserResponseBase } from '../FarmServiceApiTypes/User/Responses';
import { CreateUserReqI } from '../FarmServiceApiTypes/User/Requests';
import { IsDelayed } from '../helepers/Api/decorators/IsDelayed';
import { methodDecorator } from '../helepers/Api/AutoRefreshToken';

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

  static async logout() {
    const response = (
      await ApiSelf.axiosInstance.post('/auth/logout', undefined, {
        headers: {
          Authorization: `Bearer ${ApiSelf.refresh_token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
    ).data as ResponseObject<IdentityAuthTokenLoginRaw>;
    if (response.code === ResponseCode.ProcessedCorrect) {
      await ApiSelf.remTokens();
      return response;
    }
    return response;
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

  /**
   * Method used to remove tokens from SecureStore
   * @private
   */
  private static async remTokens() {
    await SecureStore.deleteItemAsync('Tokens');
    ApiSelf.access_token = '';
    ApiSelf.refresh_token = '';
    await ApiSelf.initAxios();
    return true;
  }

  /* ----------------------------------------API-CALS---------------------------------------------*/
  /**
   * Register new user in ApiSelf
   * @param userData : userData
   * @returns ResponseObject when operation went correct
   * @throws AxiosError return by axios
   */
  static async registerNewUser(
    path: string,
    userData: CreateUserReqI,
  ): Promise<ResponseObject<undefined>> {
    const serializedData = {
      email: userData?.email,
      password: userData?.password,
      personalData: {
        name: userData.personalData?.name,
        surname: userData.personalData?.surname,
        phoneNumber: userData.personalData?.phoneNumber,
      },
      address: {
        city: userData.address?.city,
        county: userData.address?.county,
        street: userData.address?.street,
        apartmentNumber: userData.address?.apartmentNumber,
        voivodeship: userData.address?.voivodeship,
        houseNumber: userData.address?.houseNumber,
        postalCode: userData.address?.postalCode,
      },
      role: userData.role,
    } as CreateUserReqI;
    return (await ApiSelf.axiosInstance.post('/user', serializedData))
      .data as ResponseObject<undefined>;
  }

  /**
   * Method used to get user data
   */
  static async me() {
    return (
      (await ApiSelf.axiosInstance.get('/user/me')) as AxiosResponse<
        ResponseObject<UserResponseBase>
      >
    ).data;
  }

  static async loginUser<RESPONSE_DATA>(
    path: string,
    data: LoginUser,
  ): Promise<ResponseObject<RESPONSE_DATA> | undefined> {
    const response: ResponseObject<IdentityAuthTokenLoginRaw> = (
      await ApiSelf.axiosInstance.post('/auth/login', data)
    ).data;
    if (await ApiSelf.saveTokensToSecureStoreFromResPayload(response))
      return ApiSelf.me() as unknown as
        | ResponseObject<RESPONSE_DATA>
        | undefined;
    return undefined;
  }

  static async googleLogin<T>(
    path: string,
    data: T,
    config?: AxiosRequestConfig | undefined,
  ): Promise<ResponseObject<UserResponseBase> | string | undefined> {
    const response: ResponseObject<GoogleAuthResponseI> = (
      await ApiSelf.axiosInstance.post('/auth/g-login', undefined, {
        params: { 'id-token': config?.params?.['id-token'] },
      })
    ).data;
    if (
      response.payload &&
      response.payload.access_token &&
      response.payload.refresh_token
    ) {
      if (
        await ApiSelf.saveTokensToSecureStoreFromResPayload(response as never)
      ) {
        return (
          (await ApiSelf.axiosInstance.get('/user/me')) as AxiosResponse<
            ResponseObject<UserResponseBase>
          >
        ).data;
      }
    }
    if (response.payload) return response.payload.email;
    return undefined;
  }

  @IsDelayed()
  static async post<T, RESPONSE_DATA>(
    path: string,
    data: T,
    config?: AxiosRequestConfig | undefined,
  ) {
    return (await ApiSelf.axiosInstance.post(path, data, config))
      .data as ResponseObject<RESPONSE_DATA>;
  }

  @IsDelayed()
  static async put<T, RESPONSE_DATA>(
    path: string,
    data: T,
    config?: AxiosRequestConfig | undefined,
  ) {
    return (await ApiSelf.axiosInstance.put(path, data, config))
      .data as ResponseObject<RESPONSE_DATA>;
  }

  @IsDelayed()
  static async delete<RESPONSE_DATA>(
    path: string,
    config?: AxiosRequestConfig | undefined,
  ) {
    return (await ApiSelf.axiosInstance.delete(path, config))
      .data as ResponseObject<RESPONSE_DATA>;
  }

  @IsDelayed()
  static async get<RESPONSE_DATA>(
    path: string,
    config?: AxiosRequestConfig | undefined,
  ) {
    return (await ApiSelf.axiosInstance.get(path, config))
      .data as ResponseObject<RESPONSE_DATA>;
  }

  /**
   * Method used to check if email is free
   * @param email
   */
  static async isMailFree(email: string) {
    return (
      (await ApiSelf.axiosInstance.get('/auth/exist', {
        params: { email },
      })) as AxiosResponse<ResponseObject>
    ).data;
  }

  // ----------------------------------------SEE---------------------------------------------//
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

  @IsDelayed()
  static companiesActivities({ open, message, error }: sseAsyncListenerParams) {
    const eventSource = new EventSource(
      `http://${Constants.expoConfig?.extra?.apiUrl}:3006/activities/by-company`,
      {
        headers: {
          Authorization: `Bearer ${ApiSelf.access_token}`,
          timeout: 0,
        },
      },
    );
    eventSource.addEventListener('close', () => {
      console.info('COMPANIES_TASk_LISTENER_CLOSE');
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
