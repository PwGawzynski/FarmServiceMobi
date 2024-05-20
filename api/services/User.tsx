import { AxiosError, HttpStatusCode } from 'axios';
import { t } from 'i18next';
import { Api } from '../Api';
import { ErrorCause } from '../../types/self/api/ErrorTypes';
import { ResponseObject } from '../../FarmServiceApiTypes/Respnse/responseGeneric';
import { LoginUser } from '../../FarmServiceApiTypes/User/LoginUser';
import { TranslationNames } from '../../locales/TranslationNames';
import {
  CreateUserReqI,
  UserResetPasswordReqI,
} from '../../FarmServiceApiTypes/User/Requests';
import { UserResponseBase } from '../../FarmServiceApiTypes/User/Responses';

/**
 * Method used to handle api calls as base driver maintaining
 * base error handling such as unauthorised or default error
 * @param unauthorisedMsg message to be shown when user is unauthorised
 * @param defaultMsg message to be shown when something went wrong
 * @param apiCall api call to be executed
 */
export async function apiHandler<M, T = undefined>(
  unauthorisedMsg: string,
  defaultMsg: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  apiCall: any,
  payload?: M,
): Promise<ResponseObject<T> | undefined> {
  try {
    const data = await apiCall(payload as M);
    /* console.info(
      data,
      `DATA TYPE RETURNED FROM API HANDLER:  ${
        apiCall.name
      } AT: ${new Date().toLocaleTimeString()}`,
    ); */
    if (data) return data;
    return undefined;
  } catch (e) {
    if (e instanceof AxiosError) {
      switch (e.response?.status) {
        case HttpStatusCode.Unauthorized:
          throw new Error(unauthorisedMsg, {
            cause: HttpStatusCode.Unauthorized,
          } as ErrorCause);

        case HttpStatusCode.Conflict:
          throw new Error(e.response.data.payload.message);

        case HttpStatusCode.BadRequest:
          throw new Error(e.response.data.payload.message);
        default:
          throw new Error(defaultMsg);
      }
    } else throw new Error(defaultMsg);
    throw new Error(defaultMsg);
  }
}

/**
 * Method used to get user data from api
 * @throws Error when session expired or something went wrong
 * @return UserResponseBase | undefined
 */
export async function me() {
  const UNAUTHORIZED_MSG = t(TranslationNames.serviceDefaults.unauthorised);
  const DEFAULT_MSG = t(TranslationNames.serviceDefaults.default);
  return apiHandler(UNAUTHORIZED_MSG, DEFAULT_MSG, Api.me);
}

/**
 * Method used to login user
 * @param data : LoginUser
 * @throws Error when credentials are wrong or something went wrong
 * @return UserResponseBase | undefined
 */
export async function login(
  data: LoginUser,
): Promise<UserResponseBase | undefined> {
  const UNAUTHORIZED_MSG = t(
    TranslationNames.userService.errorMessages.wrongCredentials,
  );
  const DEFAULT_MSG = t(TranslationNames.serviceDefaults.default);
  try {
    const response = await Api.loginUser(data);
    return response?.payload;
  } catch (e) {
    if (e instanceof AxiosError) {
      switch (e.response?.status) {
        case HttpStatusCode.BadRequest:
          throw new Error(e.response.data.payload.message, {
            cause: HttpStatusCode.BadRequest,
          });
        case HttpStatusCode.Unauthorized:
          throw new Error(UNAUTHORIZED_MSG, {
            cause: HttpStatusCode.Unauthorized,
          } as ErrorCause);
        default:
          throw new Error(DEFAULT_MSG);
      }
    } else throw new Error(DEFAULT_MSG);
  }
}

export async function resetPwd(data: UserResetPasswordReqI) {
  const UNAUTHORIZED_MSG = t(TranslationNames.serviceDefaults.unauthorised);
  const DEFAULT_MSG = t(TranslationNames.serviceDefaults.default);
  return apiHandler<{ email: string }>(
    UNAUTHORIZED_MSG,
    DEFAULT_MSG,
    Api.resetPassword,
    data,
  );
}

export async function registerUser(data: CreateUserReqI) {
  const UNAUTHORIZED_MSG = t(TranslationNames.serviceDefaults.unauthorised);
  const DEFAULT_MSG = t(TranslationNames.serviceDefaults.default);
  return apiHandler<CreateUserReqI>(
    UNAUTHORIZED_MSG,
    DEFAULT_MSG,
    Api.registerNewUser,
    data,
  );
}

export async function loginByGoogle(idToken: string) {
  const UNAUTHORIZED_MSG = t(TranslationNames.serviceDefaults.unauthorised);
  const DEFAULT_MSG = t(TranslationNames.serviceDefaults.default);
  return apiHandler<string>(
    UNAUTHORIZED_MSG,
    DEFAULT_MSG,
    Api.googleLogin,
    idToken,
  ) as Promise<UserResponseBase | string | undefined>;
}

export async function isMailFree(email: string) {
  const UNAUTHORIZED_MSG = t(TranslationNames.serviceDefaults.unauthorised);
  const DEFAULT_MSG = t(TranslationNames.serviceDefaults.default);
  return apiHandler<string>(
    UNAUTHORIZED_MSG,
    DEFAULT_MSG,
    Api.isMailFree,
    email,
  ) as Promise<boolean | undefined>;
}

export async function logout() {
  const UNAUTHORIZED_MSG = t(TranslationNames.serviceDefaults.unauthorised);
  const DEFAULT_MSG = t(TranslationNames.serviceDefaults.default);
  return apiHandler(UNAUTHORIZED_MSG, DEFAULT_MSG, Api.logout);
}
