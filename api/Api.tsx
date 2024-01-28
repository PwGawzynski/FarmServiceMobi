import Constants from 'expo-constants';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import * as SecureStore from 'expo-secure-store';
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

export class Api {
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

  /* ----------------------------------------SETTINGS---------------------------------------------*/

  /**
   * Method is  used to initialize axios instance, this instances must be initialized in method to make sure
   * that Token has been restored before initialize
   * @private
   */
  private static async initAxios() {
    Api.axiosInstance = axios.create({
      baseURL: `http://${Constants.expoConfig?.extra?.apiUrl}:3006`,
      timeout: 5000,
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${Api.access_token}`,
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
    const ACCESS_TOKEN_LIVE_TIME = 850000;
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
   * Driver to init Api instance, init tokens, init axios, restore sessions Tokens
   * @return TRUE if session has been correctly restored, FALSE if session expired and can't be restored
   */
  static async init() {
    try {
      await Api.initTokens();
      await Api.initAxios();
      return (await Api.checkCurrentSession()) || (await Api.restoreTokens());
    } catch (e) {
      await Api.initAxios();
      return false;
    }
  }

  static async session() {
    return (await Api.checkCurrentSession()) || Api.restoreTokens();
  }

  /**
   * Method used to restore tokens from secure store
   * @throws Error when can't get tokens from store
   */
  private static async initTokens(): Promise<void> {
    const stored = await SecureStore.getItemAsync('Tokens');
    if (!stored) throw Error('Cannot get tokens');
    const tokens: IdentityAuthTokenLoginStored = await JSON.parse(stored);
    Api.access_token = tokens.access_token;
    Api.refresh_token = tokens.refresh_token;
  }

  static async getUserData(): Promise<
    AxiosResponse<ResponseObject<UserResponseBase>>
  > {
    return Api.axiosInstance.get('/user/me');
  }

  /**
   * Refresh tokens stored in SecureStore
   * @return True if refresh went correct
   * @throws AxiosError when req went wrong, Error when saving operation went wrong
   */
  static async restoreTokens() {
    await Api.initTokens();
    const response = (
      await Api.axiosInstance.post('/auth/refresh', undefined, {
        headers: {
          Authorization: `Bearer ${Api.refresh_token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
    ).data as ResponseObject<IdentityAuthTokenLoginRaw>;
    console.log(response, 'important');
    return Api.saveTokensToSecureStoreFromResPayload(response);
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
      // updating tokens connected with Api instance
      Api.access_token = storedData.access_token;
      Api.refresh_token = storedData.refresh_token;
      await SecureStore.setItemAsync(
        'Tokens',
        await JSON.stringify(storedData),
      );
      /**
       * because after login token has been updated,
       * but in axios instances still, those are old tokens,
       * so we need to update axios instances
       */
      await Api.initAxios();
      return true;
    }
    throw new Error('cannot access data payload from response');
  }

  /* ----------------------------------------API-CALS---------------------------------------------*/
  // TODO add types for user data
  /**
   * Register new user in Api
   * @param userData : userData
   * @returns ResponseObject when operation went correct
   * @throws AxiosError return by axios
   */
  static async registerNewUser(userData: CreateUserReqI) {
    const serializedData = {
      email: userData.email,
      password: userData.password,
      personal_data: {
        name: userData.personal_data.name,
        surname: userData.personal_data.surname,
        phone_number: userData.personal_data.phone_number,
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
    return Api.axiosInstance.post('/user', serializedData);
  }

  static async me() {
    return (
      (await Api.axiosInstance.get('/user/me')) as AxiosResponse<
        ResponseObject<UserResponseBase>
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
  static async loginUser(loginData: LoginUser) {
    const response: ResponseObject<IdentityAuthTokenLoginRaw> = (
      await Api.axiosInstance.post('/auth/login', loginData)
    ).data;
    if (await Api.saveTokensToSecureStoreFromResPayload(response))
      return Api.me();
  }

  static async resetPassword(data: UserResetPasswordReqI) {
    return (
      (await Api.axiosInstance.put('/user/reset-password', undefined, {
        params: { email: data?.email },
      })) as AxiosResponse<ResponseObject>
    ).data;
  }

  static async createCompany(data: CreateCompanyReqI) {
    await Api.session();
    return (
      (await Api.axiosInstance.post(
        '/company',
        data,
      )) as AxiosResponse<ResponseObject>
    ).data;
  }
}
